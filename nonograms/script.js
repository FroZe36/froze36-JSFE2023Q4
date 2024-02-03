const gameContainer = document.createElement('table');
gameContainer.className = 'game-container';
document.body.append(gameContainer);

const defaultSize = 5;
const winMessage = 'Great! You have solved the nonogram!';

let size = defaultSize;
size = 5;
const nanogramsFiveXFive = [
  {
    name: 'Umbrella',
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
    solution: [
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
    ],
  },
  ,
  {
    name: 'X',
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
    solution: [
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
    ],
  },
];

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
const puzzle = generatePuzzle(size);
const clues = generateClues(nanogramsFiveXFive[0].solution);

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
function toggleCell(cell, row, col) {
  if (puzzle[row][col] === 1) {
    cell.firstChild.style.backgroundColor = 'white';
    puzzle[row][col] = 0;
  } else {
    cell.firstChild.style.backgroundColor = 'black';
    puzzle[row][col] = 1;
  }
  checkWin(nanogramsFiveXFive[0].solution, puzzle);
}
function renderTable() {
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
      el.addEventListener('click', () => toggleCell(el, i, j));
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
}
renderTable();

function checkNanogram(solution, puzzle) {
  return puzzle.every((row, i) => {
    return row.every((value, j) => value === solution[i][j]);
  });
}
function checkWin(solution, puzzle) {
  if (checkNanogram(solution, puzzle)) {
    alert(winMessage);
  }
}
