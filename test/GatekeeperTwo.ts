import { expect } from "chai";
import { ethers } from "hardhat";
import { GatekeeperTwo, FuckGatekeeperTwo } from "../typechain-types";

describe("GatekeeperTwo", function () {

  let gatekeeperTwo: GatekeeperTwo;
  let fuckGatekeeperTwo: FuckGatekeeperTwo;


  beforeEach(async function () {
    const gatekeeperTwoFactory = await ethers.getContractFactory("GatekeeperTwo");
    gatekeeperTwo = await gatekeeperTwoFactory.deploy();
    await gatekeeperTwo.deployed();


  });

  it("Should fuck GatekeeperTwo success", async function () {
    const fuckGatekeeperTwoFactory = await ethers.getContractFactory("FuckGatekeeperTwo");
    fuckGatekeeperTwo = await fuckGatekeeperTwoFactory.deploy(gatekeeperTwo.address);
    await fuckGatekeeperTwo.deployed();

    const accounts = await ethers.getSigners();

    expect(await gatekeeperTwo.entrant()).to.eq(accounts[0].address);
  });

});
