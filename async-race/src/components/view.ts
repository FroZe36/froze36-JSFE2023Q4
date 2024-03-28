import { ViewElement } from '../types/interface';

export class View {
  parentNode;

  node: HTMLElement;

  constructor({ tagName = 'div', classes = [], content = '', parentElement }: ViewElement) {
    const element: HTMLElement = document.createElement(tagName);
    element.classList.add(...classes);
    element.textContent = content;
    if (parentElement) this.parentNode = parentElement;
    this.node = element;
  }
}
