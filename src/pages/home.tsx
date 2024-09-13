import { Button, Flex, Heading, Text, useToast } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useAccount } from 'wagmi';

import blockletLogo from '../assets/blocklet.svg';
import UploadAvatar from '../components/avatar-upload';
import aes from '../libs/aes';
import { generatePrivateKey } from '../libs/ethers';
import storage from '../store/storage';
import { CurrentAccount } from '../store/sys-recoil';

/**
 * 主登录后跳转页面
 * @returns
 */
function Home() {
  const currentAccount = useRecoilValue(CurrentAccount);
  const toast = useToast();

  const account = useAccount();

  const userName = useMemo(() => {
    if (currentAccount) {
      const userInfo = currentAccount.userInfo;
      if (currentAccount.userInfo) {
        return userInfo.nickname ?? userInfo.username;
      }
      return currentAccount.address;
    }
    return '';
  }, [currentAccount]);

  const computLoginToken = () => {
    const sysData = storage.getSysInfo();
    if (!currentAccount || !sysData) {
      toast({
        title: 'data error',
        status: 'error',
        duration: 5000,
      });
      return;
    }

    const tempWallet = new ethers.Wallet(generatePrivateKey());
    const sharedSecret = tempWallet.signingKey.computeSharedSecret(sysData.pubKey);
    const data = {
      data: currentAccount.data,
      sign: currentAccount.sign,
    };
    const result = aes.En(JSON.stringify(data), sharedSecret);
    const value = `${result}_${tempWallet.signingKey.publicKey}`;
    navigator.clipboard.writeText(value).then(() => {
      toast({
        title: '已复制到剪贴板',
        status: 'success',
        duration: 2000,
      });
    });
  };

  return (
    <>
      <div className="flex flex-row justify-center items-center ">
        <a href="https://www.arcblock.io/docs/blocklet-developer/getting-started" target="_blank" rel="noreferrer">
          <img src={blockletLogo} className="logo blocklet" alt="Blocklet logo" />
        </a>
      </div>
      <Heading
        as="h2"
        fontSize="2rem"
        mb={10}
        className="text-center [text-shadow:_0_4px_0_var(--tw-ring-color)] mt-5 mb-5">
        Vite + React + Blocklet
      </Heading>
      <Flex className="flex-col  gap-4 w-4/5 m-auto  ">
        <Text className="text-center mb-5 text-wrap">欢迎你: {userName}</Text>
        <div className="self-center">
          <UploadAvatar url={currentAccount?.userInfo.avatar ?? ''} enableUpload={false} onChoosed={() => {}} />
        </div>
        {currentAccount && account?.address ? (
          <Button className="mt-5 mb-5 md:w-48 self-center" onClick={computLoginToken}>
            获取登录token
          </Button>
        ) : null}
      </Flex>
    </>
  );
}

export default Home;
