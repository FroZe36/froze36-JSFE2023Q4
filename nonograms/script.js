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
wrapperResetAndTimer.append(timer, resetBtn, saveGameBtn, continueGameBtn);
document.body.append(wrapperResetAndTimer);

const gameContainer = document.createElement('table');
gameContainer.className = 'game-container';
document.body.append(gameContainer);

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

let selectedNanogram = nanograms[0];
let puzzle = generatePuzzle(selectedNanogram.size);
let clues = generateClues(selectedNanogram.solution);
let startTime;
let timerInterval;
let initialElapsedTime = 0;
let gameFinished = false;

resetBtn.addEventListener('click', reset);
saveGameBtn.addEventListener('click', saveGame);
continueGameBtn.addEventListener('click', continueGame);

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
  if (e.type === 'click') {
    if (puzzle[row][col] === 1) {
      const audio = new Audio('./assets/sound2.mp3');
      audio.play();
      cell.firstChild.style.backgroundColor = 'white';
      puzzle[row][col] = 0;
    } else {
      const audio = new Audio('./assets/sound1.mp3');
      audio.play();
      cell.firstChild.style.backgroundColor = 'black';
      cell.firstChild.textContent = '';
      puzzle[row][col] = 1;
    }
  } else {
    if (
      (puzzle[row][col] === 0 || puzzle[row][col] === 1) &&
      cell.firstChild.textContent !== 'X'
    ) {
      const audio = new Audio('./assets/sound3.mp3');
      audio.play();
      cell.firstChild.style.backgroundColor = 'white';
      cell.firstChild.textContent = 'X';
      puzzle[row][col] = 0;
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
      el.addEventListener('click', () => {
        if (!startTime) {
          startTime = Date.now();
          timerInterval = setInterval(updateTimer, 1000);
        }
      });
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
    return row.every((value, j) => value === solution[i][j]);
  });
}
function checkWin(solution, puzzle) {
  if (checkNanogram(solution, puzzle)) {
    gameFinished = true;
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    setTimeout(() => {
      alert(`${winMessage} in ${elapsedTime} seconds!`);
      reset();
    }, 300);
    const audio = new Audio('./assets/sound4.mp3');
    audio.play();
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
  clearInterval(timerInterval);
  puzzle = generatePuzzle(selectedNanogram.size);
  renderTable(selectedNanogram.size);
}

function saveGame() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  const storageItem = { elapsedTime, selectedNanogram, puzzle };
  localStorage.setItem('last-game', JSON.stringify(storageItem));
}
function continueGame() {
  let storageItem;
  if (localStorage.getItem('last-game')) {
    storageItem = JSON.parse(localStorage.getItem('last-game'));
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
          cells[i][j].firstChild.style.backgroundColor = 'black';
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
