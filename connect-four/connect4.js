/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // Use nested loop to add the right amount of rows and columns
  // Use Array(HEIGHT).keys() to convert the HEIGHT / WIDTH into iterables
  for (let x of Array(HEIGHT).keys()) {
    // Simply add the row here
    board.push([]);
    for (let y of Array(WIDTH).keys()) {
      // Then add in as many columns as needed to that row
      board[x].push(null);
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // Get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");

  // Create a table row saved in top variable
  const top = document.createElement("tr");
  // Make it's ID column-top and add a click event listener
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // Loop through all columns
  for (let x = 0; x < WIDTH; x++) {
    // Add the head cells to the previously created top table row
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  // Append all this to the board element
  htmlBoard.append(top);

  // Loop through the whole table with a nested loop
  for (let y = 0; y < HEIGHT; y++) {
    // Create table row element
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      // For each element in the board / table create a cell
      const cell = document.createElement("td");
      // Set it's id attribute to be it's y-x position in the table
      cell.setAttribute("id", `${y}-${x}`);
      // Append it to the row
      row.append(cell);
    }
    // Append the whole row to the table then move to the next row
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // Loop through and see if there is any html in the element
  // If not, that means there is no piece there so return that value
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (document.getElementById(`${y}-${x}`).innerHTML === "") return y;
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // Create div element
  const piece = document.createElement("div");
  // Add the classes to it
  piece.classList.add("piece");
  piece.classList.add("p" + currPlayer);
  // Find the spot it goes to
  const place = document.getElementById(`${y}-${x}`);
  // Append the div there
  place.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // Pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // Update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // Check if all cells in board are filled; if so call, call endGame
  if (
    board.every(function (row) {
      return row.every((col) => col !== null);
    })
  )
    endGame("Game over! Tie game!");

  // Switch currPlayer 1 <-> 2
  currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // Loop through the whole board
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      // Check the value, and values 3 to the right
      // For example it would pick all values marked in X
      //   [1, 1, 1, 1, 1],
      //   [2, X, X, X, X],
      //   [3, 3, 3, 3, 3],
      //   [4, 4, 4, 4, 4],
      //   [5, 5, 5, 5, 5],
      // ]
      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      // These all work the same, just changing which values are added to the array
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      let diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
