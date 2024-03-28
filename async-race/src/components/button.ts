import { ButtonElement } from '../types/interface';
import { View } from './view';

export class Button extends View {
  button;

  constructor({ parentElement, content, classes = [] }: ButtonElement) {
    super({ tagName: 'button', classes, content, parentElement });
    this.button = this.node as HTMLButtonElement;
  }
}
