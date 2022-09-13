import { expect } from "chai";
import { ethers } from "hardhat";
import { Elevator, FuckElevator } from "../typechain-types";

describe("Elevator", function () {

  let elevator: Elevator;
  let fuckElevator: FuckElevator;

  beforeEach(async function () {
    const elevatorFactory = await ethers.getContractFactory("Elevator");
    elevator = await elevatorFactory.deploy();
    await elevator.deployed();

    const fuckElevatorFactory = await ethers.getContractFactory("FuckElevator");
    fuckElevator = await fuckElevatorFactory.deploy(elevator.address);
    await fuckElevator.deployed();
  });

  it("Should fuck elevator success", async function () {

    await fuckElevator.fuck();

    expect(await elevator.top()).to.eq(true);

  });

});
