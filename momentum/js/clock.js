const clockContainer = document.querySelector('.js-clock'),
    clockTitle = clockContainer.querySelector('h1'); // child of clockContainer

function formatTime(num)
{
    if (num < 10)
        return `0${num}`;
    else
        return num;
}

function getTime()
{
    const date = new Date();
    const seconds = date.getSeconds(),
        minutes = date.getMinutes(),
        hours = date.getHours();
    clockTitle.innerText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`; // ` called 'back tick'
}

function init()
{
    getTime();
    setInterval(getTime, 1000);
}

init();