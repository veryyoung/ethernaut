import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { assemble, parse } from "@ethersproject/asm";
import { MagicNum } from "../typechain-types";

describe("MagicNum", function () {

  let magicNum: MagicNum;

  const abi = [
    "function whatIsTheMeaningOfLife() public view returns (uint256)",
  ]

  beforeEach(async function () {
    const magicNumFactory = await ethers.getContractFactory("MagicNum");
    magicNum = await magicNumFactory.deploy();
    await magicNum.deployed();

  });

  it("Should fuck magic number success", async function () {
    const accounts = await ethers.getSigners();

    const solverAddress = ethers.utils.getContractAddress({
      from: accounts[0].address,
      nonce: await accounts[0].getTransactionCount()
    });

    const contract_code = await assemble(
      parse(`
        mstore8(31, 42)
        return(0, 32)
      `),
      {
        target: "_",
      }
    );

    const deploy_template = await assemble(
      parse(`
        codecopy(0, 0, 0)
        return(0, 0)
      `),
      {
        target: "_"
      }
    );

    const deploy_code = await assemble(
      parse(`
        codecopy(0, ${ethers.utils.arrayify(deploy_template).length}, ${ethers.utils.arrayify(contract_code).length})
        return(0, ${ethers.utils.arrayify(contract_code).length})
      `),
      {
        target: "_"
      }
    )

    await accounts[0].sendTransaction({
      data: deploy_code + contract_code.slice(2)
    });

    await magicNum.setSolver(solverAddress);

    const solver = new ethers.Contract(solverAddress, abi, accounts[0]);


    expect(await solver.whatIsTheMeaningOfLife()).to.eq(BigNumber.from(42));

  });

});
