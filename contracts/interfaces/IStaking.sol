// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

interface IStaking is IERC1155Receiver, IERC721Receiver {
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
   * Starts the first cycle of staking, enabling users to stake NFTs.
   * @dev Reverts if not called by the owner.
   * @dev Reverts if the staking has already started.
   * @dev Emits a Started event.
   */
  function start() external;

  /**
   * @dev Will pause the contract.
   */
  function pause() external;

  /**
   * @dev Will unpause the contract.
   */
  function unpause() external;

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
  ) external;

  /**
   * @dev Will enable contract and staking for give contract
   */
  function addContract(address nft) external;

  /**
   * @dev Will remove contract from staking
   */
  function removeContract(address nft) external;

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
  function unstake(address nft, uint256 tokenId) external;

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
  function batchUnstake(address nft, uint256[] calldata tokenIds) external;

  /**
   * Estimates the claimable rewards for the specified maximum number of past periods, starting at the next claimable period.
   * Estimations can be done only for periods which have already ended.
   * The maximum number of periods to claim can be calibrated to chunk down claims in several transactions to accomodate gas constraints.
   * @param maxPeriods The maximum number of periods to calculate for.
   * @return startPeriod The first period on which the computation starts.
   * @return periods The number of periods computed for.
   * @return amount The total claimable rewards.
   */
  function estimateRewards(uint16 maxPeriods)
    external
    view
    returns (
      uint16 startPeriod,
      uint16 periods,
      uint256 amount
    );

  /**
   * Claims the claimable rewards for the specified maximum number of past periods, starting at the next claimable period.
   * Claims can be done only for periods which have already ended.
   * The maximum number of periods to claim can be calibrated to chunk down claims in several transactions to accomodate gas constraints.
   * @dev Reverts if the reward tokens transfer fails.
   * @dev The rewards token contract emits an ERC20 Transfer event for the reward tokens transfer.
   * @dev Emits a RewardsClaimed event.
   * @param maxPeriods The maximum number of periods to claim for.
   */
  function claimRewards(uint16 maxPeriods) external;

  /**
   * @return the token info for given token and contract.
   */
  function getTokenInfo(address nft, uint256 id) external view returns (TokenInfo memory);

  /**
   * Retrieves the current cycle (index-1 based).
   * @return The current cycle (index-1 based).
   */
  function getCurrentCycle() external view returns (uint16);

  /**
   * Retrieves the current period (index-1 based).
   * @return The current period (index-1 based).
   */
  function getCurrentPeriod() external view returns (uint16);

  /**
   * Retrieves the last global snapshot index, if any.
   * @dev Reverts if the global history is empty.
   * @return The last global snapshot index.
   */
  function lastGlobalSnapshotIndex() external view returns (uint256);

  /**
   * Retrieves the last staker snapshot index, if any.
   * @dev Reverts if the staker history is empty.
   * @return The last staker snapshot index.
   */
  function lastStakerSnapshotIndex(address staker) external view returns (uint256);
}
