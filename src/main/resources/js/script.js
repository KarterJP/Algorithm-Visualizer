var type = null;
var algorithm = null;
var fps = 3;
var canvas;
var isRunning = false;

$(document).ready(function()
{
  $("#bubbleSort").click(function(e) {
    e.preventDefault();
    type = "sorting";
    algorithm = 0;
    $(".heading").html("Bubble Sort");
  });
});

oCanvas.domReady(function() {
  canvas = oCanvas.create({
    canvas: "#canvas",
    background: "#0cc",
    drawEachFrame: false,
    fps: fps
  });

  for (var i = 49; i < canvas.width-49; i+=50)
  {
    var line = canvas.display.line({
    	start: { x: i, y: Math.random()*(canvas.height-50)+25 },
    	end: { x: i, y: canvas.height },
    	stroke: "25px #333",
    	cap: "round"
    });
    canvas.addChild(line);
  }
});

function start()
{
  if (algorithm == 0)
  {
    bubbleSort();
  }
}

function stop()
{
  isRunning = false;
}

async function bubbleSort ()
{
  isRunning = true;
  var n = canvas.children.length;

  for (var i = 0; i < n-1; i++) {
    for (var j = 0; j < n-i-1; j++)
    {
      if (isRunning === false) {
        return;
      }

      canvas.children[j].stroke = "25px #0f0";

      if (canvas.children[j].length > canvas.children[j+1].length)
      {
        moveForward(j);
      }
      await sleep(1000);
      canvas.children[j].stroke = "25px #333";    }
  }
  isRunning = false;
}

function moveForward (j)
{
  canvas.children[j].x += 50;
  canvas.children[j+1].x -= 50;

  var temp = canvas.children[j];
  canvas.children[j] = canvas.children[j+1];
  canvas.children[j+1] = temp;

  canvas.redraw();
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
