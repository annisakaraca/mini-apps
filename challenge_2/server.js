const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// middleware
var myLogger = function (req, res, next) {
  console.log(req.method + ' request receieved');
  next();
  } ;

app.use(express.static('client'));
app.use(myLogger);
app.use(bodyParser.json());


app.get('/', (req, res) => res.send('hello'));
app.post('/', (req,res) => {
  console.log('body', req.body);
  // send response
  res.send('got post')
});

app.listen(3000, () => console.log('CSV report app listening on port 3000!'));

