/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
//0.8.1
// 안되면 그냥 API에 그냥 넣어버리기
//API_URL="https://eth-goerli.g.alchemy.com/v2/hKIHTiWIzgcwO8OvMHPskcMkyU5PmN-Z"
//PRIVATE_KEY='05bdc8f37a3304dfbe51dfd1130489686225fed169baede74d55b015fea7a262'
