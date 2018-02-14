import React from 'react';
import ReactDOM from 'react-dom';

// state
var boardState = [
  [[1],[-1],[-1],[-1],[-1],[-1],[-1]],
  [[-1],[2],[-1],[-1],[-1],[-1],[-1]],
  [[-1],[-1],[3],[-1],[-1],[-1],[-1]],
  [[-1],[-1],[-1],[4],[-1],[-1],[-1]],
  [[-1],[]-1,[-1],[-1],[5],[-1],[-1]],
  [[-1],[-1],[-1],[-1],[-1],[6],[-1]]
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
    console.dir(this.props.state);

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

class Board extends React.Component {

  render() {
    return (
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

