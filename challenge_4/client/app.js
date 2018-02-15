import React from 'react';
import ReactDOM from 'react-dom';

const title = 'happy sad chocolate day';
const title2 = 'i wont change';

ReactDOM.render(
  <div>{title}<div id='title'></div></div>,
  document.getElementById('app')
);

ReactDOM.render(
  <div>{title2}</div>,
  document.getElementById('title')
);

module.hot.accept();