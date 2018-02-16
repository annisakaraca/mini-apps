var React = require('react');

var moveHistory = function(props){
  return (
    <div>
      <h3>Move History</h3>
      <div style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
      {props.history.map(function(move) {
        return <div style={{
          margin: '4px'
        }}>{move[0]}-{move[1]}</div>
      })}
      </div>
    </div>
  ) 
}

module.exports = moveHistory;