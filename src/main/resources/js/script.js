var type = null;
var algo = null;

$(document).ready(function()
{
  $("#bubbleSort").click(function(e) {
    e.preventDefault();
    doBubbleSort();
  });
});

function clearContent ()
{
  $("#content").empty();
}

function doBubbleSort ()
{
  clearContent();
  type = "sorting";
  algo = "bubbleSort";
  $("#content").html("<h1 class='heading'>Bubble Sort</h1>");
}
