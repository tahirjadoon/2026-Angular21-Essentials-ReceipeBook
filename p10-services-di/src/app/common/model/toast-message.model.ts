export enum TOAST_MESSAGE_TYPE {
  Success = 'successtc',
  Error = 'errortc',
  Warning = 'warningtc',
  Info = 'infotc'
}

export interface ToastMessage {
  id: number;
  type: TOAST_MESSAGE_TYPE;
  text: string;
}