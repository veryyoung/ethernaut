import { expect } from "chai";
import { ethers, } from "hardhat";
import { Privacy } from "../typechain-types";
import { utils } from 'ethers';

describe("Privacy", function () {

  let privacy: Privacy;

  const data = "0x72ebbfefb90b97503346b4ec6cac5230947e8237a171ca593561ebc6ddc9def5";

  beforeEach(async function () {
    const privacyFactory = await ethers.getContractFactory("Privacy");

    privacy = await privacyFactory.deploy([utils.formatBytes32String('password'), utils.formatBytes32String('password2'), data]);
    await privacy.deployed();

  });

  it("Should fuck privacy success", async function () {
    const storedData = await ethers.provider.getStorageAt(privacy.address, 5);

    expect(storedData).to.eq(data);

    await privacy.unlock(utils.hexDataSlice(storedData, 0, 16));

    expect(await privacy.locked()).to.eq(false);
  });

});
