import { expect } from "chai";
import { ethers } from "hardhat";
import { Denial, FuckDenial } from "../typechain-types";

describe("Denial", function () {

  let denial: Denial;
  let fuckDenial: FuckDenial;

  beforeEach(async function () {
    const denialFactory = await ethers.getContractFactory("Denial");
    denial = await denialFactory.deploy();
    await denial.deployed();

    const fuckDenialFactory = await ethers.getContractFactory("FuckDenial");
    fuckDenial = await fuckDenialFactory.deploy(denial.address);
    await fuckDenial.deployed();
  });

  it("Should fuck Denial success", async function () {
    await denial.setWithdrawPartner(fuckDenial.address);

    await expect(denial.withdraw({ gasLimit: 21064 })).to.be.revertedWithoutReason();
  });

});
