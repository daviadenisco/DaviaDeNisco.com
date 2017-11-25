
// create variable for row div class so we can increase that variable and name for each div row so it properly labels each row we want to add
// add columns to each row div
// append div row elements and add columns

let rows = 50;
let cols = 50;
function createGrid(numRows, numCols) {
  let grid = document.getElementById("grid");

  // i is the row
  for(let i = 0; i < numRows; i++) {
    // creates the div for the new row
    let newRow = document.createElement("div");
    // sets newRow className to row r"i"
    newRow.className = "row " + "r" + i.toString()

    // j is the column
    for(let j = 0; j < numCols; j++) {
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

function startingPoint(max) {
  return Math.floor(Math.random() * max);
}
// the getRandom function runs only upon a page reload
// currentRow and currentCol
let currentRow = startingPoint(rows);
let currentCol = startingPoint(cols);
let cC;
let cR;

function drawSnake() {
  let rowSelector = '.r' + currentRow.toString();
  cR = document.querySelector(rowSelector);
  // class .col within each row will have only one col with the random num in the class
  cC = document.querySelector(rowSelector + ' .c' + currentCol.toString())
  // just .class will not work, and must include space before the className so it doesn't interfere with the other class names
  cC.className += " snake";
}
drawSnake();

function toggleSnakeClass(currentColumn) {
  cC.classList.toggle("snake");
  // cR.classList.toggle("snake");
}

// Add event listeners to the arrow keys. These keys will move snakey. When someone hits the “left” arrow key, you want the current location of snakey to decrease by one column:
document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == '38') {
    // up arrow, decrease by one row
    currentRow -= 1;
  }
  else if (e.keyCode == '40') {
    // down arrow, increase by one row
    currentRow += 1;
  }
  else if (e.keyCode == '37') {
   // left arrow, decrease by one col
   currentCol -= 1;
  }
  else if (e.keyCode == '39') {
   // right arrow, increase by one col
   currentCol += 1;
  }
  toggleSnakeClass(cC);
  drawSnake();
}

// function addSpider(currentRow, currentCol) {
//   let spiderRow = '.sp' + currentRow.toString();
//   let rSr = document.querySelector(rowSelector);
//   let rSc = document.querySelector(rowSelector + '.sp' + currentCol.toString())
//   // if grid !includes #spider && currentRow && currentCol !include .snake
//   // add addSpider
//   // else
//   // addSpider(currentRow, currentCol);
//   rSc.background = "spider.jpg";
// }
// addSpider(currentRow, currentCol);
