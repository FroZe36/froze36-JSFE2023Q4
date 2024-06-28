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

  WordsArray: BaseElement[];

  numberWord: number;

  numberRound: number;

  numberOfCollection: number;

  hintText: BaseElement;

  soundHear: BaseElement;

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
    this.hintText = new BaseElement({ tagName: 'span', classNames: ['hint-text', 'montserrat-700'] });
    this.soundHear = new BaseElement({
      tagName: 'div',
      classNames: ['sound-hear'],
      callback: () => this.getSoundHint(),
    });
    this.WordsArray = [];
    this.numberWord = 0;
    this.numberRound = 0;
    this.numberOfCollection = 0;
    this.word =
      this.collection[this.numberOfCollection].rounds[this.numberRound].words[this.numberWord].textExample.split(' ');
    this.configureView();
    this.init();
  }

  init() {
    this.wrapperGame.addInnerElement(this.hintText.getElement() as HTMLElement);
    this.wrapperGame.addInnerElement(this.containerForPlayGround.getElement() as HTMLElement);
    this.wrapperGame.addInnerElement(this.containerWithShuffleSentence.getElement() as HTMLElement);
    this.wrapperGame.addInnerElement(this.containerForButtons.getElement() as HTMLElement);
    this.elementCreator.addInnerElement(this.wrapperHeader.getElement() as HTMLElement);
    this.elementCreator.addInnerElement(this.wrapperGame.getElement() as HTMLElement);
  }

  configureView() {
    this.createSelectLevel();
    this.createSelectRound();
    this.configureTranslateHint();
    this.configureBackgroundHint();
    this.configureSoundHint();
    this.configurePlayGround();
    this.createEmptyBlock();
    this.createNewWord();
    this.createButton();
    const soundHear = this.soundHear.getElement();
    if (soundHear)
      soundHear.innerHTML = `<img width="64" height="64" src="https://img.icons8.com/dusk/64/medium-volume.png" alt="medium-volume"/>`;
    this.wrapperHeader.addInnerElement(soundHear as HTMLElement);
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
    const copyArr = [...wordItem];
    const emptyContainer = this.containerWithShuffleSentence.getElement()?.querySelectorAll('.empty');
    for (let i = 0; i < copyArr.length; i += 1) {
      const word = new BaseElement({
        tagName: 'div',
        classNames: ['game-word', 'montserrat-700'],
        callback: (e) => this.handlerWordClick(e),
      });
      this.WordsArray.push(word);
      const wordElement = word.getElement();
      if (wordElement) {
        wordElement.textContent = copyArr[i];
        wordElement?.setAttribute('data-index', i.toString());
      }
      if (emptyContainer) emptyContainer[i].appendChild(wordElement as HTMLElement);
    }
    this.hintText.setTextContent(
      `${this.collection[this.numberOfCollection].rounds[this.numberRound].words[this.numberWord].textExampleTranslate}`,
    );
    setTimeout(() => this.setWidth(copyArr));
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

  setWidth(copyArr: string[], parentContainer = this.containerWithShuffleSentence.getElement()) {
    const containerWidth = this.containerForPlayGround.getElement()?.offsetWidth;
    const copyArrWords = copyArr;
    const words = parentContainer?.querySelectorAll('.game-word');
    const emptyContainer = this.containerWithShuffleSentence.getElement()?.querySelectorAll('.empty');
    if (containerWidth && words) {
      const averageLengthLetters = copyArrWords.reduce((acc, curr) => {
        let copyAcc = acc;
        copyAcc += curr.length;
        return copyAcc;
      }, 0);
      const width = containerWidth / averageLengthLetters;
      let sentenceWidth = 0;
      const firstElementWidth = width * copyArrWords[0].length;
      words.forEach((item, index) => {
        const element = item;
        const wordWidth = width * copyArrWords[index].length;
        if (index === 0) sentenceWidth += wordWidth - firstElementWidth;
        else {
          const previousElementWidth = width * copyArrWords[index - 1].length;
          sentenceWidth += previousElementWidth;
        }
        if (element instanceof HTMLElement) {
          element.style.width = `${wordWidth}px`;
          this.addBackgroundImage(element, containerWidth, sentenceWidth);
        }
      });

      if (emptyContainer) {
        const randomSort = () => Math.random() - 0.5;
        const sortedArr = Array.from(emptyContainer).sort(randomSort);
        const sortedDivCollection = document.createDocumentFragment();
        sortedArr.forEach((div) => sortedDivCollection.append(div));
        const shuffleContainer = this.containerWithShuffleSentence.getElement();
        if (shuffleContainer) shuffleContainer.innerHTML = '';
        shuffleContainer?.append(sortedDivCollection);
      }
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
    const hintElement = this.hintText.getElement();
    const hintTextButton = this.wrapperHeader.getElement()?.querySelector('.hint-button');
    const hintAudioBtn = this.wrapperHeader.getElement()?.querySelector('.hint-button_sound');
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
            if (hintTextButton?.classList.contains('turnOFF')) hintElement?.classList.add('show-on');
            if (hintAudioBtn?.classList.contains('turnOFF')) this.soundHear.getElement()?.classList.add('show-on');
            buttonContinue.classList.remove('check');
            buttonContinue.textContent = 'Continue';
            buttonContinue?.classList.add('ready');
          }
        } else if (target.classList.contains('ready')) {
          if (hintTextButton?.classList.contains('turnOFF')) hintElement?.classList.remove('show-on');
          if (hintAudioBtn?.classList.contains('turnOFF')) this.soundHear.getElement()?.classList.remove('show-on');
          this.reset(buttonContinue);
        }
      }
    }
  }

  reset(button: HTMLButtonElement) {
    const buttonContinue = button;
    if (this.numberWord === 9) {
      const selectRound = this.wrapperHeader.getElement()?.querySelector('.game-header__select_round');
      const selectLevel = this.wrapperHeader.getElement()?.querySelector('.game-header__select_level');
      this.WordsArray.forEach((item) => item.removeCallback());
      this.WordsArray = [];
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
      this.WordsArray.forEach((item) => item.removeCallback());
      this.WordsArray = [];
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
    const hintAudioBtn = this.wrapperHeader.getElement()?.querySelector('.hint-button_sound');
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
      const hintButton = this.wrapperHeader.getElement()?.querySelector('.hint-button');
      if (hintButton?.classList.contains('turnOFF')) this.hintText.getElement()?.classList.add('show-on');
      if (hintAudioBtn?.classList.contains('turnOFF')) this.soundHear.getElement()?.classList.add('show-on');
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

  configureTranslateHint() {
    const isHint = (e: MouseEvent | Event | KeyboardEvent | null) => {
      const target = e?.currentTarget;
      const hintElement = this.hintText.getElement();
      if (target instanceof HTMLElement) {
        target.classList.toggle('turnOFF');
        if (target.classList.contains('turnOFF')) {
          hintElement?.classList.add('show-off');
        } else {
          hintElement?.classList.remove('show-off');
        }
      }
    };
    const createHintTranslateText = new BaseElement({
      tagName: 'div',
      classNames: ['hint-button', 'hint-button_translate'],
      callback: (e) => isHint(e),
    }).getElement();
    if (createHintTranslateText) {
      createHintTranslateText.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0,0,256,256">
      <g transform=""><g fill="#000000" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M6,3c-1.69922,0 -3,1.30078 -3,3v20c0,1.69922 1.30078,3 3,3h0.40625l1.59375,-2h-2c-0.60156,0 -1,-0.39844 -1,-1v-20c0,-0.60156 0.39844,-1 1,-1h20c0.60156,0 1,0.39844 1,1v15h-3c-1.69922,0 -3,1.30078 -3,3v3h-5l1.59375,2h3.40625v3.40625l2,1.6875v-10.09375c0,-0.60156 0.39844,-1 1,-1h20c0.60156,0 1,0.39844 1,1v20c0,0.60156 -0.39844,1 -1,1h-20c-0.60156,0 -1,-0.39844 -1,-1v-2l-2,1.6875v0.3125c0,1.69922 1.30078,3 3,3h20c1.69922,0 3,-1.30078 3,-3v-20c0,-1.69922 -1.30078,-3 -3,-3h-15v-15c0,-1.69922 -1.30078,-3 -3,-3zM16,8v2h-8v2h11.90625c-0.30859,2.22656 -1.61328,4.05469 -3.25,5.53125c-2.50781,-2.19922 -3.78125,-4.5 -3.78125,-4.5l-1.75,0.9375c0,0 1.30859,2.41016 3.9375,4.8125c-0.06641,0.04688 -0.12109,0.10938 -0.1875,0.15625c-2.64062,1.82031 -5.28125,2.71875 -5.28125,2.71875l0.625,1.90625c0,0 2.90625,-0.96484 5.8125,-2.96875c0.20703,-0.14453 0.41797,-0.3125 0.625,-0.46875c1.14063,0.84375 2.46875,1.61719 3.96875,2.21875l0.75,-1.875c-1.14844,-0.45703 -2.17578,-1.05078 -3.09375,-1.6875c1.82813,-1.73047 3.35547,-3.98828 3.65625,-6.78125h3.0625v-2h-7v-2zM12,25l-5,6h3v4h4v-4h3zM33,26.40625l-5.1875,13.78125h2.5l1.09375,-3.1875h5.28125l1.125,3.1875h2.5l-5.21875,-13.78125zM34,29.40625l2,5.6875h-4zM19,33v3h-9l4,4h5v3l6,-5z"></path></g></g></g>
      </svg>`;
      this.wrapperHeader.addInnerElement(createHintTranslateText);
    }
  }

  configureBackgroundHint() {
    const isHint = (e: MouseEvent | Event | KeyboardEvent | null) => {
      const target = e?.currentTarget;
      const allWords = document.body?.querySelectorAll('.game-word');
      if (target instanceof HTMLElement) {
        target.classList.toggle('turnOFF');
        if (target.classList.contains('turnOFF')) {
          allWords?.forEach((word) => {
            const copyWord = word;
            copyWord.classList.add('off');
            if (copyWord instanceof HTMLElement) copyWord.style.backgroundImage = '';
          });
        } else {
          const pathUrl = `./rss-puzzle-data/images/${this.collection[this.numberOfCollection].rounds[this.numberRound].levelData.imageSrc}`;
          allWords?.forEach((word) => {
            const copyWord = word;
            copyWord.classList.remove('off');
            if (copyWord instanceof HTMLElement) copyWord.style.backgroundImage = `url(${pathUrl})`;
          });
        }
      }
    };
    const createHintBackground = new BaseElement({
      tagName: 'div',
      classNames: ['hint-button', 'hint-button_background'],
      callback: (e) => isHint(e),
    }).getElement();
    if (createHintBackground) {
      createHintBackground.innerHTML = `<img width="50" height="50" src="https://img.icons8.com/ios/50/visible--v1.png" alt="visible--v1"/>`;
      this.wrapperHeader.addInnerElement(createHintBackground);
    }
  }

  configureSoundHint() {
    const isHint = (e: MouseEvent | Event | KeyboardEvent | null) => {
      const target = e?.currentTarget;
      const soundButton = this.soundHear.getElement();
      if (target instanceof HTMLElement) {
        target.classList.toggle('turnOFF');
        if (target.classList.contains('turnOFF')) {
          soundButton?.classList.add('show-off');
        } else {
          soundButton?.classList.remove('show-off');
        }
      }
    };
    const createHintSound = new BaseElement({
      tagName: 'div',
      classNames: ['hint-button', 'hint-button_sound'],
      callback: (e) => isHint(e),
    }).getElement();
    if (createHintSound) {
      createHintSound.innerHTML = `<img width="50" height="50" src="https://img.icons8.com/ios-glyphs/30/audio-wave--v2.png" alt="audio-wave--v2"/>`;
      this.wrapperHeader.addInnerElement(createHintSound);
    }
  }

  getSoundHint() {
    const audio = new Audio(
      `./rss-puzzle-data/${this.collection[this.numberOfCollection].rounds[this.numberRound].words[this.numberWord].audioExample}`,
    );
    audio.play();
  }

  addBackgroundImage(element: HTMLElement, sizeParent: number, wordWidth: number) {
    const pathUrl = `./rss-puzzle-data/images/${this.collection[this.numberOfCollection].rounds[this.numberRound].levelData.imageSrc}`;
    const hintBackground = this.wrapperHeader.getElement()?.querySelector('.hint-button_background');
    const allWords = document.body?.querySelectorAll('.game-word');
    const height = 57 * this.numberWord;
    const slicedElement = element;
    if (slicedElement) {
      slicedElement.style.backgroundImage = `url(${pathUrl})`;
      slicedElement.style.backgroundSize = `${sizeParent}px 570px`;
      slicedElement.style.backgroundPosition = `-${wordWidth}px -${height}px`;
      if (hintBackground?.classList.contains('turnOFF')) {
        allWords.forEach((word) => {
          const copyWord = word;
          copyWord.classList.remove('off');
          if (copyWord instanceof HTMLElement) copyWord.style.backgroundImage = `url(${pathUrl})`;
        });
        setTimeout(() => {
          allWords.forEach((word) => {
            const copyWord = word;
            copyWord.classList.add('off');
            if (copyWord instanceof HTMLElement) copyWord.style.backgroundImage = '';
          });
        }, 1500);
      }
    }
  }
}
