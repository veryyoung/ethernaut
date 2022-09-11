import { expect } from "chai";
import { ethers } from "hardhat";
import { Reentrance, FuckReentrance } from "../typechain-types";

describe("Reentrancy", function () {

  let reentrance: Reentrance;
  let fuckReentrance: FuckReentrance;

  beforeEach(async function () {
    const telephoneFactory = await ethers.getContractFactory("Reentrance");
    reentrance = await telephoneFactory.deploy();
    await reentrance.deployed();

    const fuckReentranceFactory = await ethers.getContractFactory("FuckReentrance");
    fuckReentrance = await fuckReentranceFactory.deploy(reentrance.address);
    await fuckReentrance.deployed();
  });

  it("Should fuck reentrance success", async function () {
    const accounts = await ethers.getSigners();

    await reentrance.connect(accounts[0]).donate(accounts[0].address, {
      value: ethers.utils.parseEther("0.001")
    });

    await reentrance.connect(accounts[1]).donate(fuckReentrance.address, {
      value: ethers.utils.parseEther("0.0005")
    });

    await fuckReentrance.connect(accounts[1]).fuck(ethers.utils.parseEther("0.0001"));

    expect(await ethers.provider.getBalance(reentrance.address)).to.lt(ethers.utils.parseEther("0.0015"));

  });

});
