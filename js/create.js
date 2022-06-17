// javascript for create.html
const form = document.querySelector('form');

const createPost = async (e) => {
    e.preventDefault();

    const doc = {
        title: form.title.value,
        body: form.body.value,
        likes:0
    }
    await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: { 'content-Type' : 'application/json'}

    });
    window.location.replace('/index.html');

}

form.addEventListener('submit', createPost);