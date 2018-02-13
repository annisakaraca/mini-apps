// model

// view
$(document).ready(function(){
  console.log('window ready');
  $('#submit-btn').on("click", clickHandler);
})

// controller

var clickHandler = function(){
  console.log('clicked submit!');
  // make post request
  $.post("/", {text: 'test post request', hello: 'world'}, function(data, status) {
    console.log('data', data);
  });
}

