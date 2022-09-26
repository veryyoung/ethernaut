// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IForta {
    function setDetectionBot(address detectionBotAddress) external;

    function notify(address user, bytes calldata msgData) external;

    function raiseAlert(address user) external;
}

contract FuckDoubleEntryPoint {
    IForta forta;
    address cryptoVaultAddress;

    constructor(address _fortaAddress, address _cryptoVaultAddress) {
        forta = IForta(_fortaAddress);
        cryptoVaultAddress = _cryptoVaultAddress;
    }

    function handleTransaction(address user, bytes calldata msgData) external {
        (, , address origSender) = abi.decode(
            msgData[4:],
            (address, uint256, address)
        );
        if (origSender == cryptoVaultAddress) {
            forta.raiseAlert(user);
        }
    }
}
