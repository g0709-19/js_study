const toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event)
{
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const removedId = li.id;
    const cleanToDos = toDos.filter(toDo => toDo.id !== parseInt(li.id)); // li.id 가 string 이라 비교 오류
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos()
{
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text)
{
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const newId = toDos.length + 1;
    delBtn.addEventListener('click', deleteToDo);
    delBtn.innerText = '❌';
    const span = document.createElement('span');
    span.innerText = text;
    li.id = newId;
    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);
    toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event)
{
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = '';
}

function loadToDos()
{
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null)
    {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(toDo => paintToDo(toDo.text));
    }
}

function init()
{
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmit);
}

init();