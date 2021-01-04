var type = null;
var algorithm = null;
var canvas;

$(document).ready(function()
{
  $("#bubbleSort").click(function(e) {
    e.preventDefault();
    bubbleSort();
  });
});

oCanvas.domReady(function() {
  canvas = oCanvas.create({
    canvas: "#canvas",
    background: "#0cc"
  });

  for (var i = 5; i < canvas.width; i+=10)
  {
    var line = canvas.display.line({
    	start: { x: i, y: 0 },
    	end: { x: i, y: Math.random()*(canvas.height-10)+10 },
    	stroke: "5px #333",
    	cap: "round"
    });
    canvas.addChild(line);
  }
});

function clearContent ()
{
  $(".content").empty();
}

function bubbleSort ()
{
  type = "sorting";
  algorithm = "Bubble Sort";
  $(".heading").html(algorithm);
}

function start()
{

}
