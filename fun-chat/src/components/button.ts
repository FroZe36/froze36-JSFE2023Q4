import { ButtonElement } from '../types/interfaces';
import { View } from './view';

export class Button extends View {
  button: HTMLButtonElement;

  constructor({ parentElement, content, classes = [] }: ButtonElement) {
    super({ tagName: 'button', classes, content, parentElement });
    this.button = this.node as HTMLButtonElement;
  }
}
