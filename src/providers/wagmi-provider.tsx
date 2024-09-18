import { ChakraProvider, useToast } from '@chakra-ui/react';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { WagmiProvider as WagmiProviderComponent } from 'wagmi';

import EventManager from '../libs/event-manager';
import { WagmiConfig } from '../libs/wagmi-config';
import { IModel } from '../types/system';

/**
 * wagmi provider 用于钱包适配
 * @param param0
 * @returns
 */
function Provider({ children }: Readonly<{ children: ReactNode }>) {
  const [mounted, setMounted] = useState(false);
  const queryClient = new QueryClient();
  const toast = useToast();
  const appInfo = {
    appName: 'arcTest',
  };

  useEffect(() => {
    setMounted(true);
    const key = EventManager.generateKey(IModel.Event.EventTypeEnum.TOAST);
    EventManager.addEventSingleListener(key, (value: IModel.Event.EventToast) => {
      console.log('get Event', value);
      toast(value);
    });
  }, [toast]);

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
