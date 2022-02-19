// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import "./extensions/Presalable.sol";
import "./ERC721B.sol";


abstract contract PlayableRights is ERC721B {
    using Counters for Counters.Counter;

    enum Sale {NoSale, Presale, PublicSale}

    struct SaleLaunch {
        Sale Sale;
        uint256 timestamp;
    }

    SaleLaunch public state; 

    string private baseURI;

    uint64 public immutable MAXIMUM_SUPPLY = 0;

    uint256 public immutable PRICE_FLOOR = 1 ether / 100; // 0.01 ETH
    
    uint256 public immutable PRICE_CEILING = 10 ether; // 10 ETH

    /**
     * Presale root to chekc merkle proof againts.
     */ 
    bytes32 private presaleRoot;

    /**
     * Weights maps the given tokenId to staking weight.
     */
    mapping(uint256 => uint64) private weights;

    /**
     * Private counter, incrementing with every mint.
     */
    Counters.Counter private tokenIds;

    /**
     * Internal override of _baseURI to make the parent ERC721 openzeplin
     * version to work.
     */
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    /**
     * Will set the base URI.
     */
    function setBaseURI(string calldata _tokenBaseURI) external onlyOwner {
        baseURI = _tokenBaseURI;
    }

    /**
     * Will enable presale at specific time.
     */
    function enablePresaleMintAt(uint256 at) public onlyOwner {
        state = SaleLaunch(Sale.Presale, at);
    }

    /**
     * Will enable minting at specific time.
     */
    function enablePublicMintAt(uint256 at) public onlyOwner {
        state = SaleLaunch(Sale.PublicSale, at);
    }

    /**
     * Disables the minting.
     */
    function disable() public onlyOwner {
        state = SaleLaunch(Sale.NoSale, 0);
    }

    /**
     * To comply with ERC721-Stakable. It returns weight of produced stake.
     */
    function getStakingWeight(uint256 tokenId) public override view returns (uint64) {
        return weights[tokenId];
    }

    /**
     * Will return multiplier.
     */
    function getStakingMultiplier(uint256 value) public virtual view returns (uint64);

    /**
     * Public mint function mints token and return its URI.
     */
    function mint() external payable returns (string memory) {
        require(state.Sale == Sale.PublicSale, "mint disabled");
        require(block.timestamp >= state.timestamp, "mint disabled");

        require(tokenIds.current() + 1 > MAXIMUM_SUPPLY, "sold out");

        require(msg.value >= PRICE_FLOOR, "value sent is below price floor");
        require(msg.value <= PRICE_CEILING, "value sent is above price ceriling");
        uint64 weight = uint64(getStakingMultiplier(msg.value) / 1 ether);

        tokenIds.increment();
        _safeMint(_msgSender(), tokenIds.current());
        weights[tokenIds.current()] = weight;

        return tokenURI(tokenIds.current());
    }

    /**
     * Presale mint function mints token and return its URI. In order to mint
     * user needs to provide merkle proof.
     */
    function mint(bytes32[] memory proof) external payable returns (string memory) {
        require(state.Sale == Sale.Presale, "mint disabled");
        require(block.timestamp >= state.timestamp, "mint disabled");

        require(tokenIds.current() + 1 > MAXIMUM_SUPPLY, "sold out");

        require(msg.value >= PRICE_FLOOR, "value sent is below price floor");
        require(msg.value <= PRICE_CEILING, "value sent is above price ceriling");
        uint64 weight = uint64((msg.value * 1_100) / 1 ether);

        require(balanceOf(_msgSender()) == 0, "already claimed");
        require(_verify(msg.sender, proof), "not in presale");

        tokenIds.increment();
        _safeMint(_msgSender(), tokenIds.current());
        weights[tokenIds.current()] = weight;

        return tokenURI(tokenIds.current());
    }

    /**
     * Internal function which verifies the proof by hashing and comparing with root.
     */
    function _verify(address account, bytes32[] memory proof) internal view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(account));
        return MerkleProof.verify(proof, presaleRoot, leaf);
    }

}

