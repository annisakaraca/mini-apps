const express = require('express');
const app = express();

// middleware
var myLogger = function (req, res, next) {
    console.log(req.method + 'request receieved');
    next();
  } ;

app.use(express.static('client'));
app.use(myLogger);


app.get('/', (req, res) => res.send('hello'));

app.listen(3000, () => console.log('CSV report app listening on port 3000!'));

