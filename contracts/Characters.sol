// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import "./extensions/IERC1155721WithStakingSupport.sol";
import "./extensions/ERC721Base.sol";
import "./extensions/Presalable.sol";


contract Characters is ERC721Base {
    using Counters for Counters.Counter;

    enum Sale {NoSale, PublicSale}

    struct SaleLaunch {
        Sale Sale;
        uint256 timestamp;
    }

    SaleLaunch state; 

    Counters.Counter private collectionsIds;


    // global presale root for presale    
    bytes32 private presaleRoot;

    string public baseURI;

    constructor() ERC721A("Mage Brotherhood Knights", "MKB") {}

    function setBaseURI(string calldata _tokenBaseURI) external onlyOwner {
        baseURI = _tokenBaseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function enableAt(uint256 at) public onlyOwner {
        state = SaleLaunch(Sale.PublicSale, at);
    }

    function disable() public onlyOwner {
        state = SaleLaunch(Sale.NoSale, 0);
    }

    function getStakingWeight(uint256) public override pure returns (uint64) {
        return 1;
    }


    function mint(uint256 _amount) external payable {
        require(state.Sale == Sale.PublicSale, "mint disabled");

        require(_amount > 0, "zero amount");
        require(_amount <= 3, "can't mint so much tokens");

        require(
            totalMinted + _amount <= maxMintSupply,
            "max supply exceeded"
        );
        require(
            _price * _amount <= msg.value,
            "value sent is not correct"
        );
        for (uint256 ind = 0; ind < _amount; ind++) {
            _tokenIds.increment();
            _safeMint(msg.sender, _tokenIds.current());
            totalMinted = totalMinted + 1;
        }
    }


    // /**
    //  * Presale Mint, allows you to mint nft but you need to provide merkle proof,
    //  * see function verify().
    //  */
    // function mint(uint256 _amount, bytes32[] memory proof) external payable {
    //     require(isPresaleEnabled(), "presale disabled");
    //     require(!publicState, "presale disabled");

    //     require(
    //         totalMinted + _amount <= maxMintSupply,
    //         "max supply exceeded"
    //     );
    //     require(
    //         _price * _amount <= msg.value,
    //         "value sent is not correct"
    //     );
    //     require(
    //         _presaleClaimed[msg.sender] + _amount <= presaleMintLimit,
    //         "can't mint such a amount"
    //     );
    //     require(verify(msg.sender, proof), "not selected for the presale");

    //     for (uint256 ind = 0; ind < _amount; ind++) {
    //         _tokenIds.increment();
    //         _safeMint(msg.sender, _tokenIds.current());
    //         _presaleClaimed[msg.sender] = _presaleClaimed[msg.sender] + 1;
    //         totalMinted = totalMinted + 1;
    //     }
    // }





}

