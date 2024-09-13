import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import WagmiProvider from './providers/wagmi-provider';
import routerConfig from './router';

const router = createBrowserRouter(routerConfig);
export default function WrappedApp() {
  return (
    <WagmiProvider>
      <RouterProvider router={router} />
    </WagmiProvider>
  );
}
