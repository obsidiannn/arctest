import { ChakraProvider } from '@chakra-ui/react';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, type, useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { WagmiProvider as WagmiProviderComponent } from 'wagmi';

import { WagmiConfig } from '../libs/wagmi-config';

/**
 * wagmi provider 用于钱包适配
 * @param param0
 * @returns
 */
function Provider({ children }: Readonly<{ children: ReactNode }>) {
  const [mounted, setMounted] = useState(false);
  const queryClient = new QueryClient();

  const appInfo = {
    appName: 'arcTest',
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProviderComponent config={WagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider resetCSS>
          <RainbowKitProvider coolMode appInfo={appInfo}>
            <RecoilRoot>{mounted && children}</RecoilRoot>
          </RainbowKitProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </WagmiProviderComponent>
  );
}

export default Provider;
