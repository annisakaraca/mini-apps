
// MODEL
var board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
var currentPlayer = 'X';
var moveCounter = 0;
var lastWinner;
var score = {
    X: 0,
    O: 0
};

var playerName = {
    X: 'X',
    O: 'O'
};
// var playerX = 'X';
// var playerO = 'O';

// CONTROLLER

var playMove = function(x,y) {
  renderMsg('');
  // check if move is valid
  if (board[x][y] !== 0) {
    renderMsg('invalid move');
  } else {
    // update board array
    board[x][y] = currentPlayer;
    updateBoardView(x,y);
    moveCounter++;
    checkGameProgress();
    toggleCurrentPlayer();
  }
};

var toggleCurrentPlayer = function() {
  if (currentPlayer === 'X') {
      currentPlayer = 'O';
  } else {
      currentPlayer = 'X';
  }
  renderCurrentPlayer();
};

var checkGameProgress = function() {
  var hasWinner = checkIfWinner();
//  var hasWinner = false;
  if (hasWinner) {
    // render message to screen
    renderMsg('WINNER: ' + playerName[currentPlayer]);
    lastWinner = currentPlayer;
    score[currentPlayer]++;
    //update score board
    updateScoreBoard(currentPlayer);
  } else if (moveCounter === 9) {
    // render tie message to screen
    renderMsg('Game over: TIE');
  }
};

var checkIfWinner = function() {
 
  var hasWinner = false;
  // check rows
  for (var x = 0; x < 3; x++) {
    var rowIsPopulated = ((board[x][0] !== 0) && (board[x][1] !== 0) && (board[x][2] !== 0));
    if (board[x][0] === board[x][1] && board[x][1] === board[x][2] && rowIsPopulated) {
      hasWinner = true;
      colorWinningRow(x);
    }
  }
  // check columns
  for (var x = 0; x < 3; x++) {
    var columnIsPopulated = ((board[0][x] !== 0) && (board[1][x] !== 0) && (board[2][x] !== 0));
    if (board[0][x] === board[1][x] && board[1][x] === board[2][x] && columnIsPopulated) {
      hasWinner = true;
      colorWinningColumn(x);
    }
  }
  // check 00 to 22 diagonal
  var firstDiagonalIsPopulated = ((board[0][0] !== 0) && (board[1][1] !== 0) && (board[2][2] !== 0));
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && firstDiagonalIsPopulated) {
    hasWinner = true;
    colorFirstDiagonal();
  }
  // check 20 to 02 diagonal
  var secondDiagonalIsPopulated = ((board[2][0] !== 0) && (board[1][1] !== 0) && (board[0][2] !== 0));
  if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && secondDiagonalIsPopulated) {
    hasWinner = true;
    colorSecondDiagonal();
  }

  if (hasWinner) {
      disableButtons();
  }

  return hasWinner;
};

var saveNames = function() {
  // get playerX
  playerName.X = document.getElementById('Xname').value;
  // get playerO
  playerName.O = document.getElementById('Oname').value;
  updatePlayerName('X');
  updatePlayerName('O');
  renderScoreBoardWithNames();
  renderCurrentPlayer();
}

// VIEW
var updateBoardView = function(x, y) {
  var element = document.getElementById('' + x + y);
  element.innerHTML = currentPlayer;
};

var disableButtons = function() {
  // iterate through board array
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      var element = document.getElementById(''+ x + y);
      element.setAttribute('onclick', '{}');
      }
    }
}

var resetBoard = function() {
  // reset model
  board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  // re-render buttons
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      var element = document.getElementById(''+ x + y);
      element.innerHTML = '';
      element.setAttribute('onclick', 'playMove('+x+','+y+')');
      element.style.backgroundColor = 'white';
    }
  }

  // re-set current player to X
  currentPlayer = lastWinner || currentPlayer;

  // re-set move counter
  moveCounter = 0;
};

var renderCurrentPlayer = function() {
  var element = document.getElementById('player');
  element.innerHTML = playerName[currentPlayer];
};

var updateScoreBoard = function(player) {
    var element = document.getElementById(''+player+'Score');
    element.innerHTML = playerName[player] + ': ' + score[player];
};

var renderMsg = function(string) {
    var msgElement = document.getElementById('progress');
    msgElement.innerHTML = string;
};

var colorWinningRow = function(row) {
  for (var x = 0; x < 3; x++) {
    var element = document.getElementById(''+row+x);
    element.style.backgroundColor = "green";
  }
};

var colorWinningColumn = function(column) {
    for (var x = 0; x < 3; x++) {
      var element = document.getElementById(''+x+column);
      element.style.backgroundColor = "green";
    }
  };

var colorFirstDiagonal = function() {
  document.getElementById('00').style.backgroundColor = 'green';
  document.getElementById('11').style.backgroundColor = 'green';
  document.getElementById('22').style.backgroundColor = 'green';
};

var colorSecondDiagonal = function() {
    document.getElementById('20').style.backgroundColor = 'green';
    document.getElementById('11').style.backgroundColor = 'green';
    document.getElementById('02').style.backgroundColor = 'green';
  };

var updatePlayerName = function(player) {
  var playerNode = document.getElementById('player' + player);
  var inputNode = document.getElementById(player + 'name');
  playerNode.removeChild(inputNode);
  if (player === 'X') {
    var node = document.createTextNode(playerName.X)
    playerNode.appendChild(node);
  } else {
    var node = document.createTextNode(playerName.O)
    playerNode.appendChild(node);
  }
};

var renderScoreBoardWithNames = function() {
    document.getElementById('XScore').innerHTML = playerName.X + ': ' + score.X;
    document.getElementById('OScore').innerHTML = playerName.O + ': ' + score.O;
};