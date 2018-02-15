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
  render() {
    return (
      <td className="square">
        <div>{this.props.value}</div>
      </td>
    );
  }
}

class Row extends React.Component {
  renderSquare(i) {
    return <Square value={i}/>;
  }

  render() {
    return (
      <tr className="board-row">
        {this.renderSquare(this.props.state[0])}
        {this.renderSquare(this.props.state[1])}
        {this.renderSquare(this.props.state[2])}
        {this.renderSquare(this.props.state[3])}
        {this.renderSquare(this.props.state[4])}
        {this.renderSquare(this.props.state[5])}
        {this.renderSquare(this.props.state[6])}
      </tr>
    );
  }
}

class ButtonRow extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() =>{this.props.onClick(0)}}>0</button>
        <button onClick={() =>{this.props.onClick(1)}}>1</button>
        <button onClick={() =>{this.props.onClick(2)}}>2</button>
        <button onClick={() =>{this.props.onClick(3)}}>3</button>
        <button onClick={() =>{this.props.onClick(4)}}>4</button>
        <button onClick={() =>{this.props.onClick(5)}}>5</button>
        <button onClick={() =>{this.props.onClick(6)}}>6</button>
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: this.props.state,
      player: this.props.player
    };
  }

  togglePlayer(player) {
    if (player === 1) {
      return 2;
    } if (player === 2) {
      return 1;
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
        console.log('found winner!')
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
        console.log('found winner!')
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
        console.log('found winner!')
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

    console.log(originRowIndex, originColumnIndex);

    for (var x = 0; x < 3; x++) {
      var a = this.state.boardState[originRowIndex][originColumnIndex];
      var b = this.state.boardState[originRowIndex - 1][originColumnIndex - 1];
      var c = this.state.boardState[originRowIndex - 2][originColumnIndex - 2];
      var d = this.state.boardState[originRowIndex - 3][originColumnIndex - 3];

      if (((player === a) && (a === b) && (b === c) && (c === d))) {
        console.log('found winner!')
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
        this.setState({player: nextPlayer})
        break;
      }
    }
  }

  render() {
    return (
      <div>
        <ButtonRow togglePlayer={this.togglePlayer} onClick={this.dropPiece.bind(this)}/>
        <table>
          <tbody>
            
            <Row state={this.props.state[0]}/>
            <Row state={this.props.state[1]}/>
            <Row state={this.props.state[2]}/>
            <Row state={this.props.state[3]}/>
            <Row state={this.props.state[4]}/>
            <Row state={this.props.state[5]}/>
          </tbody>
        </table>
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




module.hot.accept();


