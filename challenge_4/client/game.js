var React = require('react');
var Keypad = require('./keypad')

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      scoresByMove: [],
      moveHistory: []
    }
  }

  bowl(number) {
    console.log('clicked!')
    var newMoveHistory = this.state.moveHistory.slice();
    newMoveHistory.push(number);
    this.setState({moveHistory: newMoveHistory});
  }



  render() {
    return(
      <Keypad bowl={this.bowl.bind(this)}/>
    )
  }
}

module.exports = Game;