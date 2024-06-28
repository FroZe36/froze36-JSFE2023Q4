import { InputElement } from '../types/interface';

export class Input {
  node: HTMLInputElement;

  parentNode: HTMLElement;

  constructor({ parentElement, tagName = 'input', type = 'text', classes = [], content = '' }: InputElement) {
    const element = document.createElement(tagName) as HTMLInputElement;
    element.type = type;
    element.classList.add(...classes);
    element.innerHTML = content;
    this.parentNode = parentElement;
    this.node = element;
  }
}
