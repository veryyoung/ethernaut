import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { Shop, FuckShop } from "../typechain-types";

describe("Shop", function () {

  let shop: Shop;
  let fuckShop: FuckShop;


  beforeEach(async function () {
    const shopFactory = await ethers.getContractFactory("Shop");
    shop = await shopFactory.deploy();
    await shop.deployed();

    const fuckShopFactory = await ethers.getContractFactory("FuckShop");
    fuckShop = await fuckShopFactory.deploy(shop.address);
    await fuckShop.deployed();
  });

  it("Should fuck Shop success", async function () {
    await fuckShop.fuck();

    expect(await shop.isSold()).to.eq(true);
    expect(await shop.price()).to.eq(BigNumber.from(0));
  });

});
