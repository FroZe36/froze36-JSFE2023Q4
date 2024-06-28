import { User } from '../../types/interface';
import { BaseElement } from '../../utils/createElement';
import { View } from '../view';
import './start.css';

export class StartView extends View {
  buttonStart;

  content;

  contentTitle;

  contentGreeting;

  onGameStart: () => void;

  constructor(_onGameStart: () => void) {
    super({
      tagName: 'div',
      classNames: ['start'],
    });
    this.buttonStart = new BaseElement({
      tagName: 'button',
      classNames: ['start__button', 'montserrat-700'],
      text: 'Start Game',
      callback: () => this.handlerBtnStart(),
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
    this.contentGreeting = new BaseElement({
      tagName: 'p',
      classNames: ['start__content', 'start__content_greeting', 'montserrat-500'],
    });
    this.onGameStart = _onGameStart;
    this.configureView();
  }

  configureView() {
    const btnStart = this.buttonStart.getElement();
    const title = this.contentTitle.getElement();
    const content = this.content.getElement();
    const contentGreeting = this.contentGreeting.getElement();
    const localStorageUser: User = JSON.parse(localStorage.getItem('login')!);
    if (btnStart && title && content && contentGreeting) {
      this.elementCreator.addInnerElement(title);
      this.elementCreator.addInnerElement(content);
      contentGreeting.innerHTML = `<span class="span-text">Hello, ${localStorageUser.name} ${localStorageUser.surname} !</span> Are you ready to challenge your brain with a puzzle marathon? 🧩✨ Let's train your logic, piece together vibrant images, and dive into the world of mysteries! Let's go!`;
      this.elementCreator.addInnerElement(contentGreeting);
      this.elementCreator.addInnerElement(btnStart);
    }
  }

  handlerBtnStart() {
    this.elementCreator.getElement()?.parentElement?.setAttribute('game', '');
    this.onGameStart();
  }
}
