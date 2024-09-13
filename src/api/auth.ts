import api, { createInstance } from '../libs/api';
import storage from '../store/storage';
import { Account, User } from '../types/account';

const getUserInfo = async () => {
  const userInfo = storage.getCurrentUser();
  if (userInfo) {
    return userInfo;
  }
  const res = await createInstance(true).get('/api/user/currentUser');
  if (res) {
    return res.data;
  }
  return null;
};

const getSysInfo = async () => {
  const sysInfo = storage.getSysInfo();
  if (sysInfo) {
    return sysInfo;
  }
  const res = await api.get('/api/sys/sysPubKey');
  storage.setSysInfo(res.data.data);
  return res.data.data;
};

const loginOrRegiste = async (param: { address: string; sign: string; data: string }): Promise<User | null> => {
  const res = await createInstance(false).post('/api/user/registe', { ...param });
  if (res) {
    return res.data;
  }
  return null;
};

const updateProfile = async (param: {
  sign: string;
  username: string;
  nickname: string;
  avatar: string;
  mobile: string;
  email: string;
}): Promise<User | null> => {
  const res = await createInstance(true).post('/api/user/update-profile', { ...param });
  if (res) {
    return res.data;
  }
  return null;
};

const loginByKeyword = async (token: string): Promise<Account | null> => {
  const res = await createInstance(false).post('/api/user/loginByKeyword', {
    token,
  });
  if (res) {
    return res.data;
  }
  return null;
};

export default {
  getUserInfo,
  getSysInfo,
  loginOrRegiste,
  updateProfile,
  loginByKeyword,
};
