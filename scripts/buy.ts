import {ethers} from "hardhat";
import {FooBarToken} from "../typechain-types";

const main = async () => {
    const tokenFactory = await ethers.getContractFactory("FooBarToken");
    const tokenContract = tokenFactory.attach("<CONTRACT_ADDRESS>") as unknown;
    const fooBarContract = tokenContract as FooBarToken;

    const transaction = await fooBarContract.buy({
        value: ethers.parseEther("1"),
    });

    await transaction.wait(1);

    console.log("FooBarToken balance: " + await fooBarContract.balanceOf("<ACCOUNT_ADDRESS>") + " FooBars");
}

main();