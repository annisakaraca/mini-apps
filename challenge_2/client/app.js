// model
var flattenedJSONArray;

// view
$(document).ready(function(){
  console.log('window ready');
  $('#submit-btn').on("click", function(event){
    event.preventDefault();
    clickHandler();
  });
  $('#filter').on("keyup", function(event){
    filterRows($('#filter').val());
  })
})

var renderResult = function(resultArray){
  $('#generated-report').empty();
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
    success: function(result) {
      flattenedJSONArray = result;
      renderResult(result);
    },
    contentType: "application/json",
    dataType: "json"
  });
}

var filterRows = function(filterString) {
  if (filterString !== '') {
    var newArray = JSON.parse(JSON.stringify(flattenedJSONArray));
    var indicesToSplice = [];
    newArray.forEach(function(object, index) {
      var keys = Object.keys(object);
      keys.forEach(function(key){
        var value = object[key];
        value = String(value);
        console.log('filter string', filterString)
          if (value.includes(filterString)){
            console.log('found Match!')
            indicesToSplice.push(index);
          }
      })
    });
    console.log('splice index', indicesToSplice);
    for (var x = indicesToSplice.length - 1; x >= 0; x--) {
      newArray.splice(indicesToSplice[x], 1);
    }
    console.log('originalData', flattenedJSONArray);
    console.log('newArray', newArray);
    renderResult(newArray);
  } else {
    renderResult(flattenedJSONArray);
  }
}

