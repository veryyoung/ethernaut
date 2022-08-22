import { expect } from "chai";
import { ethers } from "hardhat";
import { Telephone, FuckTelephone } from "../typechain-types";

describe("Telephone", function () {

  let telephone: Telephone;
  let fuckTelephone: FuckTelephone;

  beforeEach(async function () {
    const telephoneFactory = await ethers.getContractFactory("Telephone");
    telephone = await telephoneFactory.deploy();
    await telephone.deployed();

    const fuckTelephoneFactory = await ethers.getContractFactory("FuckTelephone");
    fuckTelephone = await fuckTelephoneFactory.deploy(telephone.address);
    await fuckTelephone.deployed();
  });

  it("Should fuck telephone success", async function () {
    const accounts = await ethers.getSigners();

    await fuckTelephone.connect(accounts[1]).fuck();

    expect(await telephone.owner()).to.equal(accounts[1].address);
  });

});
