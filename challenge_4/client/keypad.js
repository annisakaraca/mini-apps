const KeyPadNumber = require('./keypadNumber')

var React = require('react');


function Keypad(props) {
  return (
    <div>
      <KeyPadNumber number={0} /><br/>
      <KeyPadNumber number={1} />
      <KeyPadNumber number={2} />
      <KeyPadNumber number={3} /><br/>
      <KeyPadNumber number={4} />
      <KeyPadNumber number={5} />
      <KeyPadNumber number={6} /><br/>
      <KeyPadNumber number={7} />
      <KeyPadNumber number={8} />
      <KeyPadNumber number={9} /><br/>
      <KeyPadNumber number={10} />
    </div>
  );
}

module.exports = Keypad;