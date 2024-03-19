import { View } from '../view';
import './game.css';
import wordCollectionLevel1 from '../../rss-puzzle-data/data/wordCollectionLevel1.json';
import wordCollectionLevel2 from '../../rss-puzzle-data/data/wordCollectionLevel2.json';
import wordCollectionLevel3 from '../../rss-puzzle-data/data/wordCollectionLevel3.json';
import WordCollectionLevel4 from '../../rss-puzzle-data/data/wordCollectionLevel4.json';
import WordCollectionLevel5 from '../../rss-puzzle-data/data/wordCollectionLevel5.json';
import WordCollectionLevel6 from '../../rss-puzzle-data/data/wordCollectionLevel6.json';
import { WordCollection } from '../../types/interface';
import { BaseElement } from '../../utils/createElement';

function createElementOption(collection: WordCollection[], container: Element, levelSelect: number) {
  for (let i = 1; i <= collection[levelSelect].roundsCount; i += 1) {
    const option = new BaseElement({
      tagName: 'option',
      classNames: ['game-header__option', 'montserrat-500'],
      text: `${i}`,
    }).getElement() as HTMLElement;
    container.append(option);
  }
}

export class GameView extends View {
  word: string[];

  wrapperHeader;

  wrapperGame;

  collection: WordCollection[];

  containerWithShuffleSentence;

  containerForPlayGround;

  containerForButtons;

  shuffledWords: BaseElement[];

  numberWord: number;

  numberRound: number;

  numberOfCollection: number;

  constructor() {
    super({ tagName: 'div', classNames: ['game', 'container'] });
    this.collection = [
      wordCollectionLevel1,
      wordCollectionLevel2,
      wordCollectionLevel3,
      WordCollectionLevel4,
      WordCollectionLevel5,
      WordCollectionLevel6,
    ];
    this.wrapperHeader = new BaseElement({ tagName: 'div', classNames: ['game-header'] });
    this.wrapperGame = new BaseElement({ tagName: 'div', classNames: ['game-wrapper'] });
    this.containerWithShuffleSentence = new BaseElement({ tagName: 'div', classNames: ['game__shuffle-sentence'] });
    this.containerForPlayGround = new BaseElement({ tagName: 'div', classNames: ['game__ground'] });
    this.containerForButtons = new BaseElement({ tagName: 'div', classNames: ['game-btn-container'] });
    this.shuffledWords = [];
    this.numberWord = 0;
    this.numberRound = 0;
    this.numberOfCollection = 0;
    this.word =
      this.collection[this.numberOfCollection].rounds[this.numberRound].words[this.numberWord].textExample.split(' ');
    this.configureView();
    this.init();
  }

  init() {
    this.wrapperGame.addInnerElement(this.containerForPlayGround.getElement() as HTMLElement);
    this.wrapperGame.addInnerElement(this.containerWithShuffleSentence.getElement() as HTMLElement);
    this.wrapperGame.addInnerElement(this.containerForButtons.getElement() as HTMLElement);
    this.elementCreator.addInnerElement(this.wrapperHeader.getElement() as HTMLElement);
    this.elementCreator.addInnerElement(this.wrapperGame.getElement() as HTMLElement);
  }

  configureView() {
    this.createSelectLevel();
    this.createSelectRound();
    this.configurePlayGround();
    this.createEmptyBlock();
    this.createNewWord();
    this.createButton();
  }

  configurePlayGround(
    numberWord = this.numberWord,
    numberRound = this.numberRound,
    numberOfCollection = this.numberOfCollection,
  ) {
    const container = this.containerForPlayGround.getElement();
    if (container) container.innerHTML = '';
    for (let i = 0; i < this.collection[numberOfCollection].rounds[numberRound].words.length; i += 1) {
      const playGroundSentence = new BaseElement({
        tagName: 'div',
        classNames: ['game__result-sentence'],
      }).getElement();

      this.containerForPlayGround.addInnerElement(playGroundSentence as HTMLElement);
    }
    this.containerForPlayGround
      .getElement()
      ?.querySelectorAll('.game__result-sentence')
      [numberWord].classList.add('inprogress');
  }

  createEmptyBlock(emptyItem = this.word) {
    const container = this.containerWithShuffleSentence.getElement();
    if (container) container.innerHTML = '';
    for (let i = 0; i < emptyItem.length; i += 1) {
      const emptyDiv = new BaseElement({
        tagName: 'div',
        classNames: ['empty'],
      }).getElement();
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
            if (word === result[index]) resultWords[index].classList.add('right');
            else resultWords[index].classList.add('wrong');
          });
          setTimeout(() => resultWords.forEach((item) => item.classList.remove('right', 'wrong')), 3000);
          if (this.word.every((word, index) => word === result[index])) {
            buttonContinue.classList.remove('check');
            buttonContinue.textContent = 'Continue';
            buttonContinue?.classList.add('ready');
          }
        } else if (target.classList.contains('ready')) this.reset(buttonContinue);
      }
    }
  }

  reset(button: HTMLButtonElement) {
    const buttonContinue = button;
    if (this.numberWord === 9) {
      const selectRound = this.wrapperHeader.getElement()?.querySelector('.game-header__select_round');
      const selectLevel = this.wrapperHeader.getElement()?.querySelector('.game-header__select_level');
      this.shuffledWords.forEach((item) => item.removeCallback());
      this.shuffledWords = [];
      this.numberWord = 0;
      this.numberRound += 1;
      if (this.numberRound === this.collection[this.numberOfCollection].roundsCount) {
        this.numberOfCollection =
          this.numberOfCollection === this.collection.length - 1 ? 0 : (this.numberOfCollection += 1);
        this.numberRound = 0;
        if (selectRound) {
          selectRound.innerHTML = '';
          createElementOption(this.collection, selectRound, this.numberOfCollection);
        }
        if (selectLevel instanceof HTMLSelectElement) selectLevel.value = (this.numberOfCollection + 1).toString();
      }
      this.configurePlayGround();
      if (selectRound instanceof HTMLSelectElement) selectRound.value = (this.numberRound + 1).toString();
    } else {
      this.shuffledWords.forEach((item) => item.removeCallback());
      this.shuffledWords = [];
      this.numberWord += 1;
    }
    this.nextSentense(this.numberWord);
    buttonContinue.disabled = true;
    buttonContinue.classList.remove('ready');
    buttonContinue.textContent = 'Check';
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
    if (resultWords.length === this.word.length && containerResult.classList.contains('inprogress')) {
      buttonContinue.disabled = false;
      buttonContinue.classList.add('check');
    } else {
      buttonContinue.disabled = true;
      buttonContinue.textContent = 'Check';
      buttonContinue.classList.remove('check', 'ready');
    }
  }

  nextSentense(numberWord: number, numberRound = this.numberRound, numberOfCollection = this.numberOfCollection) {
    this.word = this.collection[numberOfCollection].rounds[numberRound].words[numberWord].textExample.split(' ');
    const resultSentenceContainer = document.body.querySelectorAll('.game__result-sentence');
    resultSentenceContainer.forEach((item) => item.classList.remove('inprogress'));
    resultSentenceContainer[numberWord].classList.add('inprogress');
    this.createEmptyBlock();
    this.createNewWord();
  }

  createSelectLevel() {
    const container = new BaseElement({
      tagName: 'div',
      classNames: ['game-header__container', 'montserrat-700'],
      text: 'Level',
    });
    const levelSelect = new BaseElement({
      tagName: 'select',
      classNames: ['game-header__select', 'game-header__select_level', 'montserrat-500'],
    });
    levelSelect.getElement()?.addEventListener('change', (e) => this.changeLevel(e));
    for (let i = 1; i <= this.collection.length; i += 1) {
      const option = new BaseElement({
        tagName: 'option',
        classNames: ['game-header__option', 'montserrat-500'],
        text: `${i}`,
      }).getElement();
      if (option) levelSelect.addInnerElement(option);
    }
    container.addInnerElement(levelSelect.getElement() as HTMLElement);
    this.wrapperHeader.addInnerElement(container.getElement() as HTMLElement);
  }

  createSelectRound() {
    const container = new BaseElement({
      tagName: 'div',
      classNames: ['game-header__container', 'montserrat-700'],
      text: 'Round',
    });
    const roundSelect = new BaseElement({
      tagName: 'select',
      classNames: ['game-header__select', 'game-header__select_round', 'montserrat-500'],
    }).getElement();
    if (roundSelect) {
      roundSelect?.addEventListener('change', (e) => this.changeLevel(e));
      createElementOption(this.collection, roundSelect, this.numberOfCollection);
      container.addInnerElement(roundSelect);
      this.wrapperHeader.addInnerElement(container.getElement() as HTMLElement);
    }
  }

  changeLevel(event: Event | MouseEvent | KeyboardEvent | null) {
    const target = event?.target;
    if (target instanceof HTMLSelectElement) {
      if (target.classList.contains('game-header__select_level')) {
        const container = this.wrapperHeader.getElement()?.querySelector('.game-header__select_round');
        if (container) {
          container.innerHTML = '';
          createElementOption(this.collection, container, +target.value - 1);
          this.numberWord = 0;
          this.numberRound = 0;
          this.numberOfCollection = +target.value - 1;
          this.configurePlayGround();
          this.nextSentense(this.numberWord);
        }
      } else if (target.classList.contains('game-header__select_round')) {
        this.numberWord = 0;
        this.numberRound = +target.value - 1;
        this.configurePlayGround();
        this.nextSentense(this.numberWord);
      }
    }
  }
}
