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
  console.log(flattenedJSON);
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
  var output = [
    ['firstName', 'lastName', 'county', 'city', 'role', 'sales']
  ];

  employeeList.forEach(function(employee) {
    var employeeArray = [];
    employeeArray.push(employee.firstName);
    employeeArray.push(employee.lastName);
    employeeArray.push(employee.county);
    employeeArray.push(employee.city);
    employeeArray.push(employee.role);
    employeeArray.push(employee.sales);

    output.push(employeeArray);
  });
  return output;
};
