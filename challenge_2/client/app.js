// model

// view
$(document).ready(function(){
  console.log('window ready');
  $('#submit-btn').on("click", function(event){
    event.preventDefault();
    clickHandler();
  });
})

var renderResult = function(resultArray){
  var resultString = resultArray.join('<br>');
  $('#generated-report').append('<h3>Generated CSV Report</h3><p>'+resultString+'</p>');
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

