import { HardhatUserConfig } from 'hardhat/config';
import "@nomiclabs/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.0',
  },
  networks: {
    hardhat: {}, // Local development network
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID',
      accounts: [`0xYOUR_PRIVATE_KEY`],
    },
    // Add more networks as needed
  },
};

export default config;
