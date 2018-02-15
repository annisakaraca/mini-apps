var React = require('react');

var keyPadNumber = function(props) {
  return (
    <button onClick={() => {props.bowl(props.number)}}>{props.number}</button>
  )
}

module.exports = keyPadNumber;