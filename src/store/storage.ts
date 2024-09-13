import { Account } from '../types/account';

const set = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const get = (key: string) => {
  const val = localStorage.getItem(key);
  if (val && val !== 'undefined') {
    return val;
  }
  return null;
};

// 系统公钥 storage
const setSysInfo = (val: any) => {
  set('sysInfo', JSON.stringify(val));
};

const getSysInfo = () => {
  const val = get('sysInfo');
  if (!val) {
    return null;
  }
  return JSON.parse(val) as {
    pubKey: string;
    address: string;
  };
};

// 当前登录人
const getCurrentUser = (): Account | null => {
  const val = get('currentUser');
  if (val) {
    return JSON.parse(val) as Account;
  }
  return null;
};

/**
 * 用于切换账户后的免钱包签名
 * @param address
 * @param val
 */
const setAccountInfo = (address: string, val: string) => {
  set(`accountInfo_${address}`, val);
};

const getAccountInfo = (address: string): Account | null => {
  const val = get(`accountInfo_${address}`);
  if (val) {
    return JSON.parse(val) as Account;
  }
  return null;
};

const remove = (key: string) => {
  localStorage.removeItem(key);
};

const clear = () => {
  localStorage.clear();
};

export default {
  set,
  get,
  getSysInfo,
  setSysInfo,
  remove,
  setAccountInfo,
  getAccountInfo,
  getCurrentUser,
  clear,
};
