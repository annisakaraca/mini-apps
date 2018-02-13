// model

// view
$(document).ready(function(){
  console.log('window ready');
  $('#submit-btn').on("click", clickHandler);
})

// controller

var clickHandler = function(){
  console.log('clicked submit!');
  var input = JSON.parse($("input").val());
  input = JSON.stringify(input);
  console.log(typeof input);
  $.ajax({
    type: "POST",
    url: '/',
    data: input,
    success: function() {console.log('successful post')},
    contentType: "application/json",
    dataType: "json"
  })
}

