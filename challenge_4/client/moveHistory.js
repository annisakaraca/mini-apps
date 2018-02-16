var React = require('react');

var moveHistory = function(props){
  return (
    <div>
      <h3>Move History</h3>
      {props.history.map(function(move) {
        return <div>{move[0]} - {move[1]}</div>
      })}
    </div>
  ) 
}

module.exports = moveHistory;