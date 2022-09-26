import { expect } from "chai";
import { ethers } from "hardhat";
import { CryptoVault, LegacyToken, Forta, DoubleEntryPoint, FuckDoubleEntryPoint } from "../typechain-types";

describe("DoubleEntryPoint", function () {

  let cryptoVault: CryptoVault;
  let legacyToken: LegacyToken;
  let forta: Forta;
  let doubleEntryPoint: DoubleEntryPoint;


  beforeEach(async function () {
    const accounts = await ethers.getSigners();

    const cryptoVaultFactory = await ethers.getContractFactory("CryptoVault");
    cryptoVault = await cryptoVaultFactory.deploy(accounts[0].address);
    await cryptoVault.deployed();

    const legacyTokenFactory = await ethers.getContractFactory("LegacyToken");
    legacyToken = await legacyTokenFactory.deploy();
    await legacyToken.deployed();

    await legacyToken.mint(cryptoVault.address, ethers.utils.parseEther("100"));

    const fortaFactory = await ethers.getContractFactory("Forta");
    forta = await fortaFactory.deploy();
    await forta.deployed();


    const doubleEntryPointFactory = await ethers.getContractFactory("DoubleEntryPoint");
    doubleEntryPoint = await doubleEntryPointFactory.deploy(legacyToken.address, cryptoVault.address, forta.address, accounts[1].address);
    await doubleEntryPoint.deployed();

    await cryptoVault.setUnderlying(doubleEntryPoint.address);

    await legacyToken.delegateToNewContract(doubleEntryPoint.address);

  });

  it("Should fuck DoubleEntryPoint success", async function () {
    const accounts = await ethers.getSigners();

    const fuckDoubleEntryPointFactory = await ethers.getContractFactory(
      'FuckDoubleEntryPoint'
    );
    const detectionBot = await fuckDoubleEntryPointFactory.connect(accounts[1]).deploy(forta.address, cryptoVault.address);
    await detectionBot.deployed();

    await forta.connect(accounts[1]).setDetectionBot(detectionBot.address);

    await expect(cryptoVault.sweepToken(legacyToken.address)).to.be.revertedWith("Alert has been triggered, reverting");

  });

});
