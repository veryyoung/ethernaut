import { expect } from "chai";
import { ethers } from "hardhat";
import { CoinFlip, FuckCoinFlip } from "../typechain-types";

describe("CoinFlip", function () {

  let coinFlip: CoinFlip;
  let fuckCoinFlip: FuckCoinFlip;

  beforeEach(async function () {
    const coinFlipFactory = await ethers.getContractFactory("CoinFlip");
    coinFlip = await coinFlipFactory.deploy();
    await coinFlip.deployed();

    const fuckCoinFlipFactory = await ethers.getContractFactory("FuckCoinFlip");
    fuckCoinFlip = await fuckCoinFlipFactory.deploy(coinFlip.address);
    await fuckCoinFlip.deployed();
  });

  it("Should fuck coin flip success", async function () {
    for (let i = 1; i <= 10; i++) {
      await fuckCoinFlip.fuck();
    }
    expect(await coinFlip.consecutiveWins()).to.equal(10);
  });

});
