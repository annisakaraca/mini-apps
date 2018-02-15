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
      } else if (updatedCurrentFrame[0] === 10) {
        updatedScoresByMove.push('X');
      } else if (updatedCurrentFrame[0] + updatedCurrentFrame[1] === 10) {
        updatedScoresByMove.push('/');
      } 
      console.log('updated state', updatedScoresByMove);
      this.setState({scoresByMove: updatedScoresByMove}, () => {
        // calculate new score from scratch
        var newScore = 0;
        console.log('current state', this.state.scoresByMove);
        for (var x = 0; x < this.state.scoresByMove.length; x++) {
          if (this.state.scoresByMove[x] !== 'X' && this.state.scoresByMove[x] !== '/') {
            newScore += this.state.scoresByMove[x];
          } else if (this.state.scoresByMove[x] === '/') {
            // check if updatedScoresByMove 
            if (this.state.scoresByMove[x+1]) {
              // replace '/' in scoresByMove
              var scoresByMoveCopy = this.state.scoresByMove.slice();
              var replaceSplitScore = 10 + this.state.moveHistory[x+1][0];
              scoresByMoveCopy[x] = replaceSplitScore;
              console.log('scoresByMoveCopy', scoresByMoveCopy);
              this.setState({scoresByMove: scoresByMoveCopy}, () => (console.log('cb', this.state.scoresByMove)));
              newScore += (10 + this.state.moveHistory[x + 1][0]);
            } else {
              newScore = 'cannot calculate yet';
            }
          } else if (updatedScoresByMove[x] === 'X') {
              if (this.state.scoresByMove[x+1]) {
                // replace '/' in scoresByMove
                var scoresByMoveCopy = this.state.scoresByMove.slice();
                var replaceStrikeScore = 10 + this.state.moveHistory[x+1][0] + this.state.moveHistory[x+1][1];
                console.log('replaceStrikeScore', replaceStrikeScore);
                scoresByMoveCopy[x] = replaceStrikeScore;
                console.log('scoresByMoveCopy', scoresByMoveCopy);
                this.setState({scoresByMove: scoresByMoveCopy}, () => (console.log('cb', this.state.scoresByMove)));
                newScore += (10 + this.state.moveHistory[x + 1][0] + this.state.moveHistory[x + 1][1]);
              } else {
                newScore = 'cannot calculate yet';
              }
          }
        }

      this.setState({score: newScore});
      });        




      updatedCurrentFrame = [];
    }


    // set state of currentFrame
    this.setState({currentFrame: updatedCurrentFrame});
  }



  render() {
    return(
      <Keypad bowl={this.bowl.bind(this)}/>
    )
  }
}

module.exports = Game;