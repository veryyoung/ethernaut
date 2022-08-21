import { ethers } from "hardhat";

async function main() {
  const coninFlipFactory = await ethers.getContractFactory("CoinFlip");
  const coninFlip = await coninFlipFactory.deploy();

  await coninFlip.deployed();

  console.log(`ConinFlip deployed to ${coninFlip.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
