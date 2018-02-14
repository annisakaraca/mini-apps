import React from 'react';
import ReactDOM from 'react-dom';

const title = 'My super awesome connect four react webpack babel setup';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);

module.hot.accept();

// console.log('minimal connect four react webpack babel setup');

