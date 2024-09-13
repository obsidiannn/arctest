import { createWalletClient, custom, parseUnits as viemParseUnits } from 'viem';
import { sepolia } from 'viem/chains';

export const parseUnits = (ether: string, unit: number = 18) => viemParseUnits(ether, unit);

export const getEllipsisWords = (str: `0x${string}`, n: number = 6): string => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return '';
};

export const getTransport = (chainId: number, transports: any) => {
  const transport = transports[chainId];
  if (!transport) throw new Error(`无法找到链ID为 ${chainId} 的传输方式`);
  return transport;
};

export const walletClient4Sepolia =
  typeof window !== 'undefined'
    ? window.ethereum
      ? createWalletClient({
          chain: sepolia,
          transport: custom(window.ethereum),
        })
      : null
    : null;
