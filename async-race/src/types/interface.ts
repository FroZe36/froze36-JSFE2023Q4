export interface ViewElement {
  tagName?: string;
  classes?: string[];
  content?: string;
  parentElement?: HTMLElement;
}
export interface InputElement {
  tagName: string;
  classes: string[];
  content: string;
  parentElement: HTMLElement;
  type: string;
}
export interface ButtonElement {
  parentElement: HTMLElement;
  content: string;
  classes?: string[];
}
