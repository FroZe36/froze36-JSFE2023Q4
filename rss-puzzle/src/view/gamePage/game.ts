import { View } from '../view';
import './game.css';
import wordCollectionLevel1 from '../../rss-puzzle-data/data/wordCollectionLevel1.json';
import { WordCollection } from '../../types/interface';
import { BaseElement } from '../../utils/createElement';

export class GameView extends View {
  word: string[];

  wrapperHeader;

  wrapperGame;

  collection: WordCollection[];

  containerWithShuffleSentence;

  containerForPlayGround;

  containerForButtons;

  number: number;

  shuffledWords: BaseElement[];

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
    this.containerForButtons = new BaseElement({
      tagName: 'div',
      classNames: ['game-btn-container'],
    });
    this.shuffledWords = [];
    this.number = 0;
    this.word = wordCollectionLevel1.rounds[0].words[0].textExample.split(' ');
    this.configureView();
    this.init();
  }

  init() {
    this.wrapperGame.addInnerElement(this.containerForPlayGround.getElement() as HTMLElement);
    this.wrapperGame.addInnerElement(this.containerWithShuffleSentence.getElement() as HTMLElement);
    this.wrapperGame.addInnerElement(this.containerForButtons.getElement() as HTMLElement);
    this.elementCreator.addInnerElement(this.wrapperGame.getElement() as HTMLElement);
  }

  configureView() {
    console.log(this.collection[0]);
    this.configurePlayGround();
    this.createNewWord(this.number);
    this.createButton();
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

  createNewWord(number: number, wordItem = this.word) {
    const shuffledWords = [...wordItem].sort(() => Math.random() - 0.5);
    for (let i = 0; i < shuffledWords.length; i += 1) {
      const word = new BaseElement({
        tagName: 'div',
        classNames: ['game-word', 'montserrat-700'],
        callback: (e) => this.handlerWordClick(e, number),
      });
      this.shuffledWords.push(word);
      const wordElement = word.getElement();
      if (wordElement) {
        wordElement.textContent = shuffledWords[i];
        wordElement?.setAttribute('data-index', i.toString());
      }
      this.containerWithShuffleSentence.addInnerElement(wordElement as HTMLElement);
    }
    setTimeout(() => this.setWidth(shuffledWords), 300);
  }

  handlerWordClick(event: MouseEvent | Event | KeyboardEvent | null, number: number) {
    const resultSentenceContainer = document.body.querySelectorAll('.game__result-sentence')[number];
    resultSentenceContainer.classList.add('inprogress');
    const shuffleSentenceContainer = document.body.querySelector('.game__shuffle-sentence');
    const target = event?.target;
    if (target instanceof HTMLElement) {
      const originalIndex = parseInt(target.getAttribute('data-index') || '0', 10);
      if (target.parentNode === resultSentenceContainer && shuffleSentenceContainer) {
        const shuffleSentenceContainerWords = shuffleSentenceContainer.querySelectorAll('.game-word');
        for (let i = 0; i < shuffleSentenceContainerWords.length; i += 1) {
          const wordAttribute = parseInt(shuffleSentenceContainerWords[i].getAttribute('data-index') || '0', 10);
          if (wordAttribute > originalIndex) {
            shuffleSentenceContainer?.insertBefore(target, shuffleSentenceContainerWords[i]);
            return;
          }
        }
        shuffleSentenceContainer?.append(target);
        // if (resultSentenceContainer) {
        //   this.checkWin(resultSentenceContainer.querySelectorAll('.game-word'));
        // }
      } else {
        resultSentenceContainer?.append(target);
        this.checkWin(resultSentenceContainer.querySelectorAll('.game-word'));
      }
    }
  }

  setWidth(shuffledWords: string[]) {
    const containerWidth = this.containerForPlayGround.getElement()?.offsetWidth;
    const copyShuffleWords = shuffledWords;
    const words = this.containerWithShuffleSentence.getElement()?.querySelectorAll('.game-word');
    if (containerWidth && words) {
      const averageLengthLetters = copyShuffleWords.reduce((acc, curr) => {
        let copyAcc = acc;
        copyAcc += curr.length;
        return copyAcc;
      }, 0);
      const width = containerWidth / averageLengthLetters;
      words.forEach((item, index) => {
        const element = item;
        if (element instanceof HTMLElement) {
          element.style.width = `${width * copyShuffleWords[index].length}px`;
        }
      });
    }
  }

  createButton() {
    const buttonContinue = new BaseElement({
      tagName: 'button',
      classNames: ['game__button-continue', 'montserrat-700'],
      text: 'Continue',
      callback: (event) => this.handlerCheckBtn(event),
    }).getElement() as HTMLButtonElement;
    buttonContinue.disabled = true;
    this.containerForButtons.addInnerElement(buttonContinue as HTMLButtonElement);
  }

  handlerCheckBtn(event: MouseEvent | Event | KeyboardEvent | null) {
    const target = event?.target;
    if (target && target instanceof HTMLElement) {
      // const resultSentenceContainer = document.body.querySelector('.game__result-sentence.inprogress');
      // const resultWords = resultSentenceContainer?.querySelectorAll('.game-word');
      if (target.classList.contains('ready')) {
        this.shuffledWords.forEach((item) => item.removeCallback());
        this.number += 1;
        this.nextSentense(this.number);
        const buttonContinue = target as HTMLButtonElement;
        buttonContinue.disabled = true;
      }
    }
  }

  checkWin(container: NodeListOf<Element>) {
    const buttonContinue = this.containerForButtons
      .getElement()
      ?.querySelector('.game__button-continue') as HTMLButtonElement;
    const result = Array.from(container).map((item) => item.textContent);
    if (this.word.every((word, index) => word === result[index])) {
      buttonContinue?.classList.add('ready');
      buttonContinue.disabled = false;
    }
    // if (container.length === 0 && buttonContinue) {
    //   buttonContinue?.classList.add('ready');
    //   buttonContinue.disabled = false;
    // } else {
    //   buttonContinue?.classList.remove('ready');
    //   buttonContinue.disabled = true;
    // }
  }

  nextSentense(number: number) {
    this.word = wordCollectionLevel1.rounds[0].words[number].textExample.split(' ');
    const resultSentenceContainer = document.body.querySelectorAll('.game__result-sentence');
    resultSentenceContainer.forEach((item) => item.classList.remove('inprogress'));
    this.createNewWord(number);
  }
}
