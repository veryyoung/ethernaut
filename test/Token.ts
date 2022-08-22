import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { Token, FuckToken } from "../typechain-types";

describe("Token", function () {

  let token: Token;
  let fuckToken: FuckToken;

  beforeEach(async function () {
    const tokenFactory = await ethers.getContractFactory("Token");
    token = await tokenFactory.deploy(10000);
    await token.deployed();

    const fuckTokenFactory = await ethers.getContractFactory("FuckToken");

    fuckToken = await fuckTokenFactory.deploy(token.address);
    await fuckToken.deployed();
  });

  it("Should fuck token success", async function () {
    const accounts = await ethers.getSigners();

    await fuckToken.connect(accounts[1]).fuck(accounts[1].address, 21);

    expect(await token.balanceOf(accounts[1].address)).to.greaterThan(BigNumber.from(20));
  });

});
