import React from 'react';
import ReactDOM from 'react-dom';

const title = 'My sad incomplete connect four react webpack babel setup';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);

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
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
        {this.renderSquare(6)}
    </tr>
    );
  }
}

class Board extends React.Component {


  render() {
    const status = 'Next player: X';

    return (
      <table>
        <tbody>
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
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
          <Board />
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
  <Game />,
  document.getElementById('app')
);




module.hot.accept();

// console.log('minimal connect four react webpack babel setup');

