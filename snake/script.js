// NEXT STEPS
// feed snakeArr currentElement
// make snake grow
// game over screen with option to try again
// game over if hit "wall"
// game over if hit "snake"

//========================================
// UTILITIES
//========================================

//VARIABLE FOR GRID
let grid = document.getElementById("grid");

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

// VARIABLE FOR POTENTIAL NEW POSITION CLASS LIST
// let potNewPosCL = potentialNewPosition.classList;

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
  let rowSelector = '.r' + rowNum.toString();
  // class .col within each row will have only one col with the random num in the class
  return document.querySelector(rowSelector + ' .c' + colNum.toString())
}

// GENERATE RANDOM NUM
function randoNumGen(amt) {
  return Math.floor(Math.random() * amt);
}

//========================================
// SNAKE STUFF
//========================================

// ADD SNAKE CLASS to current grid space
function addSnakeClass() {
  // just .class will not work, and must include space before the className so it doesn't interfere with the other class names
  cC = getElement(currentRow, currentCol)
  cC.classList.add("snake");
}
addSnakeClass();
snakeArr.push(cC);

// MOVE AND / OR GROW SNAKE
function moveSnake(nextElement, currentElement) {
  if (bugEaten === false) {
    snakeArr.pop().classList.remove("snake");
  }
  snakeArr.unshift(nextElement);
  bugEaten = false;
}

// ADD EVENT LISTENERS TO ARROW KEYS
// Add event listeners to the arrow keys. These keys will move snakey. When someone hits the “left” arrow key, you want the current location of snakey to decrease by one column:
document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == '38') {
    // gets the element of the next potential position of the snake
    potentialNewPosition = getElement(currentRow - 1, currentCol);
    // up arrow, decrease by one row
    currentRow -= 1;

  } else if (e.keyCode == '40') {
    // gets the element of the next potential position of the snake
    potentialNewPosition = getElement(currentRow + 1, currentCol);
    // down arrow, increase by one row
    currentRow += 1;

  } else if (e.keyCode == '37') {
    // gets the element of the next potential position of the snake
    potentialNewPosition = getElement(currentRow, currentCol - 1);
    // left arrow, decrease by one col
    currentCol -= 1;

  } else if (e.keyCode == '39') {
    // gets the element of the next potential position of the snake
    potentialNewPosition = getElement(currentRow, currentCol + 1);
    // right arrow, increase by one col
    currentCol += 1;

  }
  // adds snake class to cC
  addSnakeClass();
  if (potentialNewPosition.classList[2] === "bug") {
    potentialNewPosition.classList.remove("bug");
    score += 1;
    triggerBug();
    bugEaten = true;
  }
  // move snake and/or grow snake by 1
  moveSnake(potentialNewPosition, currentElement);
  scoreDisplay.innerHTML = score * 100;
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
  // THAT'S NESTED HOW TO DO BY THE WAY
  if (bugEl.classList[2] !== "snake") {
    bugEl.classList.add("bug");
    setTimeout(function() {
      bugEl.classList.toggle("bug");
    }, 10000);
  } else {
    bugEl = getElement(bugRow, bugCol);
  }
  // sets timeout for bug to appear after 3 seconds, instead of the other way around
}
triggerBug();

//========================================
// NEW GAME STUFF
//========================================
resetButton.addEventListener("click", function(){
  // remove current grid
  grid.innerHTML = "";
  // generate new grid
  createGrid(rows, cols);
  // reset snake class on random element
  currentRow = randoNumGen(rows);
  currentCol = randoNumGen(cols);
  // add snake class
  addSnakeClass();
  // reset bug class on random element
  triggerBug();
});
