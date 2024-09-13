import { IModel } from '../types/system';

class EventManager {
  private events: { [key: string]: any };

  constructor() {
    this.events = {};
  }

  addEventListener(event: string, listener: Function) {
    console.log('[event] add listener', event);

    if (typeof this.events[event] !== 'object') {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return listener;
  }

  addEventSingleListener(event: string, listener: Function) {
    console.log('[event] add single listener', event);

    if (typeof this.events[event] !== 'object') {
      this.events[event] = [];
    }
    this.events[event] = [listener];
    return listener;
  }

  removeListener(event: string, listener: Function) {
    console.log('[event] remove listener', event);
    if (typeof this.events[event] === 'object') {
      const idx = this.events[event].indexOf(listener);
      if (idx > -1) {
        this.events[event].splice(idx, 1);
      }
      if (this.events[event].length === 0) {
        delete this.events[event];
      }
    }
  }

  generateKey(type: number, key?: string): string {
    if (type === IModel.Event.EventTypeEnum.TOAST) {
      return 'event_toast_key';
    }
    return key ?? 'unknown';
  }

  /**
   *
   */
  emit(event: string, ...args: IModel.Event.IEvent[]) {
    if (typeof this.events[event] === 'object') {
      this.events[event].forEach((listener: Function) => {
        try {
          listener.apply(this, args);
        } catch (e) {
          console.error('[event error]', e);
        }
      });
    }
  }
}

const eventManager = new EventManager();
export default eventManager;
