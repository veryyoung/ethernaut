import { expect } from "chai";
import { ethers } from "hardhat";
import { Preservation, FuckPreservation } from "../typechain-types";

describe("Preservation", function () {

  let preservation: Preservation;
  let fuckPreservation: FuckPreservation;

  beforeEach(async function () {
    const libraryContractFactory = await ethers.getContractFactory("LibraryContract");
    const timeZone1Library = await libraryContractFactory.deploy();
    await timeZone1Library.deployed();

    const timeZone2Library = await libraryContractFactory.deploy();
    await timeZone2Library.deployed();

    const preservationFactory = await ethers.getContractFactory("Preservation");
    preservation = await preservationFactory.deploy(timeZone2Library.address, timeZone2Library.address);
    await preservation.deployed();

    const fuckPreservationFactory = await ethers.getContractFactory("FuckPreservation");
    fuckPreservation = await fuckPreservationFactory.deploy(preservation.address);
    await fuckPreservation.deployed();
  });

  it("Should fuck Preservation success", async function () {
    const accounts = await ethers.getSigners();


    await fuckPreservation.connect(accounts[1]).fuck();


    expect(await preservation.owner()).to.eq(accounts[1].address);
  });

});
