//========================================
// UTILITIES
//========================================

// VARIABLES FOR ROWS AND COLUMNS
let rows = 50;
let cols = 50;

// VARIABLE TO TALLY SCORE
let scoreDisplay = document.getElementById("score");
let score = 0;

// CREATE GRID
// append div row elements and append columns to div rows
function createGrid(numRows, numCols) {
  let grid = document.getElementById("grid");
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

// CREATE VARIABLES
// track the current coordinates of the snake head
// increment and decrement to "move" the snake
let currentRow = randoNumGen(rows);
let currentCol = randoNumGen(cols);
// current row and current col for element retrieval
let cC;
// snake location / length array
let snakeArr =[];

// ADD SNAKE CLASS to current grid space
function addSnakeClass() {
  // just .class will not work, and must include space before the className so it doesn't interfere with the other class names
  cC = getElement(currentRow, currentCol)
  cC.className += " snake";
}
addSnakeClass();

// TOGGLE SNAKE CLASS
// adds or removes snake class to "move" snake head around the board
function toggleSnakeClass(currentColumn) {
  cC.classList.toggle("snake");
}

// ADD EVENT LISTENERS TO ARROW KEYS
// Add event listeners to the arrow keys. These keys will move snakey. When someone hits the “left” arrow key, you want the current location of snakey to decrease by one column:
document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;
  let currentElement = getElement(currentRow, currentCol);
  if (e.keyCode == '38') {
    // up arrow, decrease by one row
    currentRow -= 1;
    // check whether currentElement has the class of bug
    if (currentElement.classList[2] === "bug") {
      currentElement.classList.remove("bug");
      score += 1;
      triggerBug();
      // make snake grow by 1
    }
  } else if (e.keyCode == '40') {
    // down arrow, increase by one row
    currentRow += 1;
    if (currentElement.classList[2] === "bug") {
      currentElement.classList.remove("bug");
      score += 1;
      triggerBug();
      // make snake grow by 1
    }
  } else if (e.keyCode == '37') {
    // left arrow, decrease by one col
    currentCol -= 1;
    if (currentElement.classList[2] === "bug") {
      currentElement.classList.remove("bug");
      score += 1;
      triggerBug();
      // make snake grow by 1
    }
  } else if (e.keyCode == '39') {
    // right arrow, increase by one col
    currentCol += 1;
    if (currentElement.classList[2] === "bug") {
      currentElement.classList.remove("bug");
      score += 1;
      triggerBug();
      // make snake grow by 1
    }
  }
  scoreDisplay.innerHTML = score;
  toggleSnakeClass(cC);
  addSnakeClass();
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
  // adds or removes bug class to make bug appear in diff places around the board
  bugEl.classList.toggle("bug");
  // sets timeout for bug to appear after 3 seconds, instead of the other way around
  setTimeout(function(){
    bugEl.classList.toggle("bug");
  }, 10000);
}
triggerBug();
