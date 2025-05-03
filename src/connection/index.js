import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { defineChain } from '@reown/appkit/networks';

const projectId = import.meta.env.VITE_PROJECTID;

export const SUPPORTED_CHAIN = 50002;

export const isSupportedChain = (chainId) =>
  Number(chainId) === SUPPORTED_CHAIN;

const PharosDevnet = defineChain({
  id: 50002,
  caipNetworkId: 'eip155:123456789',
  chainNamespace: 'eip155',
  name: 'Pharos Devnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Pharos',
    symbol: 'PPT',
  },
  rpcUrls: {
    default: {
      http: [import.meta.env.VITE_RPC_URL],
      webSocket: [import.meta.env.VITE_WSS_RPC_URL],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://pharosscan.xyz/' },
  },
  contracts: {
    // Add the contracts here
  }
})

const metadata = {
  name: "My Website",
  description: "usedy",
  url: "http://localhost:5173/",
  icons: ["https://avatars.mywebsite.com/"],
};

createAppKit({
  adapters: [new EthersAdapter()],
  networks: [PharosDevnet],
  chainImages: {
    50002: './pharos.png',
  },
  metadata,
  projectId,
  features: {
    analytics: true,
  },
});