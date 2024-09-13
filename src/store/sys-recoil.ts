import { atom } from 'recoil';

import { Account } from '../types/account';
import storage from './storage';

/**
 * recoil storage 当前登录人
 */
export const CurrentAccount = atom<Account | null>({
  key: 'CurrentAccount',
  default: null,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        if (newValue) {
          const valueStr = JSON.stringify(newValue);
          storage.setAccountInfo(newValue.address ?? '', valueStr);
          storage.set('currentUser', valueStr);
        } else {
          storage.remove('currentUser');
        }
      });
    },
  ],
});

export default {
  CurrentAccount,
};
