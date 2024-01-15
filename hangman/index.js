'use strict';
//LAYOUT
const container = document.createElement('div');
container.className = 'container';
document.body.append(container);

const gallowWrapper = document.createElement('div');
gallowWrapper.className = 'gallow-wrapper';
const gallowName = document.createElement('h1');
const gallowImage = document.createElement('img');
gallowImage.className = 'gallow-image';
gallowImage.src = './assets/img/hangman-0.svg';
gallowName.textContent = 'Hangman Game';
container.append(gallowWrapper);
gallowWrapper.append(gallowName, gallowImage);

const gameWrapper = document.createElement('div');
gameWrapper.className = 'game-wrapper';
container.append(gameWrapper);
const letterList = document.createElement('ul');
letterList.className = 'letter-list';
const hintText = document.createElement('h2');
hintText.className = 'hint';
const spanHintText = document.createElement('span');
hintText.textContent = 'Hint: ';
hintText.append(spanHintText);
const guessesText = document.createElement('h2');
guessesText.className = 'guesses';
const spanGuessesText = document.createElement('span');
guessesText.textContent = 'Incorrect guesses: ';
guessesText.append(spanGuessesText);

const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
for (let i = 0; i < alphabet.length; i++) {
  const btn = document.createElement('button');
  btn.textContent = alphabet[i];
  keyboard.append(btn);
  btn.addEventListener('click', e => gamePlay(e.target, alphabet[i]));
}
gameWrapper.append(letterList, hintText, guessesText, keyboard);

//MODAL
const modal = document.createElement('div');
modal.className = 'modal';
const modalContent = document.createElement('div');
const modalResult = document.createElement('h3');
modalResult.textContent = 'Game Over!';
const modalSecretWord = document.createElement('p');
const spanSecretWord = document.createElement('span');
spanSecretWord.textContent = 'Barabedsadasda';
modalSecretWord.textContent = 'The word was: ';
modalSecretWord.append(spanSecretWord);
const modalBtn = document.createElement('button');
modalBtn.textContent = 'Play again';
modalContent.append(modalResult, modalSecretWord, modalBtn);
modal.append(modalContent);
document.body.append(modal);

//GAME
document.addEventListener('keydown', e =>
  gamePlay(
    Array.from(keyboard.querySelectorAll('button')).filter(
      item => item.textContent === e.key,
    )[0],
    e.key,
  ),
);
let currentWord;
let wrongCount = 0;
let currentLetters = [];
const maxWrongGuesses = 6;
spanGuessesText.textContent = `${wrongCount} / ${maxWrongGuesses}`;

function getRandomWord() {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  spanHintText.textContent = hint;
  console.log(word, hint);
  letterList.innerHTML = word
    .split('')
    .map(() => `<li></li>`)
    .join('');
}
function gamePlay(target, letter) {
  if (currentWord.includes(letter)) {
    [...currentWord].forEach((item, i) => {
      if (item === letter) {
        currentLetters.push(letter);
        letterList.querySelectorAll('li')[i].textContent = letter;
        letterList.querySelectorAll('li')[i].className = 'guessed';
      }
    });
  } else {
    wrongCount++;
    gallowImage.src = `./assets/img/hangman-${wrongCount}.svg`;
    spanGuessesText.textContent = `${wrongCount} / ${maxWrongGuesses}`;
  }
  target.disabled = true;
}

getRandomWord();
