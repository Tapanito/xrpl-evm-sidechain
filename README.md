# ETHDublin Workshop


This project uses hardhat to deploy and interact with EVM Sidechain smart contracts.

## Useful links
- Metamask (metmask.io)
- EvM Sidechain Explorer (https://evm-sidechain.xrpl.org/)
- XRP Ledger Faucets (https://xrpl.org/resources/dev-tools/xrp-faucets/)
- EVM Sidechain Documentation: (https://opensource.ripple.com/docs/evm-sidechain/intro-to-evm-sidechain/)
- Peersyst Documentation: (https://docs.peersyst.com/evm-sidechain-bridge)
- xchain-sdk Documentation: (https://docs.peersyst.com/xchain-sdk/contents/xchain)

## Setup

In the `hardhat.config.ts` file enter your `Metamask` private key. Note, this is for tutorial purposes ONLY.


## Hacks

- Remove `"ethers": "^5.7",` dependency from the `package.json` when interacting with smart contracts.
