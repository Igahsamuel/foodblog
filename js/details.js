// javascript for details.html
const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.details');
const deleteBtn = document.querySelector('.delete');

const renderDetails = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}` ,);
    const post = await res.json();
   const template = `
    <p>${post.id}</p>
    <h2>${post.title}</h2>
    <p>${post.body}</p>
   `
   container.innerHTML = template;
}
deleteBtn.addEventListener('click', async (e) => {
 const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
     method: 'DELETE'

});
 
 window.location.href='index.html';
})

window.addEventListener('DOMContentLoaded', () => renderDetails());