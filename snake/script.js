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
  // adds or removes bug class to make bug appear in diff places around the board
  if (snakeArr.indexOf(bugEl) === -1) {
    bugEl.classList.add("bug");
    setTimeout(function() {
      if (bugEl.classList[2] === "bug") {
        bugEl.classList.remove("bug");
        triggerBug();
      }
    }, 10000);
  } else {
    triggerBug();
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
    // GAME OVER AND SCORE SAVE
    if (potentialNewPosition === null || snakeArr.indexOf(potentialNewPosition) !== -1) {
      clearInterval(gameLoop);
      grid.innerHTML = "";
      body.classList.add("gameOver");
      let highScore = window.localStorage["High Score"];
      if (!highScore) {
        window.localStorage["High Score"] = score * 100;
      } else if (score > highScore) {
        alert("New High Score!")
        window.localStorage["High Score"] = score * 100;
      }
    }
    if (potentialNewPosition.classList[2] === "bug") {
      potentialNewPosition.classList.remove("bug");
      score += 1;
      triggerBug();
      bugEaten = true;
    }
    moveSnake(currentRow, currentCol);
    scoreDisplay.innerHTML = score * 100;

    // GAME WON SCREEN
    if (snakeArr.length > (rows * cols) - 2) {
      clearInterval(gameLoop);
      grid.innerHTML = "";
      body.classList.add("youWin");
    }
  }

}, 100);

//========================================
// MOBILE-SPECIFIC CODE
//========================================
//
// RETURNS TRUE IF THE BROWSER IS ON A MOBILE OR TABLET DEVICE
// https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
function mobileAndTabletcheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

// WHEN ON MOBILE, DO AND BEHAVE LIKE THIS
if (mobileAndTabletcheck()) {
  // Third-party library for handling touch events
  // https://hammerjs.github.io/getting-started/
  var options = {
    preventDefault: true,
    dragLockToAxis: true,
    dragBlockHorizontal: true
  };
  var hammertime = new Hammer(document.body, options);
  hammertime.on("dragleft swipeleft", function(ev){
    lastKeyPressed = "left"
  });
  hammertime.on("dragright swiperight", function(ev){
    lastKeyPressed = "right"
  });
  hammertime.on('panup', function(ev) {
  	lastKeyPressed = "up"
  });
  hammertime.on('pandown', function(ev) {
  	lastKeyPressed = "down"
  });

  body.classList.add("mobile")

  // PREVENTS SCROLLING WHOLE PAGE ON MOBILE (called "scroll bounce")
  document.ontouchmove = function (e) {
    e.preventDefault();
  }
}
