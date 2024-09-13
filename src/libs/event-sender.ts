import { IModel } from '../types/system';
import EventManager from './event-manager';

const sendToast = (param: IModel.Event.EventToast) => {
  const key = EventManager.generateKey(param.type);
  EventManager.emit(key, param);
};

export default {
  sendToast,
};
