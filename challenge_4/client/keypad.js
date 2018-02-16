const KeyPadNumber = require('./keypadNumber')

var React = require('react');



function Keypad(props) {
  return (
    <div>
      {props.valid.map(function(index){
        return <div><KeyPadNumber enabled={true} bowl={props.bowl} number={index} /></div>
      })}
      {props.invalid.map(function(index){
        return <div><KeyPadNumber enabled={false} bowl={props.bowl} number={index} /></div>
      })}
      {/* <KeyPadNumber bowl={props.bowl} number={1} />
      <KeyPadNumber bowl={props.bowl} number={2} />
      <KeyPadNumber bowl={props.bowl} number={3} /><br/>
      <KeyPadNumber bowl={props.bowl} number={4} />
      <KeyPadNumber bowl={props.bowl} number={5} />
      <KeyPadNumber bowl={props.bowl} number={6} /><br/>
      <KeyPadNumber bowl={props.bowl} number={7} />
      <KeyPadNumber bowl={props.bowl} number={8} />
      <KeyPadNumber bowl={props.bowl} number={9} /><br/>
      <KeyPadNumber bowl={props.bowl} number={10} /> */}
    </div>
  );
}

module.exports = Keypad;