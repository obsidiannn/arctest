import { createAxios } from '@blocklet/js-sdk';

import storage from '../store/storage';
import { IModel } from '../types/system';
import eventSender from './event-sender';

const api = createAxios({
  baseURL: window?.blocklet?.prefix || '/',
});

export const createInstance = (auth = true) => {
  const instance = createAxios({
    baseURL: window?.blocklet?.prefix || '/',
    withCredentials: false,
    timeout: 3000,
  });

  instance.interceptors.request.use(
    (config) => {
      if (auth) {
        const user = storage.getCurrentUser();
        if (!user) {
          throw new Error('not login');
        }
        config.headers.set('data', user.data);
        config.headers.set('sign', user.sign);
        config.headers.set('address', user.address);
      }
      return config;
    },
    (err) => {
      throw new Error(err.message);
    },
  );
  instance.interceptors.response.use(
    (rep) => {
      return rep.data;
    },
    (err) => {
      eventSender.sendToast({
        type: IModel.Event.EventTypeEnum.TOAST,
        title: err.response?.data?.msg ?? 'systemerror',
        status: 'error',
      });
      if (err.status === 401 || err.status === 403) {
        if (auth) {
          window.location.href = '/login';
        }
      }
      throw new Error(err.message);
    },
  );
  return instance;
};

export default api;
