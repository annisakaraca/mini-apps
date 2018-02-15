import React from 'react';
import ReactDOM from 'react-dom';

// var dropPiece = function(columnIndex) {
//   console.log('clicked!', columnIndex);
//   for (var row = 5; row >= 0; row--) {
//     console.log(boardState[row][columnIndex]);
//     if (boardState[row][columnIndex] === -1) {
//       console.log('found!');
//       boardState[row][columnIndex] = 1;
//       break;
//     }
//   }
//   console.dir(boardState);
// }

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
        <button onClick={() =>{
          console.log('inbtn', this);
          this.props.onClick(0);
          }}>0</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: this.props.state
    };
  }

  dropPiece(i) {
    console.log('inBoard', this);
    console.log('clicked!', i);
    var tempBoardState = this.state.boardState.slice();
    console.dir(tempBoardState);
    for (var row = 5; row >= 0; row--) {
      console.log(tempBoardState[row][i]);
      if (tempBoardState[row][i] === -1) {
        console.log('found!');
        tempBoardState[row][i] = 1;
        this.setState({boardState: tempBoardState});
        break;
      }
    }
    console.dir(this.boardState);
  }

  render() {
    return (
      <div>
        <ButtonRow onClick={this.dropPiece.bind(this)}/>
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
          <Board state={this.props.state}/>
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

// console.log('minimal connect four react webpack babel setup');

