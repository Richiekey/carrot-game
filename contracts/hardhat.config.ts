import '@nomicfoundation/hardhat-toolbox'
import '@typechain/hardhat'
import { HardhatUserConfig } from 'hardhat/config'

const config: HardhatUserConfig = {
  // support both 0.8.26 (or whatever CarrotGame.sol uses) and 0.8.28 for Lock.sol
  solidity: {
    compilers: [
      { version: '0.8.26' },
      { version: '0.8.28' },
    ],
  },
  typechain: {
    outDir: '../web/src/types',
    target: 'ethers-v6',
    alwaysGenerateOverloads: false,
  },
  // …any other settings you had…
}

export default config

