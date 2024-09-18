import { Button } from '@chakra-ui/react';
import { AuthenticationStatus, ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';

import ConfirmDialog from '../dialog/alert-dialog';

// 自定义 rainbow 登录按钮
export const CustomConnectButton = (props: { onReady?: (account: string) => void }) => {
  const [visible, setVisible] = useState(false);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

        console.log('authenticationStatus is ', account);
        if (account && props.onReady) {
          props.onReady(account.address);
        }
        const doConfirm = () => {
          setVisible(true);
        };
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}>
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={doConfirm} type="button" className="bg-blue-600">
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} type="button">
                    Wrong network
                  </Button>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <Button onClick={openChainModal} style={{ display: 'flex', alignItems: 'center' }} type="button">
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}>
                        {chain.iconUrl && (
                          <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} style={{ width: 12, height: 12 }} />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>
                  <Button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ''}
                  </Button>
                </div>
              );
            })()}
            <ConfirmDialog
              visible={visible}
              title="确认登录？"
              describe="登录需要您的钱包进行签名验证"
              onClose={(v) => {
                setVisible(false);
                if (v) {
                  openConnectModal();
                }
              }}
            />
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
