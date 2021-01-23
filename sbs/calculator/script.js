const buttons = document.querySelectorAll('.button');
const reset = document.querySelector('.reset');
const done = document.querySelector('.done');
const result = document.querySelector('.result');
const backspace = document.querySelector('.backspace');
const calculator = document.querySelector('.calculator');
const body = document.querySelector('body');

function showResult() {
    const infix = result.innerText;
    const postfix = inToPost(infix);
    console.log(postfix);
    const _result = calculate(postfix);
    result.innerText = _result;
}

const priority = {
    '＋': 0,
    '－': 0,
    '×': 1,
    '÷': 1,
    '(': -1
}

// 중위 표기법 -> 후위 표기법
function inToPost(infix) {
    let stack = [];
    let postfix = "";
    for (let i=0; i<infix.length; ++i) {
        const char = infix.charAt(i);
        // 괄호 열렸을 때
        if (char === '(') {
            stack.push(char);
        } 
        // 숫자일 때
        else if (!isNaN(char)) {
            postfix += char;
            // 다음 입력이 없거나, 다음 입력이 숫자가 아니라면 숫자 한 개 입력이 끝난 것
            if (infix.length == i+1 || isNaN(infix.charAt(i+1)))
                postfix += " ";
        }
        // 괄호 닫혔을 때
        else if (char === ')') {
            let end = stack[stack.length-1];
            while (end != '(') {
                const poped = stack.pop();
                postfix += poped;
                end = stack[stack.length-1];
            }
            stack.pop();    // 열린 괄호 처리
        }
        // 연산자일 때
        else {
            let end = stack[stack.length-1];
            while(stack.length != 0 && priority[end] >= priority[char]) {
                const poped = stack.pop();
                postfix += poped;
                end = stack[stack.length-1];
            }
            stack.push(char);
        }
    }
    // 남은건 모두 출력
    while (stack.length != 0) {
        const poped = stack.pop();
        postfix += poped;
    }
    return postfix;
}

// 후위 표기법 계산
function calculate(postfix) {
    let stack = [];
    for (let i=0; i<postfix.length; ++i) {
        const char = postfix.charAt(i);
        // 피연산자라면(공백 포함)
        if (!isNaN(char) || char === ' ') {
            stack.push(char);
        }
        // 연산자라면
        else {
            console.log("?? "+stack.pop());    // 공백 하나 제거
            let a;
            let b;
            let temp = "";
            let end = stack[stack.length-1];
            while(end != ' ') {
                const poped = stack.pop();
                console.log("pop1 "+poped)
                temp += poped;
                end = stack[stack.length-1];
            }
            stack.pop();    // 공백 하나 제거
            b = temp.split('').reverse().join('');
            temp = "";
            end = stack[stack.length-1];
            while(!isNaN(end) && end != ' ') {
                const poped = stack.pop();
                console.log("pop2 "+poped)
                temp += poped;
                end = stack[stack.length-1];
            }
            a = temp.split('').reverse().join('');

            console.log(`a: ${a}, b: ${b}`)

            switch(char) {
                case '＋':
                    temp = Number(a)+Number(b);
                    break;
                case '－':
                    temp = Number(a)-Number(b);
                    break;
                case '×':
                    temp = Number(a)*Number(b);
                    break;
                case '÷':
                    temp = Number(a)/Number(b);
                    break;
            }
            // 계산 결과를 한 숫자씩 넣는 작업
            console.log(temp);
            String(temp).split('').forEach(c => {
                stack.push(`${c}`);
            });
            stack.push(' ');
        }
    }
    let value = "";
    // 결과 숫자가 하나씩 들어가므로 공백 빼고 다 모아야 됨
    while (stack.length != 0) {
        const poped = stack.pop();
        if (poped != ' ')
            value += poped;
    }
    // 거꾸로 빼는거라 뒤집는 과정 필요
    if (value) {
        return value.split('').reverse().join('');
    }
    else return undefined;
}

function addTextToScreen(text) {
    const current = result.innerText;
    result.innerText = current + text;
}

function changeBGColor() {
    const color = randomColor();
    body.style.backgroundColor = color;
}

function randomColor() {
    const value = Math.round(Math.random() * 0xFFFFFF);
    return `#${value.toString(16)}`;
}

function resetScreen() {
    result.innerText = "";
}

function handleClickInput(e) {
    const button = e.target;
    const text = button.innerText;
    if (text) {
        console.log(text);
        addTextToScreen(text);
    }
    changeBGColor();
}


function eraseOneWord() {
    const sliced = result.innerText.slice(0, result.innerText.length-1);
    result.innerText = sliced;
}

function init() {
    buttons.forEach(button => {
        button.addEventListener('click', handleClickInput);
    });
    reset.addEventListener('click', resetScreen);
    done.addEventListener('click', showResult);
    backspace.addEventListener('click', eraseOneWord);
    window.addEventListener('load', () => {
        calculator.classList.add('show');
    })
}

init();