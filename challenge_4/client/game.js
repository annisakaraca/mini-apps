var React = require('react');
var Keypad = require('./keypad');
var Scoreboard = require('./scoreboard');
var MoveHistory = require('./moveHistory');


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      currentFrame: [],
      scoresByMove: [],
      moveHistory: [],
      validButtons: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      invalidButtons: [],
      gameMessage: ''
    }
  }

  bowl(number) {

    // update current frame
    var updatedCurrentFrame = this.state.currentFrame.slice();
    updatedCurrentFrame.push(number);

    // update valid buttons
    var updatedValidButtons = [];
    var updatedinValidButtons = [];
    var largestBtn = 10 - number;
    for (var a = 0; a <= largestBtn; a++) {
      updatedValidButtons.push(a);
    }
    for (var b = largestBtn + 1; b <= 10; b++) {
      updatedinValidButtons.push(b);
    }

    // if person gets a strike on the first move, fill in second move
    if (updatedCurrentFrame.length === 1 && updatedCurrentFrame[0] === 10) {
      updatedCurrentFrame.push(0);
    }

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
      this.setState({scoresByMove: updatedScoresByMove}, () => {
        // calculate new score from scratch
        var newScore = 0;
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
              this.setState({scoresByMove: scoresByMoveCopy});
              newScore += (10 + this.state.moveHistory[x + 1][0]);
            } else {
              newScore = 'cannot calculate yet';
            }
          } else if (updatedScoresByMove[x] === 'X') {
              if (this.state.scoresByMove[x+1] || this.state.scoresByMove[x+1] === 0) {
                // replace 'X' in scoresByMove
                var scoresByMoveCopy = scoresByMoveCopy || this.state.scoresByMove.slice();
                // check if next turn was a strike as well
                if (this.state.moveHistory[x+1][0] === 10) {
                  console.log('wow 2 strikes in a row!')
                  // check if next two turns have been completed
                  if (scoresByMoveCopy[x+2] || scoresByMoveCopy[x+2] === 0){
                    var replaceStrikeScore = 10 + this.state.moveHistory[x+1][0] + this.state.moveHistory[x+2][0];
                    scoresByMoveCopy[x] = replaceStrikeScore;
                    this.setState({scoresByMove: scoresByMoveCopy});
                    newScore += (10 + this.state.moveHistory[x + 1][0] + this.state.moveHistory[x + 1][1]);  
                  } else {
                    console.log('check back later!')
                    newScore = 'cannot calculate yet';
                  }
                } else {
                  var replaceStrikeScore = 10 + this.state.moveHistory[x+1][0] + this.state.moveHistory[x+1][1];
                  scoresByMoveCopy[x] = replaceStrikeScore;
                  this.setState({scoresByMove: scoresByMoveCopy});
                  newScore += (10 + this.state.moveHistory[x + 1][0] + this.state.moveHistory[x + 1][1]);
                }
              } else {
                newScore = 'cannot calculate yet';
                break;
              }
          }
        }
      this.setState({score: newScore});
      });        

      updatedCurrentFrame = [];
      updatedValidButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      updatedinValidButtons = [];

      if (newMoveHistory.length === 10) {
        this.setState({gameMessage: 'game over'});
        updatedinValidButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        updatedValidButtons = [];
  
      };

    }

    // set state of currentFrame & buttons
    this.setState({currentFrame: updatedCurrentFrame});
    this.setState({validButtons: updatedValidButtons});
    this.setState({invalidButtons: updatedinValidButtons});

  }

  render() {
    return(
      <div>
        <Keypad valid={this.state.validButtons} invalid={this.state.invalidButtons} bowl={this.bowl.bind(this)}/>
        <Scoreboard score={this.state.score}/>
        <MoveHistory history={this.state.moveHistory} />
        <h3>{this.state.gameMessage}</h3>
      </div>
    )
  }
}

module.exports = Game;