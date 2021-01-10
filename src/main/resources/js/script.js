var canvas;
var label;
var fps = 30;
var objects = [];
var iProgress = 0, jProgress = 0, i, j;

const algorithms = {
		BUBBLESORT: "Bubble Sort",
		LINEARSEARCH: "Linear Search",
}

const types = {
	SORT: 0,
	SEARCH: 1,
}

const speeds = {
  SLOW: 1000,
  NORMAL: 500,
  FAST: 250,
  SUPERSONIC: 100,
}

var speed = speeds.NORMAL;
var type = types.SORT;
var algorithm = algorithms.BUBBLESORT;
var isRunning = false;

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

$(document).ready(function()
{
  $("#navbar-brand").click(function(e) {
    e.preventDefault();
  });

  $("#sorting-dropdown").click(function(e) {
    e.preventDefault();
  });

	$("#search-dropdown").click(function(e) {
    e.preventDefault();
  });

	$("#linear-search").click(function(e) {
    e.preventDefault();
		type = types.SEARCH;
    algorithm = algorithms.LINEARSEARCH;
    init();
  });

  $("#bubble-sort").click(function(e) {
    e.preventDefault();
		type = types.SORT;
    algorithm = algorithms.BUBBLESORT;
    init();
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
    objects.length = 0;
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

  switch (type)
	{
		case types.SORT: sortInit();
		break;
		case types.SEARCH: searchInit();
		break;
	}
}

function searchInit()
{
	for (var k = 10; k <= canvas.width; k+=80)
  {
		var box = canvas.display.rectangle({
			x: k,
			y: (canvas.height/2)-50,
			width: 60,
			height: 100,
			fill: "rgba(0, 0, 0, 0.1)",
			stroke: "inside 5px rgba(51, 51, 51, 1)"
		});
    canvas.addChild(box);

		var number = Math.floor(Math.random()*100);
		var text = canvas.display.text({
			x: k+box.width/2,
			y: box.y+(box.height/2)-15,
			origin: { x: "center", y: "top" },
			font: "bold 30px sans-serif",
			text: number,
			fill: "#333"
		});
		canvas.addChild(text);
    objects.push(number);
  }
}

function sortInit()
{
	for (var k = 50; k <= canvas.width-50; k+=50)
  {
    var line = canvas.display.line({
    	start: { x: k, y: Math.random()*(canvas.height-150)+100 },
    	end: { x: k, y: canvas.height },
    	stroke: "25px #333",
    	cap: "round"
    });
    canvas.addChild(line);
    objects.push(line);
  }
}

function start()
{
  switch (algorithm)
  {
    case algorithms.BUBBLESORT: bubbleSort();
    break;
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
  var n = objects.length;

  if (i >= n-1 && j >= n-i-1)
  {
    init();
  }

  running();

  for (i = iProgress; i < n-1; i++) {
    for (j = jProgress; j < n-i-1; j++)
    {
      objects[j].stroke = "25px #28a745";
      canvas.redraw();
      await sleep(speed);

      if (isRunning === false) {
        return;
      }

      if (objects[j].length > objects[j+1].length)
      {
        moveForward(j);
      }
      else
      {
        objects[j].stroke = "25px #333";
        objects[j+1].stroke = "25px #28a745";
        canvas.redraw();
      }
      objects[j].stroke = "25px #333";
      canvas.redraw();
    }
    jProgress = 0;
    await sleep(speed);
  }
  objects[j-1].stroke = "25px #28a745";
  canvas.redraw();
  iProgress = 0;
  stop();
}

function moveForward (j)
{
  objects[j].x += 50;

  objects[j+1].x -= 50;

  var temp = objects[j];
  objects[j] = objects[j+1];
  objects[j+1] = temp;

  canvas.redraw();
}
