import {ethers} from "hardhat";

const main = async () => {
    const tokenName = "FooBarToken";
    const tokenFactory = await ethers.getContractFactory(tokenName);

    console.log("Deploying " + tokenName);    
    const token = await tokenFactory.deploy();
    
    const tokenAddress = await token.getAddress();
    console.log(tokenName + " address: ", tokenAddress);
}

main();