
// MODEL
var board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
var currentPlayer = 'X';
console.log(board);

// CONTROLLER

var click1a = function() {
  // update board array
  board[0][0] = currentPlayer;
  console.log(board);
  toggleCurrentPlayer();
  updateBoardView();
};

var toggleCurrentPlayer = function() {
  if (currentPlayer === 'X') {
      currentPlayer = 'O';
  } else {
      currentPlayer = 'X';
  }
};


// VIEW
var updateBoardView = function() {
  var element = document.getElementById('00');
  element.removeChild(element.childNodes[0]);
  var node = document.createTextNode(board[0][0]);
  element.appendChild(node);
  console.log(element);
};