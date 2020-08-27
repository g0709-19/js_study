const body = document.querySelector('body');

const IMAGE_AMOUNT = 6;

function handleImgLoad()
{
    console.log('Image loaded!');
}

function paintImage(imgNumber)
{
    const image = new Image();
    image.src = `img/${imgNumber + 1}.jpg`;
    body.appendChild(image);
    image.classList.add('bgImg');
    body.prepend(image);
    image.addEventListener('loadend', handleImgLoad);
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