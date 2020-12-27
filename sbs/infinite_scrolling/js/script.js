
const POST_AMOUNT = 100;
const posts = document.getElementById('posts-js');

function createPost(index) {
    const post = document.createElement('div');
    post.classList.add('post');

    const index_element = document.createElement('div');
    index_element.classList.add('index');
    index_element.innerText = index;

    const box_element = document.createElement('div');
    box_element.classList.add('box');

    const info_element = document.createElement('div');
    info_element.classList.add('info');

    const h2 = document.createElement('h2');
    h2.innerText = '뭔가 로렘 입숨 제목';

    const p = document.createElement('p');
    p.innerText = '뭔가 로렘 입숨 내용';

    info_element.appendChild(h2);
    info_element.appendChild(p);

    box_element.appendChild(info_element);

    post.appendChild(index_element);
    post.appendChild(box_element);

    return post;
}

function initPosts() {
    for (let i = 1; i <= POST_AMOUNT; ++i) {
        const post = createPost(i);
        posts.appendChild(post);
    }
}

function init() {
    initPosts();
}

init();