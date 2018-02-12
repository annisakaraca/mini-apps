
// MODEL
var board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
var currentPlayer = 'X';
var moveCounter = 0;

// CONTROLLER

var playMove = function(x,y) {
  console.log(x,y)
  // update board array
  board[x][y] = currentPlayer;
  updateBoardView(x,y);
  moveCounter++;
  checkGameProgress();
  toggleCurrentPlayer();
};

var toggleCurrentPlayer = function() {
  if (currentPlayer === 'X') {
      currentPlayer = 'O';
  } else {
      currentPlayer = 'X';
  }
};

var checkGameProgress = function() {
  var msgElement = document.getElementById('progress');
  var hasWinner = checkIfWinner();
//  var hasWinner = false;
  if (hasWinner) {
    // render message to screen
    msgElement.innerHTML = 'WINNER: ' + currentPlayer;
  } else if (moveCounter === 9) {
    // render tie message to screen
    msgElement.innerHTML = 'Game over: TIE';
  }
};

var checkIfWinner = function() {
 
  var hasWinner = false;
  // check rows
  for (var x = 0; x < 3; x++) {
    var rowIsPopulated = ((board[x][0] !== 0) && (board[x][1] !== 0) && (board[x][2] !== 0));
    if (board[x][0] === board[x][1] && board[x][1] === board[x][2] && rowIsPopulated) {
      hasWinner = true;
    }
  }
  // check columns
  for (var x = 0; x < 3; x++) {
    var columnIsPopulated = ((board[0][x] !== 0) && (board[1][x] !== 0) && (board[2][x] !== 0));
    if (board[0][x] === board[1][x] && board[1][x] === board[2][x] && columnIsPopulated) {
      hasWinner = true;
    }
  }
  // check 00 to 22 diagonal
  var firstDiagonalIsPopulated = ((board[0][0] !== 0) && (board[1][1] !== 0) && (board[2][2] !== 0));
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && firstDiagonalIsPopulated) {
    hasWinner = true;
  }
  // check 20 to 02 diagonal
  var secondDiagonalIsPopulated = ((board[2][0] !== 0) && (board[1][1] !== 0) && (board[0][2] !== 0));
  if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && secondDiagonalIsPopulated) {
    hasWinner = true;
  }

  if (hasWinner) {
      disableButtons();
  }

  return hasWinner;
};


// VIEW
var updateBoardView = function(x, y) {
  var element = document.getElementById('' + x + y);
  element.removeChild(element.childNodes[0]);
  var node = document.createTextNode(board[x][y]);
  element.appendChild(node);
  console.log(element);
};

var disableButtons = function() {
  // iterate through board array
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      if (board[x][y] === 0) {
        var element = document.getElementById(''+ x + y);
        element.childNodes[0].setAttribute('disabled', true);
      }
    }
  }
    // for each position = 0, disable button
}
