import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{
      version: "0.8.9",
    }, {
      version: "0.6.0",
    }]
  },
  networks: {
    localhost: {
      url: "http://localhost:7545",
    },
  }
};

export default config;
