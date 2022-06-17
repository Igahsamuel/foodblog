// javascript for index.html
const container = document.querySelector('.blogs');
const searchForm = document.getElementById('search');


const renderPosts = async (term) => {
    let url = "https://jsonplaceholder.typicode.com/posts?_sort=id&_order=asc";

    if(term){
        url += `&q=${term}`;
    }

    const res = await fetch(url);
    const posts = await res.json();
    
    let template = '';
    posts.forEach(post => {
        template += `
            <div class="post">
            <p><small>${post.id} </small></p>
            <h2>${post.title}</h2>
            <p>${post.body.slice(0, 100)}</p>
            <a href ="details.html?id=${post.id}">View More ...</a>
            <a href = "create.html?id=${post.id}">update</a>
            </div> 
        `
    })
    

    container.innerHTML = template;
}   

fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PUT',
  body: JSON.stringify({
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));

searchForm.addEventListener ('submit', (e) => {
    e.preventDefault();
    renderPosts(searchForm.term.value.trim());
})

window.addEventListener('DOMContentLoaded', (e) => renderPosts());