const body = document.querySelector('body');

const IMAGE_AMOUNT = 6;

function handleImgLoad(event)
{
    const image = event.path[0];
    image.classList.add('bgImg');
}

function paintImage(imgNumber)
{
    const image = new Image();
    image.src = `img/${imgNumber + 1}.jpg`;
    body.appendChild(image);
    //body.prepend(image);
    image.addEventListener('load', handleImgLoad);
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