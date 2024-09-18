import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useAccount, useCall } from 'wagmi';

import auth from '../api/auth';
import storage from '../store/storage';
import { CurrentAccount } from '../store/sys-recoil';
import { Account, User } from '../types/account';

const RequireAuth = ({ children }: { children: any }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentAccount, setCurrentAccount] = useRecoilState<Account | null>(CurrentAccount);
  const { address } = useAccount();

  /**
   * 实际上不需要这里
   */
  const checkAuthedPath = useCallback(() => {
    if (location.pathname === '/login' || location.pathname === '/keywordLogin') {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  const jumpToLogin = useCallback(() => {
    setCurrentAccount(null);
    navigate('/login');
  }, [setCurrentAccount, navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      console.log('checkAuth: ', address, currentAccount);

      if (!address) {
        if (currentAccount && currentAccount.loginMode === 'token') {
          const current = storage.getCurrentUser();
          if (current) {
            return;
          }
        }
        jumpToLogin();
        return;
      }

      if (currentAccount && address === currentAccount.address) {
        checkAuthedPath();
        return;
      }

      // 如果发生账号变更的逻辑
      if (!currentAccount || address !== currentAccount.address) {
        console.log('change address', address);

        const accountInfo = storage.getAccountInfo(address);
        if (accountInfo) {
          const res = await auth.getUserInfo();
          if (res) {
            setCurrentAccount({
              loginMode: 'wallet',
              data: accountInfo.data,
              sign: accountInfo.sign,
              address: address,
              userInfo: res.userInfo as User,
            });
            checkAuthedPath();
            return;
          }
        }
        jumpToLogin();
        return;
      }
    };
    checkAuth();
  }, [address, currentAccount?.address, checkAuthedPath, jumpToLogin, currentAccount, setCurrentAccount]);

  return children;
};

export default RequireAuth;
