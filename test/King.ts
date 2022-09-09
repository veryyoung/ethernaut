import { expect } from "chai";
import { ethers } from "hardhat";
import { King, FuckKing } from "../typechain-types";

describe("King", function () {

  let king: King;
  let fuckKing: FuckKing;

  const value = 1000000000000000;

  beforeEach(async function () {
    const kingFactory = await ethers.getContractFactory("King");
    king = await kingFactory.deploy({ value: value });
    await king.deployed();

    const fuckKingFactory = await ethers.getContractFactory("FuckKing");
    fuckKing = await fuckKingFactory.deploy(king.address);
    await fuckKing.deployed();
  });

  it("Should fuck king success", async function () {
    await fuckKing.fuck({ value: value });

    expect(await king._king()).to.equal(fuckKing.address);
  });

});
