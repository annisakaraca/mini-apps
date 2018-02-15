import React from 'react';
import ReactDOM from 'react-dom';

var Keypad = require('./keypad')

ReactDOM.render(
  <Keypad />,
  document.getElementById('app')
);

// module.hot.accept();