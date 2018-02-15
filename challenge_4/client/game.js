var React = require('react');
var Keypad = require('./keypad')

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      currentFrame: [],
      scoresByMove: [],
      moveHistory: []
    }
  }

  bowl(number) {
    console.log('clicked!')
    // update current frame
    var updatedCurrentFrame = this.state.currentFrame.slice();
    updatedCurrentFrame.push(number);

    // if current frame has 2 after being updated -> update moveHistory
    if (updatedCurrentFrame.length === 2) {
      var newMoveHistory = this.state.moveHistory.slice();
      newMoveHistory.push(updatedCurrentFrame);
      this.setState({moveHistory: newMoveHistory});

      // update scoresByMove depending on updatedCurrentFrame
      var updatedScoresByMove = this.state.scoresByMove.slice();
      if (updatedCurrentFrame[0] + updatedCurrentFrame[1] < 10){
        updatedScoresByMove.push(updatedCurrentFrame[0] + updatedCurrentFrame[1]);
      } else if (updatedCurrentFrame[0] + updatedCurrentFrame[1] === 10) {
        updatedScoresByMove.push('/');
      } else if (updatedCurrentFrame[0] === 10) {
        updatedScoresByMove.push('X');
      }
      this.setState({scoresByMove: updatedScoresByMove});
      updatedCurrentFrame = [];
    }

    // set state of currentFrame
    this.setState({currentFrame: updatedCurrentFrame});

    // var newScoresByMove = this.state.scoresByMove.slice();
    // if (number < 10) {
    //   newScoresByMove.push(number);
    // } else {
    //   newScoresByMove.push('X');
    // }
    // this.setState({scoresByMove: newScoresByMove});

  }



  render() {
    return(
      <Keypad bowl={this.bowl.bind(this)}/>
    )
  }
}

module.exports = Game;