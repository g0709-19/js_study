const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');

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
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else
    {
        console.log(x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event)
{
    startPainting();
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
}

init();