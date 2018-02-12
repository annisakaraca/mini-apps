
// MODEL
var board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
var currentPlayer = 'X';
console.log(board);

// CONTROLLER

var playMove = function(x,y) {
  console.log(x,y)
  // update board array
  board[x][y] = currentPlayer;
  console.log(board);
  toggleCurrentPlayer();
  updateBoardView(x,y);
};

var toggleCurrentPlayer = function() {
  if (currentPlayer === 'X') {
      currentPlayer = 'O';
  } else {
      currentPlayer = 'X';
  }
};


// VIEW
var updateBoardView = function(x, y) {
  var element = document.getElementById('' + x + y);
  element.removeChild(element.childNodes[0]);
  var node = document.createTextNode(board[x][y]);
  element.appendChild(node);
  console.log(element);
};