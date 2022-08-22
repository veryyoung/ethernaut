// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract TokenInterface {
    function transfer(address _to, uint256 _value) public returns (bool) {}
}

contract FuckToken {
    TokenInterface tokenInstance;

    constructor(address _contractAddress) {
        tokenInstance = TokenInterface(_contractAddress);
    }

    function fuck(address _to, uint256 _value) external {
        tokenInstance.transfer(_to, _value);
    }
}
