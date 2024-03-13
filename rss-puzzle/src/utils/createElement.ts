import { ElementParam } from '../types/interface';

export class BaseElement {
  element: HTMLElement | null;

  constructor(param: ElementParam) {
    this.element = null;
    this.createElement(param);
  }

  addInnerElement(element: HTMLElement | BaseElement) {
    if (element instanceof Node && this.element) {
      if (element instanceof BaseElement) {
        const el = element.getElement();
        if (el instanceof Node) this.element.append(el);
      } else {
        this.element.append(element);
      }
    }
  }

  getElement() {
    return this.element;
  }

  createElement(param: ElementParam) {
    this.element = document.createElement(param.tagName);
    this.setCssClasses(param.classNames);
    if (param.text) this.setTextContent(param.text);
    if (param.callback) this.setCallback(param.callback);
  }

  setCssClasses(cssClasses: string[]) {
    if (this.element) this.element.classList.add(...cssClasses);
  }

  setTextContent(text: string) {
    if (this.element) this.element.textContent = text;
  }

  setCallback(callback: (e: null | MouseEvent | Event) => void) {
    if (typeof callback === 'function' && this.element) {
      this.element.addEventListener('click', (event) => callback(event));
    }
  }
}
