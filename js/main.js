// javascript for index.html
const container = document.querySelector('.blogs');
const searchForm = document.getElementById('search');

const renderPosts = async (term) => {
    let url = "https://jsonplaceholder.typicode.com/posts?_sort=likes&_order=desc";

    if(term){
        url += `&q=${term}`;
    }

    const res = await fetch(url);
    const posts = await res.json();
    
    let template = '';
    posts.forEach(post => {
        template += `
            <div class="post">
            <h2>${post.title}</h2>
            <p><small>${post.likes} likes</small></p>
            <p>${post.body.slice(0, 100)}</p>
            <a href = "details.html?id=${post.id}">View More ...</a>
            </div> 
        `
    })
    

    container.innerHTML = template;
}   
searchForm.addEventListener ('submit', (e) => {
    e.preventDefault();
    renderPosts(searchForm.term.value.trim());
})

window.addEventListener('DOMContentLoaded', (e) => renderPosts());