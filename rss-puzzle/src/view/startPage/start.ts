import { BaseElement } from '../../utils/createElement';
import { View } from '../view';
import './start.css';

export class StartView extends View {
  buttonStart;

  content;

  contentTitle;

  constructor() {
    super({
      tagName: 'div',
      classNames: ['start'],
    });
    this.buttonStart = new BaseElement({
      tagName: 'button',
      classNames: ['start__button'],
      text: 'Start Game',
    });
    this.content = new BaseElement({
      tagName: 'p',
      classNames: ['start__content', 'montserrat-500'],
      text: 'Click on words, collect phrases. Words can be drag and drop. Select tooltips in the menu.',
    });
    this.contentTitle = new BaseElement({
      tagName: 'h1',
      classNames: ['start__content-title', 'montserrat-900'],
      text: 'ENGLISH PUZZLE GAME',
    });
    this.configureView();
  }

  configureView() {
    const btnStart = this.buttonStart.getElement();
    const title = this.contentTitle.getElement();
    const content = this.content.getElement();
    if (btnStart && title && content) {
      this.elementCreator.addInnerElement(title);
      this.elementCreator.addInnerElement(content);
      // this.elementCreator.addInnerElement(btnStart);
    }
  }
}
