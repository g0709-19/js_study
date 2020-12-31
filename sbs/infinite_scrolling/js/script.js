
const POST_AMOUNT = 100;
const LIMIT = 5;
    
const filter = document.getElementById('filter-js');

let posts = document.getElementById('posts-js');
let post_count = 1;

let page = 1;

// API 에서 얻은 Lorem 의 제목, 본문을 오브젝트 형태로 반환
function getLorem (index) {
    const url = `https://jsonplaceholder.typicode.com/posts?_limit=${LIMIT}&_page=${page}`;
    return fetch(url).then(response => response.json())
    .then(json => {
        index %= LIMIT; // 실제 index 는 계속 증가하지만, 범위는 LIMIT 안으로 한정됨
        const title = json[index].title;
        const body = json[index].body.replaceAll('\n', ' ');
        let result = {
            title,
            body
        }
        return result;
    });
}

function createPost (index) {
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
    const p = document.createElement('p');

    const lorem = getLorem(index-1);    // index 가 1부터 시작하기 때문에 -1

    lorem.then(result => {
        h2.innerText = result.title;
        p.innerText = result.body;
    });

    info_element.appendChild(h2);
    info_element.appendChild(p);

    box_element.appendChild(info_element);

    post.appendChild(index_element);
    post.appendChild(box_element);

    return post;
}

function showPosts () {
    if (post_count <= POST_AMOUNT) {

        for (let j = post_count; j < (post_count + LIMIT); ++j) {
            const post = createPost(j);
            posts.appendChild(post);
        }
        ++page;
        post_count += LIMIT;
    }
}

// loading 보이고 0.3초후 새로운 글 표시
function showLoading() {
    const loading = document.getElementById('loading-js');
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');
        showPosts();
    },
    300);
}

function showFilter () {
    const filter = document.getElementById('filter-js');
    const inputed = filter.value;

    const childs = [...posts.querySelectorAll('.post')];

    // 입력된 값에 부합하는 노드들만 걸러냄
    childs.forEach(child => {
        const box = child.querySelector('.box');
        const info = box.querySelector('.info');
        const title = info.querySelector('h2');
        const body = info.querySelector('p');
        const title_text = title.innerText;
        const body_text = body.innerText;
        
        // 입력한 값과 매칭되면 hide 삭제, 안되면 hide 추가하여 숨김
        if (title_text.indexOf(inputed) !== -1 ||
            body_text.indexOf(inputed) !== -1) {
            child.classList.remove('hide');
        } else {
            child.classList.add('hide');
        }
    });
}

function handleScroll() {
    //const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const scrollTop = window.scrollY;                       // 현재 스크롤값
    const scrollHeight = document.body.scrollHeight + 100;  // 페이지 전체 높이
    const clientHeight = window.innerHeight;                // 스크린 높이
    
    // 스크롤이 끝에 도달하면
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
        showFilter();
    }
}

function init() {
    showPosts();
    filter.addEventListener('input', showFilter);
    window.addEventListener('scroll', handleScroll);
}

init();