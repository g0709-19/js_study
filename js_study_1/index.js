const wrapper = document.querySelector('.wrapper');

const color_amount = 4;

function handleClick() {
    for (let i = 1; i <= color_amount; ++i) {
        if (wrapper.classList.contains(`${'color'}${i}`)) {
            wrapper.classList.remove(`${'color'}${i}`);
            break;
        }
    }
    let num = Math.floor((Math.random() * 10)) % 4 + 1;
    wrapper.classList.add(`${'color'}${num}`);
}

function init() {
    wrapper.addEventListener('click', handleClick);
}

init();