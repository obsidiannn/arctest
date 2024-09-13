export namespace IModel {
  export namespace Event {
    // 声明事件的 type 枚举
    export enum EventTypeEnum {
      TOAST = 1,
    }

    // 声明 event的 base struct
    export interface IEvent {
      type: EventTypeEnum;
    }

    export interface EventToast extends IEvent {
      title: string;
      status: 'success' | 'error';
      duration?: number;
    }
  }
}
