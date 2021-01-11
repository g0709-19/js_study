const texts = document.querySelectorAll('#js-text');
const all_text = document.querySelector('#js-texts');
const toggle_btn = document.querySelector('#js-toggle-btn');
const choose_box = document.querySelector('#js-choose-voice');
const voice_select = document.querySelector('#js-voice-select');
const read_btn = document.querySelector('#js-read');
const to_read = document.querySelector('#js-to-read');

function addText(img, text) {
    // <div class="text" id="js-text">
        // <img src="img/drink.jpg" alt="">
        // <h2>I'M THIRSTY</h2>
    // </div>
    const text_element = document.createElement('div');
    text_element.classList.add('text');
    text_element.id = 'js-text';

    const img_element = document.createElement('img');
    img_element.src = img;
    text_element.appendChild(img_element);

    const h2 = document.createElement('h2');
    h2.innerText = text;
    text_element.appendChild(h2);

    text_element.addEventListener('click', handleClickText);
    all_text.appendChild(text_element);
}

function speak(text, opt_prop) {
    if (typeof SpeechSynthesisUtterance === "undefined" || typeof window.speechSynthesis === "undefined") {
        alert("이 브라우저는 음성 합성을 지원하지 않습니다.")
        return
    }
    
    window.speechSynthesis.cancel(); // 현재 읽고있다면 초기화

    const prop = opt_prop || {};

    const speechMsg = new SpeechSynthesisUtterance();
    speechMsg.rate = prop.rate || 1; // 속도: 0.1 ~ 10      
    speechMsg.pitch = prop.pitch || 1; // 음높이: 0 ~ 2
    speechMsg.lang = prop.lang || getVoice();
    speechMsg.text = text;
    
    // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
    window.speechSynthesis.speak(speechMsg);
}

// 클릭 시 TTS 실행
function handleClickText(event) {
    
    const text_div = event.target.parentNode;
    const text_for_speech = text_div.querySelector('h2').innerText;

    console.log(text_for_speech);
    speak(text_for_speech);
}

// 클릭 시 TTS 선택 창 띄움
function handleToggleBtn() {
    choose_box.classList.toggle('show');
}

// 클릭 시 텍스트 내용 읽음
function readText() {
    const text = to_read.value;
    console.log(text);
    speak(text);
}

function getVoice() {
    return voice_select.value;
}

function initText() {
    const texts = [
        {img: 'img/drink.jpg', text: 'I\'M THIRSTY'},
        {img: 'img/food.jpg', text: 'I\'M HUNGRY'},
        {img: 'img/tired.jpg', text: 'I\'M TIRED'},
        {img: 'img/hurt.jpg', text: 'I\'M HURT'},
        {img: 'img/happy.jpg', text: 'I\'M HAPPY'},
        {img: 'img/angry.jpg', text: 'I\'M ANGRY'},
        {img: 'img/sad.jpg', text: 'I\'M SAD'},
        {img: 'img/scared.jpg', text: 'I\'M SCARED'},
        {img: 'img/outside.jpg', text: 'I WANT TO GO OUTSIDE'},
        {img: 'img/home.jpg', text: 'I WANT TO GO HOME'},
        {img: 'img/school.jpg', text: 'I WANT TO GO TO SCHOOL'},
        {img: 'img/grandma.jpg', text: 'I WANT TO GO TO GRANDMAS'},
    ];

    texts.forEach(data => addText(data.img, data.text));
}

function init() {
    initText();
    toggle_btn.addEventListener('click', handleToggleBtn);
    read_btn.addEventListener('click', readText);
}

init();