'use strict';
//GAME
const container = document.createElement('div');
container.className = 'container'
document.body.append(container);

const gallowWrapper = document.createElement('div');
gallowWrapper.className = 'gallow-wrapper'
const gallowName = document.createElement('h1');
const gallowImage = document.createElement('img');
gallowImage.src = './assets/img/gallows.svg';
gallowName.textContent = 'Hangman Game';
container.append(gallowWrapper);
gallowWrapper.append(gallowName, gallowImage);

const gameWrapper = document.createElement('div');
gameWrapper.className = 'game-wrapper'
container.append(gameWrapper);
const letterList = document.createElement('ul');
letterList.className = 'letter-list'
const hintText = document.createElement('h2');
hintText.className = 'hint'
const spanHintText = document.createElement('span');
hintText.textContent = 'Hint:';
hintText.append(spanHintText)
const guessesText = document.createElement('h2');
guessesText.className = 'guesses'
const spanGuessesText = document.createElement('span');
guessesText.textContent = 'Incorrect guesses:';
guessesText.append(spanGuessesText)

const keyboard = document.createElement('div');
keyboard.className = 'keyboard'
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
for(let i = 0; i < alphabet.length; i++) {
  const btn = document.createElement('button');
  btn.textContent = alphabet[i];
  keyboard.append(btn);
}
gameWrapper.append(letterList, hintText, guessesText, keyboard);

//MODAL
const modal = document.createElement('div');
modal.className = 'modal';
const modalContent = document.createElement('div');
const modalResult = document.createElement('h3');
modalResult.textContent = 'Game Over!'
const modalSecretWord = document.createElement('p');
const spanSecretWord = document.createElement('span');
spanSecretWord.textContent = 'Barabedsadasda'
modalSecretWord.textContent = 'The word was: '
modalSecretWord.append(spanSecretWord);
const modalBtn = document.createElement('button');
modalBtn.textContent = 'Play again'
modalContent.append(modalResult, modalSecretWord, modalBtn)
modal.append(modalContent)
document.body.append(modal);