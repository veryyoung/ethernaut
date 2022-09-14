import { expect } from "chai";
import { ethers } from "hardhat";
import { GatekeeperOne, FuckGatekeeperOne } from "../typechain-types";

describe("GatekeeperOne", function () {

  let gatekeeperOne: GatekeeperOne;
  let fuckGatekeeperOne: FuckGatekeeperOne;

  const data = "0x72ebbfefb90b97503346b4ec6cac5230947e8237a171ca593561ebc6ddc9def5";

  beforeEach(async function () {
    const gatekeeperOneFactory = await ethers.getContractFactory("GatekeeperOne");
    gatekeeperOne = await gatekeeperOneFactory.deploy();
    await gatekeeperOne.deployed();

    const fuckGatekeeperOneFactory = await ethers.getContractFactory("FuckGatekeeperOne");
    fuckGatekeeperOne = await fuckGatekeeperOneFactory.deploy(gatekeeperOne.address);
    await fuckGatekeeperOne.deployed();
  });

  it("Should fuck GatekeeperOne success", async function () {
    const accounts = await ethers.getSigners();
    await fuckGatekeeperOne.connect(accounts[0]).fuck();

    expect(await gatekeeperOne.entrant()).to.eq(accounts[0].address);
  });

});
