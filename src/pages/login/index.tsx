import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useAccount, useSignMessage } from 'wagmi';

import auth from '../../api/auth';
import blockletLogo from '../../assets/blocklet.svg';
import { CustomConnectButton } from '../../components/connect-button/custom-connect-button';
import { Footer } from '../../components/footer';
import { computeDataHash } from '../../libs/ethers';
import storage from '../../store/storage';
import { CurrentAccount } from '../../store/sys-recoil';
import { Account, SystemInfo, User } from '../../types/account';

/**
 * 钱包登录 page，支持多账户
 * 移动端 可能没有安装浏览器插件
 * @returns
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const [currentAccount, setCurrentAccount] = useRecoilState(CurrentAccount);
  const [sysInfo, setSysInfo] = useState<SystemInfo | null>(null);
  // 用于 wallet 签名
  const { signMessageAsync } = useSignMessage();

  // 登录流程
  const init = async (
    systemInfo: SystemInfo | null,
    walletAddress: string | null,
    currentAccountBody: Account | null,
  ) => {
    if (!systemInfo) {
      const res = await auth.getSysInfo();
      setSysInfo(res);
    }
    console.log('sysInfo', systemInfo);
    if (currentAccountBody) {
      navigate('/');
      return;
    }
    if (systemInfo && walletAddress) {
      console.log('do login');
      const data = computeDataHash(systemInfo.address);
      if (walletAddress) {
        const accountInfo = storage.getAccountInfo(walletAddress);
        if (accountInfo) {
          const res = await auth.loginOrRegiste({
            sign: accountInfo.sign,
            data: accountInfo.data,
            address: walletAddress ?? '',
          });
          if (res) {
            console.log('jump');
            setCurrentAccount({
              data,
              sign: accountInfo.sign,
              address: accountInfo.address,
              userInfo: { ...res } as User,
            });
            navigate('/');
          }
          return;
        }
        const sign = await signMessageAsync({
          account: walletAddress as `0x${string}`,
          message: data,
        });
        const res = await auth.loginOrRegiste({
          sign: sign,
          data: data,
          address: walletAddress ?? '',
        });
        if (res) {
          console.log('jump');
          setCurrentAccount({
            data,
            sign,
            address: walletAddress,
            userInfo: { ...res } as User,
          });
          navigate('/');
        }
      }
    }
  };

  useEffect(() => {
    init(sysInfo, address ?? null, currentAccount);
  }, [address, sysInfo, currentAccount]);

  return (
    <Flex flex={1} minHeight="100vh" className="flex flex-col items-center justify-center ">
      <Box as="main" p={4} className="">
        <div className="flex items-center flex-row justify-center mb-4 ">
          <a href="https://www.arcblock.io/docs/blocklet-developer/getting-started" target="_blank" rel="noreferrer">
            <img src={blockletLogo} className="logo blocklet " alt="Blocklet logo" />
          </a>
        </div>
        <Heading as="h2" fontSize="2rem" mb={10} className="text-center [text-shadow:_0_4px_0_var(--tw-ring-color)]">
          Do Login
        </Heading>
        <div className="flex flex-col mt-12 items-center">
          {/* {!currentAccount ? <ConnectButton label='wallet connect' /> : null} */}
          {!currentAccount ? <CustomConnectButton /> : null}
          <Button
            type="button"
            className="m-5 rounded-xl"
            onClick={() => {
              // 登录后导出密钥（此密钥是一种签名） 用来进行非钱包登录
              navigate('/keywordLogin');
            }}>
            keyword login
          </Button>
        </div>
      </Box>
      <Footer />
    </Flex>
  );
};

export default LoginPage;
