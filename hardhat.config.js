const { task } = require("hardhat/config");

require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const ETH_URL = process.env.ETH_URL;
const BLOCK_NUMBER = parseInt(process.env.BLOCK_NUMBER) || 12181575;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }

  const blockNumber = await ethers.provider.getBlockNumber();
  console.log("block", blockNumber);
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: ETH_URL,
        blockNumber: BLOCK_NUMBER
      }
    },
  }
};
