const clockContainer = document.querySelector('.js-clock'),
    clockTitle = clockContainer.querySelector('h1'); // clockContainer 의 자식

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
    clockTitle.innerText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`; // ` 을 백택이라고 함
}

function init()
{
    getTime();
    setInterval(getTime, 1000);
}

init();