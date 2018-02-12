
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
  toggleCurrentPlayer();
  updateBoardView(x,y);
  moveCounter++;
  checkGameProgress();
};

var toggleCurrentPlayer = function() {
  if (currentPlayer === 'X') {
      currentPlayer = 'O';
  } else {
      currentPlayer = 'X';
  }
};

var checkGameProgress = function() {
//   var hasWinner = checkIfWinner();
  var hasWinner = false;
  if (hasWinner) {
    // render message to screen
  } else if (moveCounter === 9) {
    // render tie message to screen
    var msgElement = document.getElementById('progress');
    msgElement.innerHTML = 'Game over: TIE';
  }
}


// VIEW
var updateBoardView = function(x, y) {
  var element = document.getElementById('' + x + y);
  element.removeChild(element.childNodes[0]);
  var node = document.createTextNode(board[x][y]);
  element.appendChild(node);
  console.log(element);
};
