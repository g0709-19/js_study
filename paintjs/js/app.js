const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d'); // will work for this context
const colors = document.getElementsByClassName('jsColor');

// pixel manipulating size
// don't give pixel modifier a size
canvas.width = 600;
canvas.height = 600;

ctx.strokeStyle = '#2C2C2C';
ctx.lineWidth = 2.5;

let painting = false;

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
}

function init()
{
    if (canvas)
    {
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mousedown', startPainting);
        canvas.addEventListener('mouseup', stopPainting);
        canvas.addEventListener('mouseleave', stopPainting);
    }

    Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));
}

init();