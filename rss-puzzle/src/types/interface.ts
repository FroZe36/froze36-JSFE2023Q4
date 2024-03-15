export interface ElementParam {
  tagName: keyof HTMLElementTagNameMap;
  classNames: string[];
  text?: string;
  callback?: (e: null | MouseEvent | KeyboardEvent | Event) => void;
}

export interface User {
  name: string;
  surname: string;
}
