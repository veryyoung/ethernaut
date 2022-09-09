import { expect } from "chai";
import { ethers, } from "hardhat";
import { Vault } from "../typechain-types";

describe("Vault", function () {

  let vault: Vault;
  const password = "A very strong secret password :)";
  const hexPassword = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(password));

  beforeEach(async function () {
    const vaultFactory = await ethers.getContractFactory("Vault");

    vault = await vaultFactory.deploy(hexPassword);
    await vault.deployed();

  });

  it("Should fuck vault success", async function () {
    const storedPassword = await ethers.provider.getStorageAt(vault.address, 1);

    expect(storedPassword).to.eq(hexPassword);

    await vault.unlock(storedPassword);

    expect(await vault.locked()).to.eq(false);
  });

});
