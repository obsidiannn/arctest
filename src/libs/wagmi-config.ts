import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import type { Transport } from 'viem';
import { createConfig, http } from 'wagmi';
import {
  arbitrum,
  arbitrumGoerli,
  base,
  baseGoerli,
  bsc,
  bscTestnet,
  linea,
  lineaTestnet,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  sepolia,
  zkSync,
  zkSyncSepoliaTestnet,
} from 'wagmi/chains';

const ProjectId = '8e58998f8ac136e7906dd57d856930ea';

if (!ProjectId) {
  throw new Error('WalletConnect project ID is not defined. Please check your environment variables.');
}

const Connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet],
    },
  ],
  { appName: 'arcTest', projectId: ProjectId },
);
// Fix missing icons
const customZkSyncSepoliaTestnet = { ...zkSyncSepoliaTestnet, iconUrl: '/assets/chains/zksync.svg' };
const customLinea = { ...linea, iconUrl: '/assets/chains/linea.svg' };
const customLineaTestnet = { ...lineaTestnet, iconUrl: '/assets/chains/linea.svg' };

export const Transports: Record<number, Transport> = {
  [mainnet.id]: http(),
  [sepolia.id]: http(),
  [polygon.id]: http(),
  [polygonMumbai.id]: http(),
  [optimism.id]: http(),
  [optimismGoerli.id]: http(),
  [arbitrum.id]: http(),
  [arbitrumGoerli.id]: http(),
  [zkSync.id]: http(),
  [zkSyncSepoliaTestnet.id]: http(),
  [linea.id]: http(),
  [lineaTestnet.id]: http(),
  [base.id]: http(),
  [baseGoerli.id]: http(),
  [bsc.id]: http(),
  [bscTestnet.id]: http(),
};

export const WagmiConfig = createConfig({
  chains: [
    mainnet,
    sepolia,
    polygon,
    polygonMumbai,
    optimism,
    optimismGoerli,
    arbitrum,
    arbitrumGoerli,
    customLinea,
    customLineaTestnet,
    zkSync,
    customZkSyncSepoliaTestnet,
    base,
    baseGoerli,
    bsc,
    bscTestnet,
  ],
  connectors: Connectors,
  transports: Transports,
  ssr: true,
});
