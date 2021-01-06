var canvas;
var fps = 30;
var lines = [];
var label;

const algorithms = {
  SORTING: {
		BUBBLESORT: "Bubble Sort",
		QUICKSORT: "QuickSort",
	},
}

var algorithm = algorithms.SORTING.BUBBLESORT;
var isRunning = false;

$(document).ready(function()
{
  $("#sortingDropdown").click(function(e) {
    e.preventDefault();
  });

  $("#bubbleSort").click(function(e) {
    e.preventDefault();
    type = "sorting";
    algorithm = algorithms.SORTING.BUBBLESORT;
  });
});

oCanvas.domReady(function() {
  canvas = oCanvas.create({
    canvas: "#canvas",
    background: "#0cc",
    drawEachFrame: true,
    fps: fps
  });

  label = canvas.display.text({
  	x: 10,
  	y: 10,
  	origin: { x: "left", y: "top" },
  	font: "bold 30px sans-serif",
  	text: algorithm,
  	fill: "#333"
  });
  canvas.addChild(label);

  for (var i = 49; i < canvas.width-49; i+=50)
  {
    var line = canvas.display.line({
    	start: { x: i, y: Math.random()*(canvas.height-50)+100 },
    	end: { x: i, y: canvas.height },
    	stroke: "25px #333",
    	cap: "round"
    });
    canvas.addChild(line);
    lines.push(line);
  }
});

function start()
{
  if (algorithm === algorithms.SORTING.BUBBLESORT)
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
  var n = lines.length;

  for (var i = 0; i < n-1; i++) {
    for (var j = 0; j < n-i-1; j++)
    {
      if (isRunning === false) {
        return;
      }

      lines[j].stroke = "25px #0f0";
      canvas.redraw();
      await sleep(1000);

      if (lines[j].length > lines[j+1].length)
      {
        moveForward(j);
      }
      else
      {
        lines[j].stroke = "25px #333";
        lines[j+1].stroke = "25px #0f0";
        canvas.redraw();
      }
      lines[j].stroke = "25px #333";
      canvas.redraw();
    }
    await sleep(1000);
  }
  isRunning = false;
}

function moveForward (j)
{
  lines[j].x += 50;
  lines[j+1].x -= 50;

  var temp = lines[j];
  lines[j] = lines[j+1];
  lines[j+1] = temp;

  canvas.redraw();
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
