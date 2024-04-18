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
export interface Message {
  id?: string;
  type: string;
  payload?: object | null;
}

export interface IState {
  prevPage: number | null;
  isLogin: boolean;
  activePage: number;
}
