import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { GoodSamaritan, FuckGoodSamaritan, Coin } from "../typechain-types";

describe("GoodSamaritan", function () {

  let goodSamaritan: GoodSamaritan;
  let fuckGoodSamaritan: FuckGoodSamaritan;


  beforeEach(async function () {
    const goodSamaritanFactory = await ethers.getContractFactory("GoodSamaritan");
    goodSamaritan = await goodSamaritanFactory.deploy();
    await goodSamaritan.deployed();

    const fuckGoodSamaritanFactory = await ethers.getContractFactory("FuckGoodSamaritan");
    fuckGoodSamaritan = await fuckGoodSamaritanFactory.deploy(goodSamaritan.address);
    await fuckGoodSamaritan.deployed();

  });

  it("Should fuck GoodSamaritan success", async function () {
    const coinFactory = await ethers.getContractFactory("Coin");


    await fuckGoodSamaritan.fuck();


    const coin = coinFactory.attach(await goodSamaritan.coin()) as Coin;

    const balance = await coin.balances(goodSamaritan.address);

    expect(balance).to.eq(BigNumber.from(0));
  });

});
