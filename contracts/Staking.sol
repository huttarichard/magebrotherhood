// SPDX-License-Identifier: MIT
/* solhint-disable not-rely-on-time */

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/math/SignedSafeMath.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "./interfaces/IStakable.sol";

/**
 * @title NFT Staking
 * Distribute ERC20 rewards over discrete-time schedules for the staking of NFTs.
 * This contract is designed on a self-service model, where users will stake NFTs,
 * unstake NFTs and claim rewards through their own transactions only.
 */
contract Staking is ERC165, Pausable, AccessControl, IERC721Receiver, IERC1155Receiver {
  using SafeCast for uint256;
  using SafeMath for uint256;
  using SignedSafeMath for int256;

  event Started();
  event OwnershipChanged(address from, address to, address nft, uint256 tokenId);
  event RewardsAdded(uint256 startPeriod, uint256 endPeriod, uint256 rewardsPerCycle);
  event RewardsClaimed(address staker, uint256 cycle, uint256 startPeriod, uint256 periods, uint256 amount);
  event TokenStaked(address staker, uint256 cycle, address nft, uint256 tokenId, uint256 weight);
  event TokenUnstaked(address staker, uint256 cycle, address nft, uint256 tokenId, uint256 weight);
  event HistoriesUpdated(address staker, uint256 startCycle, uint256 stakerStake, uint256 globalStake);

  /**
   * Used as a historical record of change of stake.
   * Stake represents an aggregation of staked token weights.
   * Optimised for use in storage.
   */
  struct Snapshot {
    uint128 stake;
    uint128 startCycle;
  }

  /**
   * Used to represent a staker's information about the next claim.
   * Optimised for use in storage.
   */
  struct NextClaim {
    uint16 period;
    uint64 globalSnapshotIndex;
    uint64 stakerSnapshotIndex;
  }

  /**
   * Used as a container to hold result values from computing rewards.
   */
  struct ComputedClaim {
    uint16 startPeriod;
    uint16 periods;
    uint256 amount;
  }

  /**
   * Used to represent the current staking status of an NFT.
   * Optimised for use in storage.
   */
  struct TokenInfo {
    address owner;
    uint128 weight;
    uint256 amount;
    uint16 depositCycle;
    uint16 withdrawCycle;
  }

  /**
   * The ERC1155-compliant (optional ERC721-compliance) contract from which staking is accepted.
   */
  struct Contract {
    bool enabled;
    IStakable nft;
    mapping(address => mapping(uint256 => TokenInfo)) balances;
  }

  IERC20 public coin;

  uint256 public totalRewardsPool;

  uint256 public immutable startTimestamp;

  uint32 public immutable cycleLengthInSeconds;

  uint16 public immutable periodLengthInCycles;

  Snapshot[] public globalHistory;

  /* staker => snapshots*/
  mapping(address => Snapshot[]) public stakerHistories;

  /* staker => next claim */
  mapping(address => NextClaim) public nextClaims;

  /* period => rewardsPerCycle */
  mapping(uint256 => uint256) public rewardsSchedule;

  /* staking => hold info on staking */
  mapping(address => Contract) public contracts;

  bytes32 public constant ADMIN = keccak256("ADMIN");

  bytes32 public constant SLUSHER = keccak256("SLUSHER");

  /**
   * Constructor.
   * @dev Reverts if the period length value is zero.
   * @dev Reverts if the cycle length value is zero.
   * @dev Warning: cycles and periods need to be calibrated carefully.
   * @dev Small values will increase computation load while estimating and claiming rewards.
   * @dev Big values will increase the time to wait before a new period becomes claimable.
   * @param _cycleLengthInSeconds The length of a cycle, in seconds.
   * @param _periodLengthInCycles The length of a period, in cycles.
   * @param _coin The ERC20-based token used as staking rewards.
   */
  constructor(
    uint32 _cycleLengthInSeconds,
    uint16 _periodLengthInCycles,
    uint256 _startsAtTimestamp,
    address _coin
  ) {
    require(_cycleLengthInSeconds >= 1 minutes, "invalid cycle length");
    require(_periodLengthInCycles >= 2, "invalid period length");

    _setRoleAdmin(SLUSHER, ADMIN);
    _setupRole(ADMIN, _msgSender());
    _setupRole(SLUSHER, _msgSender());

    cycleLengthInSeconds = _cycleLengthInSeconds;
    periodLengthInCycles = _periodLengthInCycles;
    startTimestamp = _startsAtTimestamp;

    setCoinContract(_coin);
  }

  /**
   * @dev Will pause the contract.
   */
  function pause() public onlyRole(ADMIN) {
    _pause();
  }

  /**
   * @dev Will unpause the contract.
   */
  function unpause() public onlyRole(ADMIN) {
    _unpause();
  }

  /**
   * @dev will set the coin contract
   */
  function setCoinContract(address _coin) public onlyRole(ADMIN) {
    require(_coin != address(0), "invalid address");
    coin = IERC20(_coin);
  }

  /**
   * Adds `rewardsPerCycle` reward amount for the period range from `startPeriod` to `endPeriod`, inclusive, to the rewards schedule.
   * The necessary amount of reward tokens is transferred to the contract. Cannot be used for past periods.
   * Can only be used to add rewards and not to remove them.
   * @dev Reverts if not called by the owner.
   * @dev Reverts if the start period is zero.
   * @dev Reverts if the end period precedes the start period.
   * @dev Reverts if attempting to add rewards for a period earlier than the current, after staking has started.
   * @dev Reverts if the reward tokens transfer fails.
   * @dev The rewards token contract emits an ERC20 Transfer event for the reward tokens transfer.
   * @dev Emits a RewardsAdded event.
   * @param startPeriod The starting period (inclusive).
   * @param endPeriod The ending period (inclusive).
   * @param rewardsPerCycle The reward amount to add for each cycle within range.
   */
  function addRewardsForPeriods(
    uint16 startPeriod,
    uint16 endPeriod,
    uint256 rewardsPerCycle
  ) public onlyRole(ADMIN) {
    require(startPeriod != 0 && startPeriod <= endPeriod, "wrong period range");
    require(startPeriod >= _getCurrentPeriod(periodLengthInCycles), "already committed reward schedule");

    for (uint256 period = startPeriod; period <= endPeriod; ++period) {
      rewardsSchedule[period] = rewardsSchedule[period].add(rewardsPerCycle);
    }

    uint256 addedRewards = rewardsPerCycle.mul(periodLengthInCycles).mul(endPeriod - startPeriod + 1);
    totalRewardsPool = totalRewardsPool.add(addedRewards);

    emit RewardsAdded(startPeriod, endPeriod, rewardsPerCycle);
  }

  /**
   * Will enable contract and staking for give contract
   */
  function addContract(address stakableContract) public onlyRole(ADMIN) {
    contracts[stakableContract].nft = IStakable(stakableContract);
    contracts[stakableContract].enabled = true;
  }

  /**
   * Will enable contract and staking for give contract
   */
  function removeContract(address stakableContract) public onlyRole(ADMIN) {
    contracts[stakableContract].enabled = false;
  }

  /**
   * ERC1155Receiver hook for single transfer.
   * @dev Reverts if the caller is not the whitelisted NFT contract.
   */
  function onERC1155Received(
    address, /*operator*/
    address from,
    uint256 id,
    uint256 amount,
    bytes calldata /*data*/
  ) external returns (bytes4) {
    _stake(_msgSender(), id, from, amount);
    return this.onERC1155Received.selector;
  }

  /**
   * ERC1155Receiver hook for batch transfer.
   * @dev Reverts if the caller is not the whitelisted NFT contract.
   */
  function onERC1155BatchReceived(
    address, /*operator*/
    address from,
    uint256[] calldata ids,
    uint256[] calldata amounts,
    bytes calldata /*data*/
  ) external returns (bytes4) {
    _stake(_msgSender(), ids, from, amounts);
    return this.onERC1155BatchReceived.selector;
  }

  /**
   * @dev Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom}
   * by `operator` from `from`, this function is called.
   *
   * It must return its Solidity selector to confirm the token transfer.
   * If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted.
   *
   * The selector can be obtained in Solidity with `IERC721.onERC721Received.selector`.
   */
  function onERC721Received(
    address, /*operator*/
    address from,
    uint256 id,
    bytes calldata /*data*/
  ) external returns (bytes4) {
    _stake(_msgSender(), id, from, 1);
    return this.onERC721Received.selector;
  }

  /**
   * I would almost consider this being case of absuing
   * ownership. But this will be handout to the community via DAO.
   * mainpurpose of slushing will be to punish cheaters.
   */
  function slush(
    address stakableContract,
    uint256 tokenId,
    address owner,
    address recipient
  ) public onlyRole(SLUSHER) {
    _unstake(stakableContract, tokenId, owner, recipient);
  }

  /**
   * Unstakes a deposited NFT from the contract and updates the histories accordingly.
   * The NFT's weight will not count for the current cycle.
   * @dev Reverts if the caller is not the original owner of the NFT.
   * @dev While the contract is enabled, reverts if the NFT is still frozen.
   * @dev Reverts if the NFT transfer back to the original owner fails.
   * @dev If ERC1155 safe transfers are supported by the receiver wallet, the whitelisted NFT contract emits an ERC1155 TransferSingle event for the NFT transfer back to the staker.
   * @dev If ERC1155 safe transfers are not supported by the receiver wallet, the whitelisted NFT contract emits an ERC721 Transfer event for the NFT transfer back to the staker.
   * @dev While the contract is enabled, emits a HistoriesUpdated event.
   * @dev Emits a NftUnstaked event.
   * @param tokenId The token identifier, referencing the NFT being unstaked.
   */
  function unstake(address stakableContract, uint256 tokenId) public {
    _unstake(stakableContract, tokenId, _msgSender(), _msgSender());
  }

  /**
   * Estimates the claimable rewards for the specified maximum number of periods.
   * Estimation starts at first claimable period and continues until the last claimable period or maxPeriods is reached.
   * Estimations can be done only for periods which have already ended.
   * The maximum number of periods to claim can be calibrated to chunk down claims in several transactions to accomodate gas constraints.
   * @param maxPeriods The maximum number of periods to calculate for.
   * @return startPeriod The first period on which the computation starts.
   * @return periods The number of periods computed for.
   * @return amount The total claimable rewards.
   */
  function estimateRewards(uint16 maxPeriods)
    public
    view
    whenNotPaused
    returns (
      uint16 startPeriod,
      uint16 periods,
      uint256 amount
    )
  {
    (ComputedClaim memory claim, ) = _computeRewards(_msgSender(), maxPeriods);
    startPeriod = claim.startPeriod;
    periods = claim.periods;
    amount = claim.amount;
  }

  /**
   * Claims the claimable rewards for the specified maximum number of past periods, starting at the next claimable period.
   * Claims can be done only for periods which have already ended.
   * The maximum number of periods to claim can be calibrated to chunk down claims in several transactions to accomodate gas constraints.
   * @dev Reverts if the reward tokens transfer fails.
   * @dev The rewards token contract emits an ERC20 Transfer event for the reward tokens transfer.
   * @dev Emits a RewardsClaimed event.
   * @param maxPeriods The maximum number of periods to claim for.
   */
  function claimRewards(uint16 maxPeriods) external whenNotPaused {
    NextClaim memory nextClaim = nextClaims[_msgSender()];

    (ComputedClaim memory claim, NextClaim memory newNextClaim) = _computeRewards(_msgSender(), maxPeriods);

    // free up memory on already processed staker snapshots
    Snapshot[] storage stakerHistory = stakerHistories[_msgSender()];
    while (nextClaim.stakerSnapshotIndex < newNextClaim.stakerSnapshotIndex) {
      delete stakerHistory[nextClaim.stakerSnapshotIndex++];
    }

    if (claim.periods == 0) {
      return;
    }

    if (nextClaims[_msgSender()].period == 0) {
      return;
    }

    Snapshot memory lastStakerSnapshot = stakerHistory[stakerHistory.length - 1];

    uint256 lastClaimedCycle = (claim.startPeriod + claim.periods - 1) * periodLengthInCycles;
    if (
      lastClaimedCycle >= lastStakerSnapshot.startCycle && // the claim reached the last staker snapshot
      lastStakerSnapshot.stake == 0 // and nothing is staked in the last staker snapshot
    ) {
      // re-init the next claim
      delete nextClaims[_msgSender()];
    } else {
      nextClaims[_msgSender()] = newNextClaim;
    }

    if (claim.amount != 0) {
      coin.transferFrom(address(this), _msgSender(), claim.amount);
    }

    emit RewardsClaimed(_msgSender(), _getCycle(block.timestamp), claim.startPeriod, claim.periods, claim.amount);
  }

  /**
   * @return the token info for given token and contract.
   */
  function getTokenInfo(
    address stakableContract,
    address owner,
    uint256 id
  ) public view returns (TokenInfo memory) {
    return contracts[stakableContract].balances[owner][id];
  }

  /**
   * Retrieves the current cycle (index-1 based).
   * @return The current cycle (index-1 based).
   */
  function getCurrentCycle() external view returns (uint16) {
    return _getCycle(block.timestamp);
  }

  /**
   * Retrieves the current period (index-1 based).
   * @return The current period (index-1 based).
   */
  function getCurrentPeriod() external view returns (uint16) {
    return _getCurrentPeriod(periodLengthInCycles);
  }

  /**
   * Retrieves the last global snapshot index, if any.
   * @dev Reverts if the global history is empty.
   * @return The last global snapshot index.
   */
  function lastGlobalSnapshotIndex() external view returns (uint256) {
    uint256 length = globalHistory.length;
    require(length != 0, "empty global history");
    return length - 1;
  }

  /**
   * Retrieves the last staker snapshot index, if any.
   * @dev Reverts if the staker history is empty.
   * @return The last staker snapshot index.
   */
  function lastStakerSnapshotIndex(address staker) external view returns (uint256) {
    uint256 length = stakerHistories[staker].length;
    require(length != 0, "empty staker history");
    return length - 1;
  }

  /**
   * Stakes the NFT received by the contract for its owner. The NFT's weight will count for the current cycle.
   * @dev Reverts if `tokenId` is still on cooldown.
   * @dev Emits an HistoriesUpdated event.
   * @dev Emits an NftStaked event.
   * @param tokenId Identifier of the staked NFT.
   * @param owner Owner of the staked NFT.
   */
  function _stake(
    address stakableContract,
    uint256 tokenId,
    address owner,
    uint256 amount
  ) internal whenNotPaused {
    Contract storage kontrakt = contracts[stakableContract];
    require(kontrakt.enabled, "contract not enabled");

    uint16 periodLengthInCycles_ = periodLengthInCycles;
    uint16 currentCycle = _getCycle(block.timestamp);
    uint128 weight = uint128(kontrakt.nft.getStakingWeight(tokenId) * amount);

    _updateHistories(owner, int128(weight), currentCycle);

    // initialise the next claim if it was the first stake for this staker or if
    // the next claim was re-initialised (ie. rewards were claimed until the last
    // staker snapshot and the last staker snapshot has no stake)
    if (nextClaims[owner].period == 0) {
      uint16 currentPeriod = _getPeriod(currentCycle, periodLengthInCycles_);
      nextClaims[owner] = NextClaim(currentPeriod, uint64(globalHistory.length - 1), 0);
    }

    // todo this might be a problem
    uint16 withdrawCycle = kontrakt.balances[owner][tokenId].withdrawCycle;
    require(currentCycle != withdrawCycle, "unstaked token cooldown");

    // set the staked token's info
    kontrakt.balances[owner][tokenId] = TokenInfo(owner, weight, amount, currentCycle, 0);

    emit TokenStaked(owner, currentCycle, address(kontrakt.nft), tokenId, weight);
  }

  /**
   * Stakes the NFT received by the contract for its owner. The NFT's weight will count for the current cycle.
   * @dev Reverts if `tokenIds` is empty.
   * @dev Reverts if one of `tokenIds` is still on cooldown.
   * @dev Emits an HistoriesUpdated event.
   * @dev Emits an NftStaked event.
   * @param tokenIds Identifiers of the staked NFTs.
   * @param owner Owner of the staked NFTs.
   */
  function _stake(
    address stakableContract,
    uint256[] memory tokenIds,
    address owner,
    uint256[] memory amounts
  ) internal whenNotPaused {
    Contract storage kontrakt = contracts[stakableContract];
    require(kontrakt.enabled, "contract not enabled");

    uint256 numTokens = tokenIds.length;
    require(numTokens != 0, "no tokens");

    uint16 currentCycle = _getCycle(block.timestamp);
    uint128 totalStakedWeight = 0;
    uint256[] memory weights = new uint256[](numTokens);

    for (uint256 index = 0; index < numTokens; ++index) {
      uint256 tokenId = tokenIds[index];
      uint256 amount = amounts[index];
      require(currentCycle != kontrakt.balances[owner][tokenId].withdrawCycle, "unstaked token cooldown");
      uint128 weight = uint128(kontrakt.nft.getStakingWeight(tokenId) * amount);
      totalStakedWeight += weight; // This is safe
      weights[index] = weight;
      kontrakt.balances[owner][tokenId] = TokenInfo(owner, weight, amount, currentCycle, 0);
      emit TokenStaked(owner, currentCycle, address(kontrakt.nft), tokenId, weight);
    }

    _updateHistories(owner, int128(totalStakedWeight), currentCycle);

    // initialise the next claim if it was the first stake for this staker or if
    // the next claim was re-initialised (ie. rewards were claimed until the last
    // staker snapshot and the last staker snapshot has no stake)
    if (nextClaims[owner].period == 0) {
      uint16 currentPeriod = _getPeriod(currentCycle, periodLengthInCycles);
      nextClaims[owner] = NextClaim(currentPeriod, uint64(globalHistory.length - 1), 0);
    }
  }

  /**
   * Unstakes a batch of deposited NFTs from the contract.
   * @dev Reverts if `tokenIds` is empty.
   * @dev Reverts if the caller is not the original owner of any of the NFTs.
   * @dev While the contract is enabled, reverts if any NFT is being unstaked before its staking freeze duration has elapsed.
   * @dev While the contract is enabled, creates any missing snapshots, up-to the current cycle.
   * @dev While the contract is enabled, emits the HistoriesUpdated event.
   * @dev Emits the NftsBatchUnstaked event for each NFT unstaked.
   */
  function _unstake(
    address stakableContract,
    uint256 tokenId,
    address owner,
    address recipient
  ) internal {
    Contract storage kontrakt = contracts[stakableContract];
    require(kontrakt.enabled, "contract not enabled");

    TokenInfo storage tokenInfo = kontrakt.balances[owner][tokenId];
    require(tokenInfo.owner == owner, "not staked for owner");

    uint16 currentCycle = _getCycle(block.timestamp);
    uint128 weight = tokenInfo.weight;

    // ensure that at least an entire cycle has elapsed before unstaking the token to avoid
    // an exploit where a full cycle would be claimable if staking just before the end
    // of a cycle and unstaking right after the start of the new cycle
    require(currentCycle - tokenInfo.depositCycle >= 2, "token still frozen");
    _updateHistories(owner, -int128(uint128(weight)), currentCycle);

    // clear the token owner to ensure it cannot be unstaked again without being re-staked
    tokenInfo.owner = address(0);

    // set the withdrawal cycle to ensure it cannot be re-staked during the same cycle
    tokenInfo.withdrawCycle = currentCycle;

    kontrakt.nft.safeTransferFrom(address(this), recipient, tokenId, tokenInfo.amount, "");
    emit TokenUnstaked(owner, currentCycle, address(kontrakt.nft), tokenId, weight);
  }

  /**
   * Unstakes a batch of deposited NFTs from the contract.
   * @dev Reverts if `tokenIds` is empty.
   * @dev Reverts if the caller is not the original owner of any of the NFTs.
   * @dev While the contract is enabled, reverts if any NFT is being unstaked before its staking freeze duration has elapsed.
   * @dev While the contract is enabled, creates any missing snapshots, up-to the current cycle.
   * @dev While the contract is enabled, emits the HistoriesUpdated event.
   * @dev Emits the NftsBatchUnstaked event for each NFT unstaked.
   * @param tokenIds The token identifiers, referencing the NFTs being unstaked.
   */
  function _unstake(
    address stakableContract,
    uint256[] calldata tokenIds,
    address owner,
    address recipient
  ) internal {
    Contract storage kontrakt = contracts[stakableContract];
    require(kontrakt.enabled, "contract not enabled");

    uint256 numTokens = tokenIds.length;
    require(numTokens != 0, "no tokens");

    uint16 currentCycle = _getCycle(block.timestamp);
    int128 totalUnstakedWeight = 0;

    for (uint256 index = 0; index < numTokens; ++index) {
      uint256 tokenId = tokenIds[index];

      TokenInfo storage tokenInfo = kontrakt.balances[owner][tokenId];
      require(tokenInfo.owner == owner, "not staked for owner");

      // ensure that at least an entire cycle has elapsed before
      // unstaking the token to avoid an exploit where a a full cycle
      // would be claimable if staking just before the end of a cycle
      // and unstaking right after the start of the new cycle
      require(currentCycle - tokenInfo.depositCycle >= 2, "token still frozen");

      // clear the token owner to ensure it cannot be unstaked again
      // without being re-staked
      tokenInfo.owner = address(0);

      // we can use unsafe math here since the maximum total staked
      // weight that a staker can unstake must fit within uint128
      // (i.e. the staker snapshot stake limit)
      uint128 weight = tokenInfo.weight;
      totalUnstakedWeight += int128(uint128(weight)); // this is safe

      kontrakt.nft.safeTransferFrom(address(this), recipient, tokenId, tokenInfo.amount, "");
      emit TokenUnstaked(_msgSender(), currentCycle, address(kontrakt.nft), tokenId, weight);
    }

    _updateHistories(_msgSender(), -totalUnstakedWeight, currentCycle);
  }

  /**
   * Calculates the amount of rewards for a staker over a capped number of periods.
   * @dev Processes until the specified maximum number of periods to claim is reached, or the last computable period is reached, whichever occurs first.
   * @param staker The staker for whom the rewards will be computed.
   * @param maxPeriods Maximum number of periods over which to compute the rewards.
   * @return claim the result of computation
   * @return nextClaim the next claim which can be used to update the staker's state
   */
  function _computeRewards(address staker, uint16 maxPeriods)
    internal
    view
    returns (ComputedClaim memory claim, NextClaim memory nextClaim)
  {
    // computing 0 periods
    if (maxPeriods == 0) {
      return (claim, nextClaim);
    }

    // the history is empty
    if (globalHistory.length == 0) {
      return (claim, nextClaim);
    }

    nextClaim = nextClaims[staker];
    claim.startPeriod = nextClaim.period;

    // nothing has been staked yet
    if (claim.startPeriod == 0) {
      return (claim, nextClaim);
    }

    uint16 periodLengthInCycles_ = periodLengthInCycles; // 2
    uint16 endClaimPeriod = _getCurrentPeriod(periodLengthInCycles_); // 35

    // current period is not claimable
    if (nextClaim.period == endClaimPeriod) {
      return (claim, nextClaim);
    }

    // retrieve the next snapshots if they exist
    Snapshot[] memory stakerHistory = stakerHistories[staker];

    Snapshot memory globalSnapshot = globalHistory[nextClaim.globalSnapshotIndex];

    Snapshot memory stakerSnapshot = stakerHistory[nextClaim.stakerSnapshotIndex];

    Snapshot memory nextGlobalSnapshot;
    Snapshot memory nextStakerSnapshot;

    if (nextClaim.globalSnapshotIndex != globalHistory.length - 1) {
      nextGlobalSnapshot = globalHistory[nextClaim.globalSnapshotIndex + 1];
    }
    if (nextClaim.stakerSnapshotIndex != stakerHistory.length - 1) {
      nextStakerSnapshot = stakerHistory[nextClaim.stakerSnapshotIndex + 1];
    }

    // excludes the current period
    claim.periods = endClaimPeriod - nextClaim.period;

    if (maxPeriods < claim.periods) {
      claim.periods = maxPeriods;
    }

    // re-calibrate the end claim period based on the actual number of
    // periods to claim. nextClaim.period will be updated to this value
    // after exiting the loop
    endClaimPeriod = nextClaim.period + claim.periods;

    // iterate over periods
    while (nextClaim.period != endClaimPeriod) {
      uint16 nextPeriodStartCycle = nextClaim.period * periodLengthInCycles_ + 1;
      uint256 rewardPerCycle = rewardsSchedule[nextClaim.period];
      uint256 startCycle = nextPeriodStartCycle - periodLengthInCycles_;
      uint256 endCycle = 0;

      // iterate over global snapshots
      while (endCycle != nextPeriodStartCycle) {
        // find the range-to-claim starting cycle, where the current
        // global snapshot, the current staker snapshot, and the current
        // period overlap
        if (globalSnapshot.startCycle > startCycle) {
          startCycle = globalSnapshot.startCycle;
        }
        if (stakerSnapshot.startCycle > startCycle) {
          startCycle = stakerSnapshot.startCycle;
        }

        // find the range-to-claim ending cycle, where the current
        // global snapshot, the current staker snapshot, and the current
        // period no longer overlap. The end cycle is exclusive of the
        // range-to-claim and represents the beginning cycle of the next
        // range-to-claim
        endCycle = nextPeriodStartCycle;
        if ((nextGlobalSnapshot.startCycle != 0) && (nextGlobalSnapshot.startCycle < endCycle)) {
          endCycle = nextGlobalSnapshot.startCycle;
        }

        // only calculate and update the claimable rewards if there is
        // something to calculate with
        if ((globalSnapshot.stake != 0) && (stakerSnapshot.stake != 0) && (rewardPerCycle != 0)) {
          uint256 snapshotReward = (endCycle - startCycle).mul(rewardPerCycle);
          snapshotReward /= globalSnapshot.stake;
          snapshotReward *= stakerSnapshot.stake;

          claim.amount = claim.amount.add(snapshotReward);
        }

        // advance the current global snapshot to the next (if any)
        // if its cycle range has been fully processed and if the next
        // snapshot starts at most on next period first cycle
        if (nextGlobalSnapshot.startCycle == endCycle) {
          globalSnapshot = nextGlobalSnapshot;
          ++nextClaim.globalSnapshotIndex;

          if (nextClaim.globalSnapshotIndex != globalHistory.length - 1) {
            nextGlobalSnapshot = globalHistory[nextClaim.globalSnapshotIndex + 1];
          } else {
            nextGlobalSnapshot = Snapshot(0, 0);
          }
        }

        // advance the current staker snapshot to the next (if any)
        // if its cycle range has been fully processed and if the next
        // snapshot starts at most on next period first cycle
        if (nextStakerSnapshot.startCycle == endCycle) {
          stakerSnapshot = nextStakerSnapshot;
          ++nextClaim.stakerSnapshotIndex;

          if (nextClaim.stakerSnapshotIndex != stakerHistory.length - 1) {
            nextStakerSnapshot = stakerHistory[nextClaim.stakerSnapshotIndex + 1];
          } else {
            nextStakerSnapshot = Snapshot(0, 0);
          }
        }
      }

      ++nextClaim.period;
    }

    return (claim, nextClaim);
  }

  /**
   * Updates the history at the current cycle with a new difference in stake.
   * @dev It will update the latest snapshot if it starts at the current cycle, otherwise will create a new snapshot with the updated stake.
   * @param history The history to update.
   * @param stakeDelta The difference to apply to the current stake.
   * @param currentCycle The current cycle.
   * @return snapshotIndex Index of the snapshot that was updated or created (i.e. the latest snapshot index).
   */
  function _updateHistory(
    Snapshot[] storage history,
    int128 stakeDelta,
    uint16 currentCycle
  ) internal returns (uint256 snapshotIndex) {
    uint256 historyLength = history.length;
    uint128 snapshotStake;

    if (historyLength != 0) {
      // there is an existing snapshot
      snapshotIndex = historyLength - 1;
      Snapshot storage snapshot2 = history[snapshotIndex];
      snapshotStake = uint256(int256(int128(snapshot2.stake)).add(stakeDelta)).toUint128();

      if (snapshot2.startCycle == currentCycle) {
        // update the snapshot if it starts on the current cycle
        snapshot2.stake = snapshotStake;
        return snapshotIndex;
      }

      // update the snapshot index (as a reflection that a new latest
      // snapshot will be added to the history), if there was already an
      // existing snapshot
      snapshotIndex += 1;
    } else {
      // the snapshot index (as a reflection that a new latest snapshot
      // will be added to the history) should already be initialized
      // correctly to the default value 0

      // the stake delta will not be negative, if we have no history, as
      // that would indicate that we are unstaking without having staked
      // anything first
      snapshotStake = uint128(stakeDelta);
    }

    Snapshot memory snapshot;
    snapshot.stake = snapshotStake;
    snapshot.startCycle = currentCycle;

    // add a new snapshot in the history
    history.push(snapshot);
  }

  /**
   * Updates the global and staker histories at the current cycle with a new difference in stake.
   * @dev Emits a HistoriesUpdated event.
   * @param staker The staker who is updating the history.
   * @param stakeDelta The difference to apply to the current stake.
   * @param currentCycle The current cycle.
   */
  function _updateHistories(
    address staker,
    int128 stakeDelta,
    uint16 currentCycle
  ) internal {
    uint256 stakerSnapshotIndex = _updateHistory(stakerHistories[staker], stakeDelta, currentCycle);
    uint256 globalSnapshotIndex = _updateHistory(globalHistory, stakeDelta, currentCycle);

    emit HistoriesUpdated(
      staker,
      currentCycle,
      stakerHistories[staker][stakerSnapshotIndex].stake,
      globalHistory[globalSnapshotIndex].stake
    );
  }

  /**
   * Retrieves the cycle (index-1 based) at the specified timestamp.
   * @dev Reverts if the specified timestamp is earlier than the beginning of the staking schedule
   * @param timestamp The timestamp for which the cycle is derived from.
   * @return The cycle (index-1 based) at the specified timestamp.
   */
  function _getCycle(uint256 timestamp) internal view returns (uint16) {
    require(timestamp >= startTimestamp, "timestamp preceeds start");
    return (((timestamp - startTimestamp) / uint256(cycleLengthInSeconds)) + 1).toUint16();
  }

  /**
   * Retrieves the period (index-1 based) for the specified cycle and period length.
   * @dev reverts if the specified cycle is zero.
   * @param cycle The cycle within the period to retrieve.
   * @param periodLengthInCycles_ Length of a period, in cycles.
   * @return The period (index-1 based) for the specified cycle and period length.
   */
  function _getPeriod(uint16 cycle, uint16 periodLengthInCycles_) internal pure returns (uint16) {
    require(cycle != 0, "cycle cannot be zero");
    return (cycle - 1) / periodLengthInCycles_ + 1;
  }

  /**
   * Retrieves the current period (index-1 based).
   * @param periodLengthInCycles_ Length of a period, in cycles.
   * @return The current period (index-1 based).
   */
  function _getCurrentPeriod(uint16 periodLengthInCycles_) internal view returns (uint16) {
    return _getPeriod(_getCycle(block.timestamp), periodLengthInCycles_);
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view override(IERC165, ERC165, AccessControl) returns (bool) {
    return
      type(IERC721Receiver).interfaceId == interfaceId ||
      type(IERC1155Receiver).interfaceId == interfaceId ||
      super.supportsInterface(interfaceId);
  }
}
