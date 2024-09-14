import { Box, Button, Flex, Heading, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import auth from '../../api/auth';
import blockletLogo from '../../assets/blocklet.svg';
import { Footer } from '../../components/footer';
import { CurrentAccount } from '../../store/sys-recoil';
import { Account } from '../../types/account';

/**
 * 密钥登录
 * @returns
 */
const KeywordLogin = () => {
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const setCurrentAccount = useSetRecoilState(CurrentAccount);

  const toast = useToast();

  const keywordLogin = () => {
    if (token && token.length > 0) {
      auth.loginByKeyword(token).then((res) => {
        if (res) {
          console.log('login by token', res);
          setCurrentAccount({
            ...(res as Account),
            loginMode: 'token',
          });
          navigate('/');
        } else {
          toast({ title: 'error token', status: 'error' });
        }
      });
    }
  };
  return (
    <Flex flex={1} minHeight="100vh" className="flex flex-col items-center justify-center ">
      <Box as="main" p={4} minWidth={300}>
        <div className="flex items-center flex-row justify-center mb-4 ">
          <a href="https://www.arcblock.io/docs/blocklet-developer/getting-started" target="_blank" rel="noreferrer">
            <img src={blockletLogo} className="logo blocklet " alt="Blocklet logo" />
          </a>
        </div>
        <Heading as="h2" fontSize="2rem" mb={10} className="text-center [text-shadow:_0_4px_0_var(--tw-ring-color)]">
          Keyword Login
        </Heading>
        <div className="flex flex-col ">
          <textarea
            rows={3}
            cols={3}
            value={token ?? ''}
            className="w-full bg-gray-200 mt-4 rounded-xl p-2 "
            placeholder="You can use the wallet interaction token to log in"
            onChange={(e) => {
              setToken(e.target.value);
            }}
          />
          <Button className="bg-slate-500 text-white mt-4 self-center" onClick={keywordLogin}>
            Do login
          </Button>
        </div>
      </Box>
      <Footer />
    </Flex>
  );
};

export default KeywordLogin;
