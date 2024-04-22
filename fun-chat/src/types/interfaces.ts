import { SocketSendTypes } from './types';

export interface ViewElement {
  tagName?: string;
  classes?: string[];
  content?: string;
  parentElement?: HTMLElement;
}
export interface InputElement {
  tagName?: string;
  classes: string[];
  content?: string;
  parentElement: HTMLElement;
  type?: string;
}
export interface ButtonElement {
  parentElement?: HTMLElement;
  content: string;
  classes?: string[];
}
export interface SocketSendMessage<T> {
  id?: string;
  type: SocketSendTypes;
  payload?: T | null;
}

export interface SessionStorageUser {
  id: string;
  isLogined?: boolean;
  login: string;
  password?: string;
}

export interface ResponseUserAuth {
  id: string;
  type: 'USER_LOGIN';
  payload: {
    user: {
      login: string;
      isLogined: boolean;
    };
  };
}

export interface ResponseAllUsers {
  id: string;
  type: 'USER_ACTIVE' | 'USER_INACTIVE';
  payload: {
    users: { login: string; isLogined: boolean }[] | [];
  };
}

export interface ResponseThirdPartyUser {
  id: null;
  type: 'USER_EXTERNAL_LOGIN' | 'USER_EXTERNAL_LOGOUT';
  payload: {
    user: {
      login: string;
      isLogined: boolean;
    };
  };
}

export interface ResponseMsgSend {
  id: string;
  type: 'MSG_SEND';
  payload: {
    message: {
      id: string;
      from: string;
      to: string;
      text: string;
      datetime: number;
      status: {
        isDelivered: boolean;
        isReaded: boolean;
        isEdited: boolean;
      };
    };
  };
}

export interface ResponseError {
  id: string;
  type: 'ERROR';
  payload: {
    error: string;
  };
}

export interface IState {
  prevPage: number | null;
  isLogin: boolean;
  id: null | string;
  activePage: number;
}
