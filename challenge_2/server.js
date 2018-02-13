const express = require('express');
const app = express();

// middleware
var myLogger = function (req, res, next) {
  console.log(req.method + ' request receieved');
  next();
  } ;

app.use(express.static('client'));
app.use(myLogger);


app.get('/', (req, res) => res.send('hello'));
app.post('/', (req,res) => {
  let body = [];
  req.on('data', (chunk) => {
    console.log('collecting data');
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString('utf8');
    var bodyAttributes = body.split('&');
    var bodyObj = {};
    bodyAttributes.forEach(function(attr) {
      var tuple = attr.split('=');
      var key = tuple[0];
      var value = tuple[1];
      var words = value.split('+');
      value = words.join(' ');
      bodyObj[key] = value;
    })
    console.log('body', bodyObj);
  })
  res.send('got post')
});

app.listen(3000, () => console.log('CSV report app listening on port 3000!'));

