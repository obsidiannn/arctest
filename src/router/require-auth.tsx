import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useAccount } from 'wagmi';

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
  const checkAuthedPath = () => {
    if (location.pathname === '/login' || location.pathname === '/keywordLogin') {
      navigate('/');
    }
  };
  /**
   *  权限及登录校验
   */
  const checkAuth = async (accountAddress: string | null, currentAccountVal: Account | null) => {
    // 通过 token 登录的情况
    if (!accountAddress && currentAccountVal) {
      if (storage.getCurrentUser()) {
        return;
      }
    }

    if (!accountAddress) {
      setCurrentAccount(null);
      navigate('/login');
      return;
    }

    if (currentAccountVal && accountAddress === currentAccountVal.address) {
      checkAuthedPath();
      return;
    }

    // 如果发生账号变更的逻辑
    if (!currentAccountVal || accountAddress !== currentAccountVal.address) {
      const accountInfo = storage.getAccountInfo(accountAddress);
      if (accountInfo) {
        const res = await auth.getUserInfo();
        if (res) {
          setCurrentAccount({
            data: accountInfo.data,
            sign: accountInfo.sign,
            address: accountAddress,
            userInfo: res.userInfo as User,
          });
          checkAuthedPath();
          return;
        }
      }
      setCurrentAccount(null);
      navigate('/login');
      return;
    }
  };

  useEffect(() => {
    checkAuth(address ?? null, currentAccount);
  }, [address, currentAccount]);

  return children;
};

export default RequireAuth;
