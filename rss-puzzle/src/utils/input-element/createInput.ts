import { ElementParam } from '../../types/interface';
import { BaseElement } from '../createElement';
import './input.css';

export class InputCreator extends BaseElement {
  inputElement: HTMLInputElement | null;

  labelElement: HTMLLabelElement | null;

  constructor(param: ElementParam) {
    super(param);
    this.inputElement = null;
    this.labelElement = null;
  }

  createElement(param: ElementParam) {
    this.element = document.createElement(param.tagName);
    this.element.classList.add('input-wrapper', ...param.classNames);
    this.inputElement = document.createElement('input');
    this.inputElement.required = true;
    this.labelElement = document.createElement('label');
    this.setTextContent(param.text);
    if (param.callback) this.setCallback(param.callback);
    this.element.append(this.labelElement, this.inputElement);
  }

  setValue(value: string) {
    if (this.inputElement) this.inputElement.value = value;
  }

  setTextContent(text = '') {
    if (this.labelElement) this.labelElement.textContent = text;
  }

  setCallback(callback: (e: null | Event) => void) {
    if (typeof callback === 'function' && this.element) {
      this.element.addEventListener('change', (event) => callback(event));
    }
  }
}
