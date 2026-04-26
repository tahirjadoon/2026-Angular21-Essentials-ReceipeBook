export enum ToastMessageType {
  Success = 'successtc',
  Error = 'errortc',
  Warning = 'warningtc',
  Info = 'infotc'
}

export interface ToastMessage {
  id: number;
  type: ToastMessageType;
  text: string;
}