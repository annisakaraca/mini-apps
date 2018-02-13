// model

// view
$(document).ready(function(){
  console.log('window ready');
  $('#submit-btn').on("click", clickHandler);
})

// controller

var clickHandler = function(){
  console.log('clicked submit!');
  var input = $("input").val();
  // make post request
  $.post("/", {text: input}, function(data, status) {
    console.log('data', data);
  });
}

