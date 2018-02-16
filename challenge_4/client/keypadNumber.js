var React = require('react');

var keyPadNumber = function(props) {
  if (props.enabled) {
    return (
      <button style={{
        width: '30px',
        height: '30px'
      }} id={props.number} onClick={() => {props.bowl(props.number)}}>{props.number}</button>
    )
  } else {
    return (
      <button style={{
        width: '30px',
        height: '30px'
      }} disabled id={props.number} onClick={() => {props.bowl(props.number)}}>{props.number}</button>
    )
  }

}

module.exports = keyPadNumber;