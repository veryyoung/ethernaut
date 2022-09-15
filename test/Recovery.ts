import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { Recovery, FuckRecovery } from "../typechain-types";

describe("Recovery", function () {

  let recovery: Recovery;
  let fuckRecovery: FuckRecovery;

  beforeEach(async function () {
    const recoveryFactory = await ethers.getContractFactory("Recovery");
    recovery = await recoveryFactory.deploy();
    await recovery.deployed();


  });

  it("Should fuck Recovery success", async function () {
    const simpleTokenAddress = ethers.utils.getContractAddress({
      from: recovery.address,
      nonce: "0x01",
    })

    await recovery.generateToken("TokenName", 10000);

    const accounts = await ethers.getSigners();
    await accounts[0].sendTransaction({
      to: simpleTokenAddress,
      value: ethers.utils.parseEther("0.001")
    });


    const fuckRecoveryFactory = await ethers.getContractFactory("FuckRecovery");
    fuckRecovery = await fuckRecoveryFactory.deploy(simpleTokenAddress);
    await fuckRecovery.deployed();

    await fuckRecovery.fuck();


    expect(await ethers.provider.getBalance(simpleTokenAddress)).to.eq(BigNumber.from(0));
  });

});
