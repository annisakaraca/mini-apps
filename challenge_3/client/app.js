import React from 'react';
import ReactDOM from 'react-dom';

// state
var boardState = [
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1]
]

class Square extends React.Component {
  divStyle = {
    display:'inline-block',
    width: '50px',
    height: '50px'
  }
  
  render() {
    return (
      <div style={this.divStyle}>{this.props.value}</div>
    );
  }
}

class Row extends React.Component {
  renderSquare(i) {
    return <Square value={i}/>;
  }

  render() {
    return (
      <div className="board-row">
        {this.renderSquare(this.props.state[0])}
        {this.renderSquare(this.props.state[1])}
        {this.renderSquare(this.props.state[2])}
        {this.renderSquare(this.props.state[3])}
        {this.renderSquare(this.props.state[4])}
        {this.renderSquare(this.props.state[5])}
        {this.renderSquare(this.props.state[6])}
      </div>
    );
  }
}

class ButtonRow extends React.Component {
  buttonStyle = {
    width: '40px',
    height: '25px',
    marginLeft: '3px',
    marginRight: '3px',
    marginBottom: '10px'
  }

  render() {
    return (
      <div>
        <button style={this.buttonStyle} onClick={() =>{this.props.onClick(0)}}>0</button>
        <button style={this.buttonStyle} onClick={() =>{this.props.onClick(1)}}>1</button>
        <button style={this.buttonStyle} onClick={() =>{this.props.onClick(2)}}>2</button>
        <button style={this.buttonStyle} onClick={() =>{this.props.onClick(3)}}>3</button>
        <button style={this.buttonStyle} onClick={() =>{this.props.onClick(4)}}>4</button>
        <button style={this.buttonStyle} onClick={() =>{this.props.onClick(5)}}>5</button>
        <button style={this.buttonStyle} onClick={() =>{this.props.onClick(6)}}>6</button>
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: this.props.state,
      player: this.props.player, 
      winningMessage: ''
    };
  }

  rowStyle = {
    marginLeft: '5px'
  }

  togglePlayer(player) {
    if (player === 1) {
      return 2;
    } if (player === 2) {
      return 1;
    }
  }

  checkForTie() {
    console.log(this.state.boardState[0].indexOf(-1));
    console.log(this.state.boardState[0]);
    if (this.state.boardState[0].indexOf(-1) === -1) {
      this.setState({winningMessage: 'There is a tie!'});
    }
  }

  checkForVerticalWin(column) {
    var player = this.state.player;
    for (var row = 5; row > 2; row--) {
      var a = this.state.boardState[row][column];
      var b = this.state.boardState[row - 1][column];
      var c = this.state.boardState[row - 2][column];
      var d = this.state.boardState[row - 3][column];

      if (((player === a) && (a === b) && (b === c) && (c === d))) {
        this.setState({winningMessage: 'The winner is ' + this.state.player});
      }
    }
  }

  checkForHorizontalWin(row) {
    var player = this.state.player;
    for (var column = 0; column < 8; column++){
      var a = this.state.boardState[row][column];
      var b = this.state.boardState[row][column + 1];
      var c = this.state.boardState[row][column + 2];
      var d = this.state.boardState[row][column + 3];

      if (((player === a) && (a === b) && (b === c) && (c === d))) {
        this.setState({winningMessage: 'The winner is ' + this.state.player});

      }
    }
  }

  checkForFirstDiagonalWin(row,column) {
    var originRowIndex = row;
    var originColumnIndex = column;
    var player = this.state.player;


    while (originRowIndex !== 5) {
      originRowIndex++;
      originColumnIndex--;
    }

    for (var x = 0; x < 3; x++) {
      var a = this.state.boardState[originRowIndex][originColumnIndex];
      var b = this.state.boardState[originRowIndex - 1][originColumnIndex + 1];
      var c = this.state.boardState[originRowIndex - 2][originColumnIndex + 2];
      var d = this.state.boardState[originRowIndex - 3][originColumnIndex + 3];

      if (((player === a) && (a === b) && (b === c) && (c === d))) {
        this.setState({winningMessage: 'The winner is ' + this.state.player});
      };

      originRowIndex--;
      originColumnIndex++;
    }
  }

  checkForSecondDiagonalWin(row, column){
    var originRowIndex = row;
    var originColumnIndex = column;
    var player = this.state.player;
  
    while (originRowIndex !== 5) {
      originRowIndex++;
      originColumnIndex++;
    }

    for (var x = 0; x < 3; x++) {
      var a = this.state.boardState[originRowIndex][originColumnIndex];
      var b = this.state.boardState[originRowIndex - 1][originColumnIndex - 1];
      var c = this.state.boardState[originRowIndex - 2][originColumnIndex - 2];
      var d = this.state.boardState[originRowIndex - 3][originColumnIndex - 3];

      if (((player === a) && (a === b) && (b === c) && (c === d))) {
        this.setState({winningMessage: 'The winner is ' + this.state.player});
      };

      originRowIndex--;
      originColumnIndex--;
    }
  }

  dropPiece(i) {
    var tempBoardState = this.state.boardState.slice();
    var nextPlayer = this.togglePlayer(this.state.player);
    for (var row = 5; row >= 0; row--) {
      if (tempBoardState[row][i] === -1) {
        tempBoardState[row][i] = this.state.player;
        this.setState({boardState: tempBoardState});
        var checkVerticalHorizontalWin = this.checkForVerticalWin(i) || this.checkForHorizontalWin(row);
        this.checkForFirstDiagonalWin(row, i);
        this.checkForSecondDiagonalWin(row, i);
        if (row === 0) {
          this.checkForTie();
        }
        this.setState({player: nextPlayer})
        break;
      }
    }
  }

  render() {
    return (
      <div>
        <ButtonRow togglePlayer={this.togglePlayer} onClick={this.dropPiece.bind(this)}/>

            
            <Row style={this.rowStyle} state={this.props.state[0]}/>
            <Row style={this.rowStyle} state={this.props.state[1]}/>
            <Row style={this.rowStyle} state={this.props.state[2]}/>
            <Row style={this.rowStyle} state={this.props.state[3]}/>
            <Row style={this.rowStyle} state={this.props.state[4]}/>
            <Row style={this.rowStyle} state={this.props.state[5]}/>

        <div className="game-status">
          <h3 className="winner-message">{this.state.winningMessage}</h3>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board state={this.props.state} player={1}/>
        </div>
        <div className="game-info">
          <div></div>
          <ol></ol>
        </div>

      </div>
    );
  }
}

ReactDOM.render(
  <Game state={boardState}/>,
  document.getElementById('app')
);




// module.hot.accept();


