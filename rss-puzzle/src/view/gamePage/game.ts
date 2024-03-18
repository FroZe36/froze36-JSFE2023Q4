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
    console.log(this.word);
  }

  configureView() {
    console.log(this.collection[0]);
    this.configurePlayGround();
    this.createEmptyBlock();
    this.createNewWord();
    this.createButton();
  }

  configurePlayGround(number = this.number) {
    for (let i = 0; i < this.collection[0].rounds[0].words.length; i += 1) {
      const playGroundSentence = new BaseElement({
        tagName: 'div',
        classNames: ['game__result-sentence'],
      }).getElement();

      this.containerForPlayGround.addInnerElement(playGroundSentence as HTMLElement);
    }
    this.containerForPlayGround
      .getElement()
      ?.querySelectorAll('.game__result-sentence')
      [number].classList.add('inprogress');
  }

  createEmptyBlock(emptyItem = this.word) {
    const container = this.containerWithShuffleSentence.getElement();
    if (container) container.innerHTML = '';
    for (let i = 0; i < emptyItem.length; i += 1) {
      const emptyDiv = new BaseElement({
        tagName: 'div',
        classNames: ['empty'],
      }).getElement();
      emptyDiv?.setAttribute('empty-index', i.toString());
      this.containerForPlayGround
        .getElement()
        ?.querySelector('.inprogress')
        ?.append(emptyDiv as HTMLElement);
    }
    for (let i = 0; i < emptyItem.length; i += 1) {
      const emptyDiv = new BaseElement({
        tagName: 'div',
        classNames: ['empty', 'insert'],
      }).getElement();
      emptyDiv?.setAttribute('empty-index', i.toString());
      this.containerWithShuffleSentence.getElement()?.append(emptyDiv as HTMLElement);
    }
  }

  createNewWord(wordItem = this.word) {
    const shuffledWords = [...wordItem].sort(() => Math.random() - 0.5);
    const emptyContainer = this.containerWithShuffleSentence.getElement()?.querySelectorAll('.empty');
    for (let i = 0; i < shuffledWords.length; i += 1) {
      const word = new BaseElement({
        tagName: 'div',
        classNames: ['game-word', 'montserrat-700'],
        callback: (e) => this.handlerWordClick(e),
      });
      this.shuffledWords.push(word);
      const wordElement = word.getElement();
      if (wordElement) {
        wordElement.textContent = shuffledWords[i];
        wordElement?.setAttribute('data-index', i.toString());
      }
      if (emptyContainer) emptyContainer[i].appendChild(wordElement as HTMLElement);
    }
    setTimeout(() => this.setWidth(shuffledWords));
  }

  handlerWordClick(event: MouseEvent | Event | KeyboardEvent | null) {
    const resultSentenceContainer = this.containerForPlayGround.getElement()?.querySelector('.inprogress');
    const shuffleSentenceContainer = this.containerWithShuffleSentence.getElement();
    const target = event?.target;
    if (target instanceof HTMLElement) {
      if (
        target.parentNode?.parentNode === shuffleSentenceContainer &&
        shuffleSentenceContainer &&
        resultSentenceContainer
      ) {
        const emptyWordsResult = resultSentenceContainer?.querySelectorAll('.empty');
        this.insertElement(emptyWordsResult, target);
        this.checkWin(resultSentenceContainer);
      } else {
        const emptyWordsShuffle = shuffleSentenceContainer?.querySelectorAll('.empty');
        if (emptyWordsShuffle && shuffleSentenceContainer) {
          this.insertElement(emptyWordsShuffle, target);
          this.checkWin(shuffleSentenceContainer);
        }
      }
    }
  }

  insertElement(containerEmptyWords: NodeListOf<Element>, target: HTMLElement) {
    for (let i = 0; i < containerEmptyWords.length; i += 1) {
      if (containerEmptyWords[i].classList.contains('empty') && !containerEmptyWords[i].classList.contains('insert')) {
        const firstEmptySlot = containerEmptyWords[i];
        const ParentEmptyTarget = target.parentNode;
        if (ParentEmptyTarget instanceof HTMLElement) {
          ParentEmptyTarget.classList.remove('insert');
        }
        firstEmptySlot.appendChild(target);
        firstEmptySlot.classList.add('insert');
        break;
      }
    }
  }

  setWidth(shuffledWords: string[], parentContainer = this.containerWithShuffleSentence.getElement()) {
    const containerWidth = this.containerForPlayGround.getElement()?.offsetWidth;
    const copyShuffleWords = shuffledWords;
    const words = parentContainer?.querySelectorAll('.game-word');
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
      text: 'Check',
      callback: (event) => this.handlerCheckBtn(event),
    }).getElement() as HTMLButtonElement;
    buttonContinue.disabled = true;
    const buttonAutoComplete = new BaseElement({
      tagName: 'button',
      classNames: ['game__button-autocomplete', 'montserrat-700'],
      text: 'Auto-Complete',
      callback: () => this.handlerAutoCompletBtn(),
    }).getElement() as HTMLButtonElement;
    this.containerForButtons.addInnerElement(buttonContinue);
    this.containerForButtons.addInnerElement(buttonAutoComplete);
  }

  handlerCheckBtn(event: MouseEvent | Event | KeyboardEvent | null) {
    const target = event?.target;
    if (target && target instanceof HTMLElement) {
      const resultSentenceContainer = document.body.querySelector('.game__result-sentence.inprogress');
      const resultWords = resultSentenceContainer?.querySelectorAll('.game-word');
      const buttonContinue = target as HTMLButtonElement;
      if (resultWords) {
        const result = Array.from(resultWords).map((word) => word.textContent);
        if (target.classList.contains('check')) {
          this.word.forEach((word, index) => {
            if (word === result[index]) {
              resultWords[index].classList.add('right');
            } else {
              resultWords[index].classList.add('wrong');
            }
          });
          setTimeout(() => resultWords.forEach((item) => item.classList.remove('right', 'wrong')), 3000);
          if (this.word.every((word, index) => word === result[index])) {
            buttonContinue.classList.remove('check');
            buttonContinue.textContent = 'Continue';
            buttonContinue?.classList.add('ready');
          }
        } else if (target.classList.contains('ready')) {
          this.shuffledWords.forEach((item) => item.removeCallback());
          this.number += 1;
          this.nextSentense(this.number);
          buttonContinue.disabled = true;
          buttonContinue.classList.remove('ready');
          buttonContinue.textContent = 'Check';
        }
      }
    }
  }

  handlerAutoCompletBtn() {
    const resultSentenceContainer = document.body.querySelector('.game__result-sentence.inprogress');
    const resultEmptyBlock = resultSentenceContainer?.querySelectorAll('.empty');
    const shuffleSentenceWords = this.containerWithShuffleSentence.getElement()?.querySelectorAll('.empty');
    const buttonContinue = this.containerForButtons
      .getElement()
      ?.querySelector('.game__button-continue') as HTMLButtonElement;

    if (resultEmptyBlock && shuffleSentenceWords && resultSentenceContainer && buttonContinue) {
      resultEmptyBlock.forEach((item) => {
        item.firstChild?.remove();
        item.classList.add('insert');
      });
      shuffleSentenceWords.forEach((item) => {
        item.firstChild?.remove();
        item.classList.remove('insert');
      });
      resultEmptyBlock.forEach((item, index) => {
        item.appendChild(
          new BaseElement({
            tagName: 'div',
            classNames: ['game-word', 'montserrat-700'],
            text: `${this.word[index]}`,
          }).getElement() as HTMLElement,
        );
      });
      const wordsResult = resultSentenceContainer?.querySelectorAll('.game-word');
      const wordsShuffleArray = Array.from(wordsResult)
        .map((word) => word.textContent)
        .filter((item): item is string => item !== null);
      setTimeout(() => this.setWidth(wordsShuffleArray, resultSentenceContainer as HTMLElement));
      buttonContinue.textContent = 'Continue';
      buttonContinue?.classList.add('ready');
      buttonContinue.disabled = false;
    }
  }

  checkWin(containerResult: Element) {
    const buttonContinue = this.containerForButtons
      .getElement()
      ?.querySelector('.game__button-continue') as HTMLButtonElement;
    const resultWords = containerResult.querySelectorAll('.game-word');
    // const result = Array.from(resultWords).map((item) => item.textContent);
    if (resultWords.length === this.word.length && containerResult.classList.contains('inprogress')) {
      buttonContinue.disabled = false;
      buttonContinue.classList.add('check');
    } else {
      buttonContinue.disabled = true;
      buttonContinue.textContent = 'Check';
      buttonContinue.classList.remove('check', 'ready');
    }
    // if (resultContainer.length !== this.word.length) buttonContinue.disabled = true;
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
    resultSentenceContainer[number].classList.add('inprogress');
    this.createEmptyBlock();
    this.createNewWord();
  }
}
