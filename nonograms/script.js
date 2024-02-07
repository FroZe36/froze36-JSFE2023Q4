const wrapperResetAndTimer = document.createElement('div');
wrapperResetAndTimer.className = 'container';
let timer = document.createElement('div');
timer.textContent = '00:00';
const resetBtn = document.createElement('button');
resetBtn.type = 'button';
resetBtn.className = 'btn btn-reset';
resetBtn.textContent = 'Reset Game';
const saveGameBtn = document.createElement('button');
saveGameBtn.type = 'button';
saveGameBtn.textContent = 'Save Game';
saveGameBtn.className = 'btn btn-save';
const continueGameBtn = document.createElement('button');
continueGameBtn.type = 'button';
continueGameBtn.textContent = 'Continue Last Game';
continueGameBtn.className = 'btn btn-continue';
const selectRandomGameBtn = document.createElement('button');
selectRandomGameBtn.type = 'button';
selectRandomGameBtn.textContent = 'Random Game';
selectRandomGameBtn.className = 'btn btn-random';
const solutionGameBtn = document.createElement('button');
solutionGameBtn.type = 'button';
solutionGameBtn.textContent = 'Solution';
solutionGameBtn.className = 'btn btn-solution';
const changeThemeBtn = document.createElement('button');
changeTheme.type = 'button';
changeThemeBtn.textContent = 'Theme: Light';
changeThemeBtn.className = 'btn btn-theme';
changeThemeBtn.setAttribute('theme', 'light');
const changeSoundBtn = document.createElement('button');
changeSoundBtn.type = 'button';
changeSoundBtn.textContent = 'Sound: ON';
changeSoundBtn.className = 'btn btn-sound';

wrapperResetAndTimer.append(
  timer,
  resetBtn,
  saveGameBtn,
  continueGameBtn,
  selectRandomGameBtn,
  solutionGameBtn,
  changeThemeBtn,
  changeSoundBtn,
);
document.body.append(wrapperResetAndTimer);

const gameContainer = document.createElement('table');
gameContainer.className = 'game-container';
document.body.append(gameContainer);
const scoreTable = document.createElement('fieldset');
const scoreTableLegend = document.createElement('legend');
scoreTableLegend.textContent = 'High Score Table';
scoreTable.className = 'score-table';
const winMessage = 'Great! You have solved the nonogram';
const nanograms = [
  {
    name: 'Umbrella',
    size: 5,
    solution: [
      [0, 1, 1, 1, 0],
      [1, 1, 0, 1, 1],
      [1, 0, 1, 0, 1],
      [0, 0, 1, 0, 0],
      [0, 1, 1, 0, 0],
    ],
  },
  {
    name: 'Arrow Down',
    size: 5,
    solution: [
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [1, 0, 1, 0, 1],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
    ],
  },
  {
    name: 'Home',
    size: 5,
    solution: [
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
    ],
  },
  {
    name: 'X',
    size: 5,
    solution: [
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 1],
    ],
  },
  {
    name: 'Zero',
    size: 5,
    solution: [
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
    ],
  },
  {
    name: 'Single Sailboat',
    size: 10,
    solution: [
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    ],
  },
  {
    name: 'Ornament',
    size: 10,
    solution: [
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
      [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
      [1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    ],
  },
  {
    name: 'Duck',
    size: 10,
    solution: [
      [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 0, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    ],
  },
  {
    name: 'Heart',
    size: 10,
    solution: [
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    ],
  },
  {
    name: 'Music',
    size: 10,
    solution: [
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
      [0, 0, 0, 1, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 1, 0, 0, 0, 1, 1, 1],
      [0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  {
    name: 'Spade',
    size: 15,
    solution: [
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    ],
  },
  {
    name: 'Smile Sun',
    size: 15,
    solution: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  {
    name: 'Lamp',
    size: 15,
    solution: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  {
    name: 'Clover',
    size: 15,
    solution: [
      [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  {
    name: 'Church',
    size: 15,
    solution: [
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
      [0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0],
      [0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0],
      [0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    ],
  },
];
if (!localStorage.getItem('highScores')) {
  localStorage.setItem('highScores', JSON.stringify([]));
}
if (JSON.parse(localStorage.getItem('highScores').length !== 0)) {
  document.body.append(scoreTable);
  getHighScores();
}
let selectedNanogram = nanograms[0];
let puzzle = generatePuzzle(selectedNanogram.size);
let clues = generateClues(selectedNanogram.solution);
let startTime;
let timerInterval;
let initialElapsedTime = 0;
let gameFinished = false;
let isUsedSolution = false;
let isSoundOn = true;

resetBtn.addEventListener('click', reset);
saveGameBtn.addEventListener('click', saveGame);
continueGameBtn.addEventListener('click', continueGame);
selectRandomGameBtn.addEventListener('click', getRandomGame);
solutionGameBtn.addEventListener('click', getSolution);
changeThemeBtn.addEventListener('click', e => {
  if (e.target.getAttribute('theme') === 'light') {
    changeTheme('dark');
    e.target.setAttribute('theme', 'dark');
    changeThemeBtn.textContent = 'Theme: Dark';
  } else {
    changeTheme('light');
    e.target.setAttribute('theme', 'light');
    changeThemeBtn.textContent = 'Theme: Light';
  }
});
changeSoundBtn.addEventListener('click', () => {
  if (isSoundOn) {
    isSoundOn = false;
    changeSoundBtn.textContent = 'Sound: OFF';
  } else {
    isSoundOn = true;
    changeSoundBtn.textContent = 'Sound: ON';
  }
});

function generateLevels(nonogram) {
  for (let i = 0; i < nonogram.length; i += 5) {
    const nonogramsSlice = nonogram.slice(i, i + 5);
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'level-container';
    const legend = document.createElement('legend');
    const div = document.createElement('div');
    legend.textContent = (function () {
      if (nonogramsSlice[nonogramsSlice.length - 1].size === 5) {
        return 'Easy 5x5';
      } else if (nonogramsSlice[nonogramsSlice.length - 1].size === 10) {
        return 'Medium 10x10';
      } else return 'Hard 15x15';
    })();
    fieldset.append(legend);
    fieldset.append(div);
    document.body.append(fieldset);

    nonogramsSlice.forEach(el => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'nanogram';
      input.value = el.name;
      label.textContent = el.name;
      input.addEventListener('click', e => {
        nonogram.forEach(item => {
          if (item.name === e.target.value) {
            selectedNanogram = item;
            clues = generateClues(selectedNanogram.solution);
            reset();
          }
        });
      });

      label.append(input);
      div.append(label);
    });
  }
  document.querySelector('.level-container div input').checked = true;
}

generateLevels(nanograms);

function generatePuzzle(size) {
  let puzzle = [];

  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(0);
    }
    puzzle.push(row);
  }

  return puzzle;
}

function generateClues(solution) {
  const height = solution.length;
  const width = solution[0].length;

  const rowHints = [];
  const colHints = [];
  for (let row = 0; row < height; row++) {
    let hint = [];
    let count = 0;

    for (let col = 0; col < width; col++) {
      if (solution[row][col] === 1) {
        count++;
      } else if (count > 0) {
        hint.push(count);
        count = 0;
      }
    }

    if (count > 0) {
      hint.push(count);
    }

    rowHints.push(hint);
  }
  for (let col = 0; col < width; col++) {
    let hint = [];
    let count = 0;

    for (let row = 0; row < height; row++) {
      if (solution[row][col] === 1) {
        count++;
      } else if (count > 0) {
        hint.push(count);
        count = 0;
      }
    }

    if (count > 0) {
      hint.push(count);
    }

    colHints.push(hint);
  }

  return {
    rowHints,
    colHints,
  };
}

function toggleCell(cell, row, col, e) {
  e.preventDefault();
  if (!startTime) {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
  }
  if (e.type === 'click') {
    if (puzzle[row][col] === 1) {
      const audio = new Audio('./assets/sound2.mp3');
      isSoundOn ? audio.play() : null;
      cell.firstChild.style.backgroundColor =
        changeThemeBtn.getAttribute('theme') === 'light' ? 'white' : 'black';
      puzzle[row][col] = 0;
    } else {
      const audio = new Audio('./assets/sound1.mp3');
      isSoundOn ? audio.play() : null;
      cell.firstChild.style.backgroundColor =
        changeThemeBtn.getAttribute('theme') === 'light' ? 'black' : 'white';
      cell.firstChild.textContent = '';
      puzzle[row][col] = 1;
    }
  } else {
    if (
      (puzzle[row][col] === 0 || puzzle[row][col] === 1) &&
      cell.firstChild.textContent !== 'X'
    ) {
      const audio = new Audio('./assets/sound3.mp3');
      isSoundOn ? audio.play() : null;
      cell.firstChild.style.backgroundColor =
        changeThemeBtn.getAttribute('theme') === 'light' ? 'white' : 'black';
      cell.firstChild.textContent = 'X';
      puzzle[row][col] = 2;
    }
  }
  checkWin(selectedNanogram.solution, puzzle);
}

function renderTable(size) {
  while (gameContainer.firstChild) {
    gameContainer.firstChild.remove();
  }
  const cells = [];
  const horizontal = [],
    vertical = [];

  for (let i = 0; i < size; i++) {
    let el = document.createElement('th');
    for (let j = 0; j < clues.colHints[i].length; j++) {
      let text = document.createElement('p');
      text.textContent = clues.colHints[i][j];
      el.append(text);
    }
    horizontal.push(el);
  }

  for (let i = 0; i < size; i++) {
    let el = document.createElement('th');
    el.innerHTML = `<p>${clues.rowHints[i].join(' ')}</p>`;
    vertical.push(el);
  }

  for (let i = 0; i < size; i++) {
    cells[i] = [];

    for (let j = 0; j < size; j++) {
      const el = document.createElement('td');
      const div = document.createElement('div');
      el.append(div);
      el.addEventListener('click', event => toggleCell(el, i, j, event));
      el.addEventListener('contextmenu', event => toggleCell(el, i, j, event));
      cells[i].push(el);
    }
  }
  const headerTr = document.createElement('tr');
  const emptyHeader = document.createElement('th');
  headerTr.append(emptyHeader);

  for (let i = 0; i < size; i++) {
    headerTr.append(horizontal[i]);
  }
  gameContainer.append(headerTr);
  for (let i = 0; i < size; i++) {
    let tr = document.createElement('tr');
    tr.append(vertical[i]);
    for (let j = 0; j < size; j++) {
      tr.append(cells[i][j]);
    }
    gameContainer.append(tr);
  }
  return cells;
}
renderTable(selectedNanogram.size);

function checkNanogram(solution, puzzle) {
  return puzzle.every((row, i) => {
    return row.every((value, j) => {
      if (solution[i][j] === 1 && value === 1) {
        return true;
      } else if (solution[i][j] === 0 && (value === 0 || value === 2)) {
        return true;
      }
    });
  });
}
function checkWin(solution, puzzle) {
  if (checkNanogram(solution, puzzle) && !isUsedSolution) {
    gameFinished = true;
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    addHighScore(selectedNanogram, elapsedTime);
    setTimeout(() => {
      alert(`${winMessage} in ${elapsedTime} seconds!`);
      getHighScores();
      reset();
    }, 300);
    const audio = new Audio('./assets/sound4.mp3');
    isSoundOn ? audio.play() : null;
  }
}
function updateTimer() {
  if (!gameFinished) {
    const elapsedTime = Math.floor(
      (Date.now() - startTime + initialElapsedTime) / 1000,
    );
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
      seconds,
    ).padStart(2, '0')}`;
    timer.textContent = formattedTime;
  }
}
function reset() {
  timer.textContent = '00:00';
  startTime = 0;
  gameFinished = false;
  isUsedSolution = false;
  clearInterval(timerInterval);
  puzzle = generatePuzzle(selectedNanogram.size);
  renderTable(selectedNanogram.size);
}

function saveGame() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  const storageItem = { elapsedTime, selectedNanogram, puzzle };
  localStorage.setItem('saved-game', JSON.stringify(storageItem));
}
function continueGame() {
  let storageItem;
  clearInterval(timerInterval);
  if (localStorage.getItem('saved-game')) {
    storageItem = JSON.parse(localStorage.getItem('saved-game'));
    selectedNanogram = storageItem.selectedNanogram;
    puzzle = storageItem.puzzle;
    clues = generateClues(selectedNanogram.solution);
    initialElapsedTime = storageItem.elapsedTime ? storageItem.elapsedTime : 0;
    startTime = Date.now() - initialElapsedTime * 1000;
    timerInterval = setInterval(updateTimer, 1000);
    const cells = renderTable(storageItem.selectedNanogram.size);
    for (let i = 0; i < puzzle.length; i++) {
      for (let j = 0; j < puzzle[i].length; j++) {
        if (puzzle[i][j] === 1) {
          cells[i][j].firstChild.style.backgroundColor =
            changeThemeBtn.getAttribute('theme') === 'light'
              ? 'black'
              : 'white';
        }
        if (puzzle[i][j] === 2) {
          cells[i][j].firstChild.textContent = 'X';
        }
      }
    }
    document
      .querySelector('.level-container div')
      .querySelectorAll('input')
      .forEach(input => {
        if (input.value === selectedNanogram.name) {
          input.checked = true;
        }
      });
  } else {
    console.log('localStorage = null');
  }
}
function getRandomGame() {
  const getRandomIndex = getRandomNonRepeatingIndex(nanograms);
  selectedNanogram = nanograms[getRandomIndex()];
  clues = generateClues(selectedNanogram.solution);
  puzzle = generatePuzzle(selectedNanogram.size);
  renderTable(selectedNanogram.size);
  document.querySelectorAll('input').forEach(input => {
    if (input.value === selectedNanogram.name) {
      input.checked = true;
    }
  });
}
function getRandomNonRepeatingIndex(arr) {
  let lastIndex = null;

  return function () {
    let randomIndex = Math.floor(Math.random() * arr.length);

    while (randomIndex === lastIndex) {
      randomIndex = Math.floor(Math.random() * arr.length);
    }
    lastIndex = randomIndex;
    return randomIndex;
  };
}
function getSolution() {
  const cells = renderTable(selectedNanogram.size);
  for (let i = 0; i < selectedNanogram.solution.length; i++) {
    for (let j = 0; j < selectedNanogram.solution[i].length; j++) {
      puzzle[i][j] = selectedNanogram.solution[i][j];
      if (puzzle[i][j] === 1) {
        cells[i][j].firstChild.style.backgroundColor =
          changeThemeBtn.getAttribute('theme') === 'light' ? 'black' : 'white';
      } else {
        cells[i][j].firstChild.style.backgroundColor =
          changeThemeBtn.getAttribute('theme') === 'light' ? 'white' : 'black';
      }
    }
  }

  clearInterval(timerInterval);
  isUsedSolution = true;
  setTimeout(() => {
    alert('You was close');
    reset();
  }, 500);
}
function addHighScore(solution, time) {
  const highScores = JSON.parse(localStorage.getItem('highScores'));
  let difficultLevel;
  if (solution.size === 5) {
    difficultLevel = 'Easy 5x5';
  } else if (solution.size === 10) {
    difficultLevel = 'Medium 10x10';
  } else {
    difficultLevel = 'Hard 15x15';
  }
  highScores.push({ name: solution.name, difficultLevel, time });
  const latestHighScores = highScores.slice(-5);
  localStorage.setItem('highScores', JSON.stringify(latestHighScores));
}
function getHighScores() {
  while (scoreTable.firstChild) {
    scoreTable.firstChild.remove();
  }
  scoreTable.append(scoreTableLegend);
  const highScores = JSON.parse(localStorage.getItem('highScores'));
  highScores.sort((a, b) => {
    return a.time - b.time;
  });
  highScores.forEach((score, index) => {
    const minutes = Math.floor(score.time / 60);
    const seconds = score.time % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
      seconds,
    ).padStart(2, '0')}`;
    const div = document.createElement('div');
    const namePuzzle = document.createElement('span');
    namePuzzle.textContent = `${index + 1}. ${score.name}`;
    const difficultLevel = document.createElement('span');
    difficultLevel.textContent = score.difficultLevel;
    const time = document.createElement('span');
    time.textContent = formattedTime;
    div.append(namePuzzle, difficultLevel, time);
    scoreTable.append(div);
  });
}
function changeTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.style.setProperty('--background-color', 'black');
    document.documentElement.style.setProperty('--font-color', 'white');
    document.documentElement.style.setProperty('--border-color', 'white');
    document.documentElement.style.setProperty('--button-color', 'black');
    let cells = document.querySelectorAll('tr td');
    let copyPuzzle = puzzle;
    for (let i = 0; i < copyPuzzle.flat().length; i++) {
      if (copyPuzzle.flat()[i] === 1) {
        cells[i].firstChild.style.backgroundColor = 'white';
      } else {
        cells[i].firstChild.style.backgroundColor = 'black';
      }
    }
  } else if (theme === 'light') {
    document.documentElement.style.setProperty('--background-color', 'white');
    document.documentElement.style.setProperty('--font-color', 'black');
    document.documentElement.style.setProperty('--border-color', 'black');
    document.documentElement.style.setProperty('--button-color', 'white');
    let cells = document.querySelectorAll('tr td');
    let copyPuzzle = puzzle;
    for (let i = 0; i < copyPuzzle.flat().length; i++) {
      if (copyPuzzle.flat()[i] === 1) {
        cells[i].firstChild.style.backgroundColor = 'black';
      } else {
        cells[i].firstChild.style.backgroundColor = 'white';
      }
    }
  }
}
