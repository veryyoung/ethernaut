import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers, } from "hardhat";
import { Force, FuckForce } from "../typechain-types";

describe("Force", function () {

  let force: Force;
  let fuckForce: FuckForce;

  beforeEach(async function () {
    const forceFactory = await ethers.getContractFactory("Force");
    force = await forceFactory.deploy();
    await force.deployed();

    const fuckForceFactory = await ethers.getContractFactory("FuckForce");
    fuckForce = await fuckForceFactory.deploy(force.address);
    await fuckForce.deployed();
  });

  it("Should fuck force success", async function () {
    await fuckForce.fuck({ value: 1 });

    expect(await ethers.provider.getBalance(force.address)).to.greaterThan(BigNumber.from(0));
  });

});
