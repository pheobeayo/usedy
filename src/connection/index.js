import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";

// 1. Get projectId
const projectId = import.meta.env.VITE_PROJECTID;

// 2. Define Pharos Network
const pharosNetwork = {
  id: 50002,
  name: "Pharos Devnet",
  rpcUrls: {
    default: {
      http: ["https://devnet.dplabs-internal.com"],
      webSocket: ["wss://devnet.dplabs-internal.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Pharos Explorer",
      url: "https://pharosscan.xyz/",
    },
  },
  nativeCurrency: {
    name: "Pharos Devnet Token",
    symbol: "PTT",
    decimals: 18,
  },
};

// 3. Create a metadata object - optional
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create a AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks: [pharosNetwork],
  metadata,
  projectId,
  features: {
    analytics: true,
  },
  themeVariables: {
    '--w3m-accent': '#427142',
    '--w3m-color-mix-strength': '40',
    '--w3m-border-radius-master': '10'
  },
});

export { pharosNetwork };
