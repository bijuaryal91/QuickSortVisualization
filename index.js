document.title="QuickSort Visualization";
document.body.style.margin="0";
document.body.style.overflow="hidden";

let values = [];
let w = 10;
let states = [];
let ctx;
let canvas;

window.onload = () => {
  setup();
};

function setup() {
  canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  values = new Array(Math.floor(canvas.width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = Math.random() * canvas.height;
    states[i] = -1;
}
  quickSort(values, 0, values.length - 1).then(() => draw());
  draw();
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1;

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end),
  ]);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}

function draw() {
  requestAnimationFrame(draw);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < values.length; i++) {
    ctx.fillStyle =
      states[i] == 0 ? "#E0777D" : states[i] == 1 ? "#6DEF0C" : "white";
    ctx.fillRect(i * w, canvas.height - values[i], w, values[i]);
  }
}

async function swap(arr, a, b) {
  await sleep(50);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
