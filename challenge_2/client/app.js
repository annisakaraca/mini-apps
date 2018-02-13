// model

// view
$(document).ready(function(){
  console.log('window ready');
  $('#submit-btn').on("click", clickHandler);
})

var renderResult = function(resultArray){
  console.log('resultArray', resultArray);
  var resultString = resultArray.join('<br>');
  $('#generated-report').append('<p>'+resultString+'</p>');
}

// controller

var clickHandler = function(){
  console.log('clicked submit!');
  var input = JSON.parse($("input").val());
  input = JSON.stringify(input);
  $.ajax({
    type: "POST",
    url: '/',
    data: input,
    success: function(result) {renderResult(result);},
    contentType: "application/json",
    dataType: "json"
  });
}

