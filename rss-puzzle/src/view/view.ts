import { ElementParam } from '../types/interface';
import { BaseElement } from '../utils/createElement';

export class View {
  elementCreator: BaseElement;

  constructor(params: ElementParam) {
    this.elementCreator = this.createView(params);
  }

  getHtmlElement() {
    return this.elementCreator.getElement();
  }

  createView(params: ElementParam) {
    const elementCreator = new BaseElement(params);
    return elementCreator;
  }
}
