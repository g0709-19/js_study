const canvas = document.querySelector('#jsCanvas'),
    ctx = canvas.getContext('2d'); // will work for this context
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');

const INITIAL_COLOR = '#2C2C2C';
const CANVAS_SIZE = 600;

// pixel manipulating size
// don't give pixel modifier a size
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting()
{
    painting = false;
}

function startPainting()
{
    painting = true;
}

function onMouseMove(event)
{
    const y = event.offsetY;
    const x = event.offsetX;
    if (!painting)
    {
        ctx.beginPath(); // path is a line
        ctx.moveTo(x, y); // if not, the start point becomes last point of a line
    }
    else
    {
        ctx.lineTo(x, y);
        ctx.stroke(); // if not, anything shown
        // ctx.closePath();
    }
}

function onMouseDown(event)
{
    startPainting();
}

function handleColorClick(event)
{
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event)
{
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick()
{
    if (filling === true)
    {
        filling = false;
        mode.innerText = 'Fill';
    }
    else
    {
        filling = true;
        mode.innerText = 'Paint';
    }
}

function handleCanvasClick()
{
    if (filling === true)
    {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event)
{
    event.preventDefault();
}

function handleSaveClick()
{
    const image = canvas.toDataURL(); // default is png. 'image/jpeg'
    const link = document.createElement('a');
    link.href = image;
    link.download = 'PaintJS[🎨]';
    link.click();
}

function init()
{
    if (canvas)
    {
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mousedown', startPainting);
        canvas.addEventListener('mouseup', stopPainting);
        canvas.addEventListener('mouseleave', stopPainting);
        canvas.addEventListener('click', handleCanvasClick);
        canvas.addEventListener('contextmenu', handleCM);
    }

    if (colors)
    {
        Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));
    }

    if (range)
    {
        range.addEventListener('input', handleRangeChange);
    }

    if (mode)
    {
        mode.addEventListener('click', handleModeClick);
    }

    if (save)
    {
        save.addEventListener('click', handleSaveClick);
    }
}

init();