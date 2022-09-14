import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { NaughtCoin } from "../typechain-types";

describe("NaughtCoin", function () {

  let naughtCoin: NaughtCoin;


  beforeEach(async function () {
    const accounts = await ethers.getSigners();
    const naughtCoinFactory = await ethers.getContractFactory("NaughtCoin");
    naughtCoin = await naughtCoinFactory.deploy(accounts[0].address);
    await naughtCoin.deployed();


  });

  it("Should fuck NaughtCoin success", async function () {
    const accounts = await ethers.getSigners();

    const balance = await naughtCoin.balanceOf(accounts[0].address);

    await naughtCoin.approve(accounts[0].address, balance);
    await naughtCoin.transferFrom(accounts[0].address, accounts[1].address, balance);

    expect(await naughtCoin.balanceOf(accounts[0].address)).to.eq(BigNumber.from(0));
  });

});
