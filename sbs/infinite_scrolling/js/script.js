
let Scroll = function() {
    this.POST_AMOUNT = 100;
    this.posts = document.getElementById('posts-js');
    this.LIMIT = 5;
    this.page = 1;
    this.filter = document.getElementById('filter-js');
}

Scroll.prototype.getLorem = function (index) {
    const url = `https://jsonplaceholder.typicode.com/posts?_limit=${this.LIMIT}&_page=${this.page}`;
    return fetch(url).then(response => response.json())
    .then(json => {
        index %= this.LIMIT;
        const title = json[index].title;
        const body = json[index].body.replaceAll('\n', ' ');
        let result = {
            title,
            body
        }
        return result;
    });
}

Scroll.prototype.createPost = function (index) {
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

    const lorem = this.getLorem(index-1);

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

Scroll.prototype.initPosts = function () {
    for (let i = 1; i <= this.POST_AMOUNT; i += this.LIMIT) {
        for (let j = i; j < (i + this.LIMIT); ++j) {
            const post = this.createPost(j);
            this.posts.appendChild(post);
        }
        ++this.page;
    }
}

Scroll.prototype.handleInput = function () {
    //console.dir(this.posts);
    const filter = document.getElementById('filter-js');
    const inputed = filter.value;

    const posts = document.getElementById('posts-js');
    const childs = [...posts.querySelectorAll('.post')];

    // 입력된 값에 부합하는 노드들만 걸러냄
    const filtered = childs.filter(child => {
        const box = child.querySelector('.box');
        const info = box.querySelector('.info');
        const title = info.querySelector('h2');
        const body = info.querySelector('p');
        const title_text = title.innerText;
        const body_text = body.innerText;
        
        return title_text.indexOf(inputed) !== -1 ||
            body_text.indexOf(inputed) !== -1;
    });

    {
        let i = 0;
        
        const container = posts.parentNode;
        this.posts = document.createElement('div');
        this.posts.id = 'posts-js';
        this.posts.classList.add('posts');
        filtered.forEach(node => {
            const post = this.createPost(i);
            this.posts.appendChild(post);
            ++i;
        });
        
    }

    console.log(filtered);
    
}


function init() {
    let scroll = new Scroll();
    scroll.initPosts();
    scroll.filter.addEventListener('input', scroll.handleInput);
}

init();