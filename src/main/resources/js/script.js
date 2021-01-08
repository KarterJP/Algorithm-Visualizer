var canvas;
var fps = 30;
var speed = 500;
var lines = [];
var label;
var iProgress = 0, jProgress = 0, i, j;

const algorithms = {
  SORTING: {
		BUBBLESORT: "Bubble Sort",
		QUICKSORT: "QuickSort",
	},
}

const speeds = {
  SLOW: 1000,
  NORMAL: 500,
  FAST: 250,
  SUPERSONIC: 100,
}

var algorithm = algorithms.SORTING.BUBBLESORT;
var isRunning = false;

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

$(document).ready(function()
{
  $("#sorting-dropdown").click(function(e) {
    e.preventDefault();
  });

  $("#bubble-sort").click(function(e) {
    e.preventDefault();
    init();
    type = "sorting";
    algorithm = algorithms.SORTING.BUBBLESORT;
  });

  $("#speed").change(function(e) {
    e.preventDefault();
    var newSpeed;
    switch (this.value)
    {
      case "slow": newSpeed = speeds.SLOW;
      break;
      case "normal": newSpeed = speeds.NORMAL;
      break;
      case "fast": newSpeed = speeds.FAST;
      break;
      case "supersonic": newSpeed = speeds.SUPERSONIC;
      break;
    }
    speed = newSpeed;
  });
});

oCanvas.domReady(function() {
  init();
});

function init() {
  stop();
  resetProgress();
  if (canvas != null)
  {
    canvas.destroy();
    lines.length = 0;
  }

  canvas = oCanvas.create({
    canvas: "#canvas",
    background: "#EDF5E1",
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

  for (var k = 49; k < canvas.width-49; k+=50)
  {
    var line = canvas.display.line({
    	start: { x: k, y: Math.random()*(canvas.height-150)+100 },
    	end: { x: k, y: canvas.height },
    	stroke: "25px #333",
    	cap: "round"
    });
    canvas.addChild(line);
    lines.push(line);
  }
}

function start()
{
  if (algorithm === algorithms.SORTING.BUBBLESORT)
  {
    bubbleSort();
  }
}

function running()
{
  isRunning = true;
  $("#start").prop("disabled", true);
}

function stop()
{
  iProgress = i;
  jProgress = j;
  isRunning = false;
  $("#start").prop("disabled", false);
}

function resetProgress()
{
  iProgress = 0;
  jProgress = 0;
  i = 0;
  j = 0;
}

async function bubbleSort ()
{
  running();
  var n = lines.length;

  if (i >= n-1 && j >= n-i-1)
  {
    init();
  }

  for (i = iProgress; i < n-1; i++) {
    for (j = jProgress; j < n-i-1; j++)
    {
      lines[j].stroke = "25px #28a745";
      canvas.redraw();
      await sleep(speed);

      if (isRunning === false) {
        return;
      }

      if (lines[j].length > lines[j+1].length)
      {
        moveForward(j);
      }
      else
      {
        lines[j].stroke = "25px #333";
        lines[j+1].stroke = "25px #28a745";
        canvas.redraw();
      }
      lines[j].stroke = "25px #333";
      canvas.redraw();
    }
    jProgress = 0;
    await sleep(speed);
  }
  iProgress = 0;
  stop();
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
