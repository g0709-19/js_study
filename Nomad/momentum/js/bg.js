const body = document.querySelector('body');

const IMAGE_AMOUNT = 6;

function handleImgLoad(event)
{
    const image = event.path[0];
    body.appendChild(image);
    image.classList.add('bgImg');
}

function paintImage(imgNumber)
{
    const image = new Image();
    image.src = `img/${imgNumber + 1}.jpg`;
    image.addEventListener('load', handleImgLoad);
    //body.prepend(image);
}

function getRandom()
{
    const number = Math.floor(Math.random() * IMAGE_AMOUNT);
    return number;
}

function init()
{
    const randomNumber = getRandom();
    paintImage(randomNumber);
};

init();