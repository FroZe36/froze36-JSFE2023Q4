import { BaseElement } from '../../utils/createElement';
import { View } from '../view';

export class StartView extends View {
  buttonStart;

  constructor() {
    super({
      tagName: 'div',
      classNames: ['start'],
    });
    this.buttonStart = new BaseElement({
      tagName: 'button',
      classNames: ['button-start'],
    });
    this.configureView();
  }

  configureView() {}
}
