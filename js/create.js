// javascript for create.html
const form = document.querySelector('form');

const createPost = async (e) => {
    e.preventDefault();

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: 'foo',
          body: 'bar',
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(res => res.json())
        .then(data => {
          const dataArr = [];
          console.log(data)
          dataArr.unshift(data);
          console.log(dataArr)
          dataArr.push(data);
          dataArr = dataArr.filter(post => post.id !== id);
        })
        .catch(error => {
          console.log(error)
          createPost(dataArr);
        })
        
        
    window.location.href='index.html';

}


form.addEventListener('submit', createPost);