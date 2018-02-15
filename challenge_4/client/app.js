import React from 'react';
import ReactDOM from 'react-dom';
 
var Game = require('./game');


ReactDOM.render(
  <Game />,
  document.getElementById('app')
);

// module.hot.accept();