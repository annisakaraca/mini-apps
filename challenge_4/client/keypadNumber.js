var React = require('react');

var keyPadNumber = function(props) {
  if (props.enabled) {
    return (
      <button id={props.number} onClick={() => {props.bowl(props.number)}}>{props.number}</button>
    )
  } else {
    return (
      <button disabled id={props.number} onClick={() => {props.bowl(props.number)}}>{props.number}</button>
    )
  }

}

module.exports = keyPadNumber;