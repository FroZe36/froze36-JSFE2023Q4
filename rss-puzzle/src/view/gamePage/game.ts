import { View } from '../view';
import './game.css';
import wordCollectionLevel1 from '../../rss-puzzle-data/data/wordCollectionLevel1.json';
import { WordCollection } from '../../types/interface';
import { BaseElement } from '../../utils/createElement';

export class GameView extends View {
  playGround: HTMLElement[];

  wordResult: HTMLElement[];

  word: string[];

  wrapperHeader;

  wrapperGame;

  collection: WordCollection[];

  containerWithShuffleSentence;

  containerForPlayGround;

  constructor() {
    super({
      tagName: 'div',
      classNames: ['game', 'container'],
    });
    this.collection = [wordCollectionLevel1];
    this.wrapperHeader = new BaseElement({
      tagName: 'div',
      classNames: ['game-header'],
    });
    this.wrapperGame = new BaseElement({
      tagName: 'div',
      classNames: ['game-wrapper'],
    });
    this.containerWithShuffleSentence = new BaseElement({
      tagName: 'div',
      classNames: ['game__shuffle-sentence'],
    });
    this.containerForPlayGround = new BaseElement({
      tagName: 'div',
      classNames: ['game__ground'],
    });
    this.playGround = [];
    this.wordResult = [];
    this.word = wordCollectionLevel1.rounds[0].words[0].textExample.split(' ');
    this.configureView();
    this.init();
  }

  init() {
    this.wrapperGame.addInnerElement(this.containerForPlayGround.getElement() as HTMLElement);
    this.wrapperGame.addInnerElement(this.containerWithShuffleSentence.getElement() as HTMLElement);
    this.elementCreator.addInnerElement(this.wrapperGame.getElement() as HTMLElement);
  }

  configureView() {
    console.log(this.collection[0]);
    this.configurePlayGround();
    this.createNewWord(0);
  }

  configurePlayGround() {
    for (let i = 0; i < this.collection[0].rounds[0].words.length; i += 1) {
      const playGroundSentence = new BaseElement({
        tagName: 'div',
        classNames: ['game__result-sentence'],
      }).getElement();
      this.containerForPlayGround.addInnerElement(playGroundSentence as HTMLElement);
    }
  }

  createNewWord(number: number) {
    const shuffledWords = [...this.word].sort(() => Math.random() - 0.5);
    for (let i = 0; i < shuffledWords.length; i += 1) {
      const word = new BaseElement({
        tagName: 'div',
        classNames: ['game-word', 'montserrat-700'],
        callback: (e) => this.handleWordClick(e, number),
      }).getElement();
      if (word) word.textContent = shuffledWords[i];
      word?.setAttribute('data-index', i.toString());
      this.containerWithShuffleSentence.addInnerElement(word as HTMLElement);
    }
  }
  /** БАГ С ВОЗВРАЩЕНИЕМ ЭЛЕМЕНТОВ!!! */

  handleWordClick(event: MouseEvent | Event | KeyboardEvent | null, number: number) {
    const resultSentenceContainer = document.body.querySelectorAll('.game__result-sentence')[number];
    const shuffleSentenceContainer = document.body.querySelector('.game__shuffle-sentence');
    const target = event?.target;
    if (target instanceof HTMLElement) {
      const originalIndex = parseInt(target.getAttribute('data-index') || '0', 10);
      if (target.parentNode === resultSentenceContainer) {
        const originalPosition = shuffleSentenceContainer?.querySelectorAll('.game-word')[originalIndex];
        console.log(shuffleSentenceContainer?.querySelectorAll('.game-word'), originalIndex);
        if (originalPosition) {
          shuffleSentenceContainer?.insertBefore(target, originalPosition);
        } else {
          shuffleSentenceContainer?.append(target);
        }
      } else {
        console.log('undefined');
        resultSentenceContainer?.append(target);
      }
    }
  }
}
