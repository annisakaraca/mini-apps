const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// middleware
var myLogger = function (req, res, next) {
  console.log(req.method + ' request receieved');
  next();
};

app.use(express.static('client'));
app.use(myLogger);
app.use(bodyParser.json({
  extended: true
}));


app.post('/', (req,res) => {
  var employeeList = traverseEmployees(req.body);
  var flattenedJSON = writeEmployees(employeeList);
  res.send(flattenedJSON);
})

app.listen(3000, () => console.log('CSV report app listening on port 3000!'));

// var allEmployees = [];

var traverseEmployees = function(node) {
  var allEmployees = [];
  var recurseOnEmployees = function(node) {
    allEmployees.push(node);
    var children = node.children;
    children.forEach(function(child) {
      recurseOnEmployees(child);
    });
  }
  recurseOnEmployees(node);
  return allEmployees;
};

var writeEmployees = function(employeeList) {
  var output = getPropertiesOfList(employeeList[0]);

  employeeList.forEach(function(employee, index) {
    var employeeArray = [index];
    output[0].forEach(function(attribute) {
      employeeArray.push(employee[attribute]);
    })

    output.push(employeeArray);
  });
  return output;
};

var getPropertiesOfList = function(object) {
  var starterArray = [Object.keys(object)];
  var index = starterArray[0].indexOf('children');
  starterArray[0].splice(index, 1);
  return starterArray;
};