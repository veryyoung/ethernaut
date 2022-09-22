import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers, } from "hardhat";
import { SwappableToken, DexTwo } from "../typechain-types";

describe("DexTwo", function () {

  let dex: DexTwo;
  let token1: SwappableToken;
  let token2: SwappableToken;
  let token3: SwappableToken;
  let token4: SwappableToken;

  beforeEach(async function () {
    const dexFactory = await ethers.getContractFactory("DexTwo");
    dex = await dexFactory.deploy();
    await dex.deployed();

    const swappableTokenFactory = await ethers.getContractFactory("SwappableToken");
    token1 = await swappableTokenFactory.deploy(dex.address, "Token1", "TKN1", 110);
    await token1.deployed();

    token2 = await swappableTokenFactory.deploy(dex.address, "Token2", "TKN2", 110);
    await token2.deployed();

    const accounts = await ethers.getSigners();

    token3 = await swappableTokenFactory.connect(accounts[1]).deploy(dex.address, "Token3", "TKN3", 200);
    await token3.deployed();

    token4 = await swappableTokenFactory.connect(accounts[1]).deploy(dex.address, "Token4", "TKN4", 200);
    await token3.deployed();


    await token1.transfer(accounts[1].address, 10);
    await token2.transfer(accounts[1].address, 10);

    await dex.setTokens(token1.address, token2.address);

    await token1["approve(address,uint256)"](dex.address, 10000);
    await token2["approve(address,uint256)"](dex.address, 10000);
    await token3["approve(address,uint256)"](dex.address, 10000);
    await token4["approve(address,uint256)"](dex.address, 10000);

    await dex.add_liquidity(token1.address, 100);
    await dex.add_liquidity(token2.address, 100);



    await token1.connect(accounts[1])["approve(address,uint256)"](dex.address, 10000);
    await token2.connect(accounts[1])["approve(address,uint256)"](dex.address, 10000);
    await token3.connect(accounts[1])["approve(address,uint256)"](dex.address, 10000);
    await token4.connect(accounts[1])["approve(address,uint256)"](dex.address, 10000);

    await token3.connect(accounts[1]).transfer(dex.address, 100);
    await token4.connect(accounts[1]).transfer(dex.address, 100);

  });

  it("Should fuck DexTwo success", async function () {
    const accounts = await ethers.getSigners();

    await dex.connect(accounts[1]).swap(token3.address, token1.address, BigNumber.from(100));

    expect(await token1.balanceOf(dex.address)).to.eq(BigNumber.from(0));


    await dex.connect(accounts[1]).swap(token4.address, token2.address, BigNumber.from(100));

    expect(await token2.balanceOf(dex.address)).to.eq(BigNumber.from(0));

  });

});
