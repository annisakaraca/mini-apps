// MODEL
var model = {
    board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    currentPlayer: 'X',
    moveCounter: 0,
    lastWinner: undefined,
    score: {
        X: 0,
        O: 0
    },
    playerName: {
        X: 'X',
        O: 'O'
    }
};

// CONTROLLER

var controller = {
    playMove: function(x, y) {
        renderMsg('');
        // check if move is valid
        if (model.board[x][y] !== 0) {
          renderMsg('invalid move');
        } else {
          // update board array
          model.board[x][y] = model.currentPlayer;
          updateBoardView(x,y);
          model.moveCounter++;
          controller.checkGameProgress();
          controller.toggleCurrentPlayer();
        }
    },
    toggleCurrentPlayer: function() {
        if (model.currentPlayer === 'X') {
            model.currentPlayer = 'O';
        } else {
            model.currentPlayer = 'X';
        }
        renderCurrentPlayer();
      },
    checkGameProgress: function() {
        var hasWinner = controller.checkIfWinner();
      //  var hasWinner = false;
        if (hasWinner) {
          // render message to screen
          renderMsg('WINNER: ' + model.playerName[model.currentPlayer]);
          model.lastWinner = model.currentPlayer;
          model.score[model.currentPlayer]++;
          //update score board
          updateScoreBoard(model.currentPlayer);
        } else if (model.moveCounter === 9) {
          // render tie message to screen
          renderMsg('Game over: TIE');
        }
      },
    checkIfWinner: function() {
        var hasWinner = false;
        // check rows
        for (var x = 0; x < 3; x++) {
          var rowIsPopulated = ((model.board[x][0] !== 0) && (model.board[x][1] !== 0) && (model.board[x][2] !== 0));
          if (model.board[x][0] === model.board[x][1] && model.board[x][1] === model.board[x][2] && rowIsPopulated) {
            hasWinner = true;
            colorWinningRow(x);
          }
        }
        // check columns
        for (var x = 0; x < 3; x++) {
          var columnIsPopulated = ((model.board[0][x] !== 0) && (model.board[1][x] !== 0) && (model.board[2][x] !== 0));
          if (model.board[0][x] === model.board[1][x] && model.board[1][x] === model.board[2][x] && columnIsPopulated) {
            hasWinner = true;
            colorWinningColumn(x);
          }
        }
        // check 00 to 22 diagonal
        var firstDiagonalIsPopulated = ((model.board[0][0] !== 0) && (model.board[1][1] !== 0) && (model.board[2][2] !== 0));
        if (model.board[0][0] === model.board[1][1] && model.board[1][1] === model.board[2][2] && firstDiagonalIsPopulated) {
          hasWinner = true;
          colorFirstDiagonal();
        }
        // check 20 to 02 diagonal
        var secondDiagonalIsPopulated = ((model.board[2][0] !== 0) && (model.board[1][1] !== 0) && (model.board[0][2] !== 0));
        if (model.board[2][0] === model.board[1][1] && model.board[1][1] === model.board[0][2] && secondDiagonalIsPopulated) {
          hasWinner = true;
          colorSecondDiagonal();
        }
      
        if (hasWinner) {
            disableButtons();
        }
      
        return hasWinner;
    },
    saveNames: function() {
        // get playerX
        model.playerName.X = document.getElementById('Xname').value;
        // get playerO
        model.playerName.O = document.getElementById('Oname').value;
        updatePlayerName('X');
        updatePlayerName('O');
        renderScoreBoardWithNames();
        renderCurrentPlayer();
    }
};


// VIEW
var updateBoardView = function(x, y) {
  var element = document.getElementById('' + x + y);
  element.innerHTML = model.currentPlayer;
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
  model.board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  // re-render buttons
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      var element = document.getElementById(''+ x + y);
      element.innerHTML = '';
      element.setAttribute('onclick', 'controller.playMove('+x+','+y+')');
      element.style.backgroundColor = 'white';
    }
  }

  // re-set current player to X
  model.currentPlayer = model.lastWinner || model.currentPlayer;

  // re-set move counter
  model.moveCounter = 0;
};

var renderCurrentPlayer = function() {
  var element = document.getElementById('player');
  element.innerHTML = model.playerName[model.currentPlayer];
};

var updateScoreBoard = function(player) {
    var element = document.getElementById(''+player+'Score');
    element.innerHTML = model.playerName[player] + ': ' + model.score[player];
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
    var node = document.createTextNode(model.playerName.X)
    playerNode.appendChild(node);
  } else {
    var node = document.createTextNode(model.playerName.O)
    playerNode.appendChild(node);
  }
};

var renderScoreBoardWithNames = function() {
    document.getElementById('XScore').innerHTML = model.playerName.X + ': ' + model.score.X;
    document.getElementById('OScore').innerHTML = model.playerName.O + ': ' + model.score.O;
};