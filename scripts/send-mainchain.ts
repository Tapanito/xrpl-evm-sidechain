import {
    Bridge,
    BridgeManager,
    BridgeDirection,
    XrplBridgeDoor,
    XrplXChainProvider,
    EthersXChainProvider, EthersBridgeDoor, XrplXChainWallet, EthersXChainSigner, EthersXChainWallet, XrplXChainSigner
} from "xchain-sdk";
import {Client, Wallet, dropsToXrp} from "xrpl";
import { providers, Wallet as EthersWallet, utils as etherUtils } from "ethers";

const MAINCHAIN_NODE_URL = "wss://s.devnet.rippletest.net:51233";
const SIDECHAIN_NODE_URL = "https://rpc-evm-sidechain.xrpl.org";

const MAINCHAIN_PROVIDER = new XrplXChainProvider(new Client(MAINCHAIN_NODE_URL));
const SIDECHAIN_PROVIDER = new EthersXChainProvider(new providers.JsonRpcProvider(SIDECHAIN_NODE_URL));

// Known Door Account on XRP Ledger
const MAINCHAIN_DOOR = new XrplBridgeDoor(MAINCHAIN_PROVIDER, "rnJnBjnpTZPmUyZsW2QSenZhEwPzEuRSxz", "XRPL Devnet");

// Known Door Account on the EvM Sidechain
const SIDECHAIN_DOOR = new EthersBridgeDoor(
    SIDECHAIN_PROVIDER,
    "0xB5f762798A53d543a014CAf8b297CFF8F2F937e8",
    "EVM Sidechain Devnet",
);

async function main() {
    console.clear();

    const bridgeManager = await BridgeManager.createAsync(MAINCHAIN_DOOR, SIDECHAIN_DOOR);

    const xChainBridges = await bridgeManager.getXChainBridges();


    const originSigner = new XrplXChainSigner(Wallet.fromSeed("<XRP_SEED>"), MAINCHAIN_PROVIDER);
    const originWallet = new XrplXChainWallet(originSigner);
        
    const destinationSigner = new EthersXChainSigner(new EthersWallet("<EVM_PRIVATE_KEY>", new providers.JsonRpcProvider(SIDECHAIN_NODE_URL)));
    const destinationWallet = new EthersXChainWallet(SIDECHAIN_PROVIDER, destinationSigner);

    console.log("--- Before Transfer ---");
    
    console.log("-XRPL-: Address: " + await originWallet.getAddress());
    console.log("-XRPL-: Balance: " + dropsToXrp(await originWallet.getBalance()) + "\n");
    
    console.log("-Sidechain-: Address: " + await destinationWallet.getAddress());
    console.log("-Sidechain-: Balance: " + etherUtils.formatEther(await destinationWallet.getBalance()) + "\n");
    
    const bridge = new Bridge(BridgeDirection.LOCKING_TO_ISSUING, xChainBridges[0]!);

    try {
        const amount = "10";
        console.log("Transfering " + amount + " XRP" + " from: " + bridge.origin + " to: " + bridge.destination + " chain");
        await bridgeManager.transfer(bridge, originWallet, destinationWallet, amount);
        console.log("XChain transaction success\n");
    } catch (_e) {
        // Handled by the "failed" listener
        console.log(_e);
        process.exit(1);
    }

    console.log("--- After Transfer ---");
    
    console.log("-XRPL-: Address: " + await originWallet.getAddress());
    console.log("-XRPL-: Balance: " + dropsToXrp(await originWallet.getBalance()) + "\n");
    
    console.log("-Sidechain-: Address: " + await destinationWallet.getAddress());
    console.log("-Sidechain-: Balance: " + etherUtils.formatEther(await destinationWallet.getBalance()) + "\n");
        
    process.exit(0);
}

main();
