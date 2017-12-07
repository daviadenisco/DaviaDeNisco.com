// NEXT STEPS: see todo below
// game over screen with option to try again
// game over if hit "wall"
// game over if hit "snake"

//========================================
// UTILITIES
//========================================

// VARIABLE FOR GRID
let grid = document.getElementById("grid");

// VARIABLE FOR BODY
let body = document.getElementById("body");

// VARIABLES FOR ROWS AND COLUMNS
let rows = 50;
let cols = 50;

// VARIABLE TO TALLY SCORE
let scoreDisplay = document.getElementById("score");
let score = 0;

// CREATE VARIABLES
// track the current coordinates of the snake head
// increment and decrement to "move" the snake
let currentRow = randoNumGen(rows);
let currentCol = randoNumGen(cols);

// GET CURRENT LOCATION ELEMENT
let currentElement = getElement(currentRow, currentCol);

// CURRENT ROW AND CURRENT COL FOR ELEMENT RETRIEVAL
let cC;

// SNAKE LOCATION / LENGTH ARRAY
let snakeArr = [];

// VARIABLE TO TARGET POTENTIAL NEW POSITION
let potentialNewPosition;

// VARIABLE TO TRY AGAIN / START A NEW GAME
let resetButton = document.querySelector("#newGame");

// VARIABLE TO TRACK WHETHER BUGS EATEN
let bugEaten = false;

// CREATE GRID
// append div row elements and append columns to div rows
function createGrid(numRows, numCols) {
  // i is the row
  for (let i = 0; i < numRows; i++) {
    // creates the div for the new row
    let newRow = document.createElement("div");
    // sets newRow className to row r"i"
    newRow.className = "row " + "r" + i.toString()
    // j is the column
    for (let j = 0; j < numCols; j++) {
      // creates the div for the new row
      let newCol = document.createElement("div");
      // sets newCol classname to col c"j"
      newCol.className = "col " + "c" + j.toString();
      // appends columns to the newRows
      newRow.appendChild(newCol);
    }
    // appends newRows to the grid
    grid.appendChild(newRow);
  }
}
createGrid(rows, cols);

// GET ANY ELEMENT ON THE GRID
function getElement(rowNum, colNum) {
  // creates a rowSelector and numbers the rows but numbers need to be strings and can't be just a number string so we have to add the .r and the .c, so we'll get row nums like .r37
  let rowSelector = '.r' + rowNum.toString();
  // class .col within each row will have only one col with the random num in the class
  // must include space before the .c so it won't look like .r37.c32
  return document.querySelector(rowSelector + ' .c' + colNum.toString())
}

// GENERATE RANDOM NUM
function randoNumGen(amt) {
  return Math.floor(Math.random() * amt);
}

//========================================
// SNAKE STUFF
//========================================

// SETS VARIABLE EQUAL TO A RANDOM CELL
cC = getElement(currentRow, currentCol)
// ADD SNAKE CLASS TO THE RANDOM CELL
cC.classList.add("snake");
// PUSH THAT LOCATION TO snakeArr
snakeArr.push(cC);

// MOVE AND / OR GROW SNAKE
function moveSnake(row, col) {
  let newSnakeHead = getElement(row, col)
  console.log(row)
  newSnakeHead.classList.add("snake");
  if (bugEaten === false) {
    snakeArr.pop().classList.remove("snake");
  }
  snakeArr.unshift(newSnakeHead);
  bugEaten = false;
}

// ADD EVENT LISTENERS TO ARROW KEYS
// Add event listeners to the arrow keys. These keys will move snakey. When someone hits the “left” arrow key, you want the current location of snakey to decrease by one column:
document.onkeydown = checkKey;
let lastKeyPressed = null;

function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == '38') {
    lastKeyPressed = "up";
  } else if (e.keyCode == '40') {
    lastKeyPressed = "down";
  } else if (e.keyCode == '37') {
    lastKeyPressed = "left";
  } else if (e.keyCode == '39') {
    lastKeyPressed = "right";
  }
}

//========================================
// BUGS STUFF
//========================================

// 1. PICK RANDOM COL FROM GRID
// 2. ADD BUGS CLASS TO THAT RANDOM COL
// 3. USE setTimeout TO REMOVE THE BUGS CLASS FROM THE RANDOM COL IF IT IS STILL THERE

function triggerBug() {
  let bugRow = randoNumGen(rows);
  let bugCol = randoNumGen(cols);
  let bugEl = getElement(bugRow, bugCol);
  console.log("bugEl", bugEl);
  // adds or removes bug class to make bug appear in diff places around the board
  // HOW CAN I EFFICIENTLY GOOGLE HOW TO DO THIS?
  // DO NOT LET BUGS APPEAR ON TOP OF SNAKE
  if (snakeArr.indexOf(bugEl) === -1) {
    bugEl.classList.add("bug");
    // setTimeout(function() {
    //   if (snakeArr.indexOf(bugEl === -1) {
    //     bugEl.classList.toggle("bug");
    //   })
    // }, 10000);
  }
}
triggerBug();

//========================================
// GAME LOOP
//========================================

let gameLoop = setInterval(function() {
  if (lastKeyPressed === "up") {
      // gets the element of the next potential position of the snake
      potentialNewPosition = getElement(currentRow - 1, currentCol);
      // up arrow, decrease by one row
      currentRow -= 1;
  } else if (lastKeyPressed === "down") {
      // gets the element of the next potential position of the snake
      potentialNewPosition = getElement(currentRow + 1, currentCol);
      // down arrow, increase by one row
      currentRow += 1;
  } else if (lastKeyPressed === "left") {
      // gets the element of the next potential position of the snake
      potentialNewPosition = getElement(currentRow, currentCol - 1);
      // left arrow, decrease by one col
      currentCol -= 1;
  } else if (lastKeyPressed === "right") {
      // gets the element of the next potential position of the snake
      potentialNewPosition = getElement(currentRow, currentCol + 1);
      // right arrow, increase by one col
      currentCol += 1;
  } else {
    // no key pressed yet
  }


  if (lastKeyPressed !== null) {
    // TODO: CHECK FOR GAME OVER:
    // If snake runs into a wall or itself, clearInterval(gameLoop)

    if (potentialNewPosition.classList[2] === "bug") {
      potentialNewPosition.classList.remove("bug");
      score += 1;
      triggerBug();
      bugEaten = true;
    }

    if (snakeArr.indexOf(potentialNewPosition) !== -1) {
      clearInterval(gameLoop);
      grid.innerHTML = "";
      body.classList.add("gameOver");
    }
    if (!potentialNewPosition) {
      clearInterval(gameLoop);
      grid.innerHTML = "";
      body.classList.add("gameOver");
    }
    moveSnake(currentRow, currentCol);
    scoreDisplay.innerHTML = score * 100;

    // GAME WON SCREEN
    // if (snakeArr.length > 2,498) {
    //   clearInterval(gameLoop);
    //   grid.innerHTML = "";
    //   body.classList.add("youWin");
    // }
  }

}, 100);
