let container = document.querySelector('#post-holder');
let postForm = document.querySelector('#post-form');
let title = document.querySelector('#title');
let body = document.querySelector('#body');
const searchForm = document.querySelector('.search');



let dataArr = [];

function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
            console.log(dataArr)
            //    console.log(data)
            dataArr = data
            renderDetails(dataArr)
        })


}

getPosts();

postForm.addEventListener('submit', createPost)


function createPost(e) {
    e.preventDefault();
    // console.log(title.value, body.value)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            body: body.value,
            userId: 2
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            dataArr.unshift(data);
            console.log(dataArr)
            let postHolder = '';
            dataArr.forEach(post => {
                postHolder += `
                <div class="col-md-6  col-lg-4 mb-3">
                    <div class="card h-100">
                    <img src = "images/Post 2.jpg" class="card-img-top">
                        <div class="card-body">
                            <p>${post.id}</p>
                            <h6 class="post-title">${post.title}</h6>
                            <p class="post-body">${post.body}</p>
                            <div class="d-flex justify-content-between">
                            <button class="btn btn-outline-success" id="view-btn" onclick="openSingle(${post.id})"><i class="bi bi-cup-straw">View More</i></button>
                                    <button class="btn btn-outline-primary" onclick="updatePost(${post.id})"><i class="bi bi-minecart">Update</i></button>
                                    <button class="btn btn-outline-warning" onclick="deletePost(${post.id})"><i class="bi bi-trash">Delete</i></button>
                            </div>
                        </div>
                    </div>
                </div>
            `
            });
            container.innerHTML = postHolder;
        })
}

function updatePost(id) {
    console.log(id)

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: title.value,
            body: body.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {

            console.log(data)
            let postTitles = document.querySelectorAll('.post-title') // 100 post titles [0 -99]
            let postBodies = document.querySelectorAll('.post-body')
            console.log(postTitles)
            postTitles.forEach((postTitle, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        postTitle.innerHTML = data.title
                    }
                }

            })

            postBodies.forEach((postBody, index) => {
                if (index + 1 === id) {
                    if (data.body !== "") {
                        postBody.innerHTML = data.body
                    }
                }

            })

        });
}


function openSingle(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            localStorage.setItem('viewedPost', JSON.stringify(data))
            window.location.href = 'details.html'
            // console.log(data)
        });
}

function deletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            dataArr = dataArr.filter(post => post.id !== id)
            console.log(dataArr)
            // use a function to display the UI
            renderDetails(dataArr)  
        })

}

function renderDetails (arr) {
    let url = 'https://jsonplaceholder.typicode.com/posts';
    if (arr) {
        url += '&q=${arr}';
    }
    let postHolder = '';
            arr.forEach(post => {
                postHolder += `
                    <div class="col-lg-4 col-md-6 mb-3">
                        <div class="card h-100">
                        <img src = "images/Post 2.jpg" class="card-img-top">
                            <div class="card-body">
                                <p>${post.id}</p>
                                <h6 class="post-title">${post.title}</h6>
                                <p class="post-body">${post.body}</p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-outline-success" id="view-btn" onclick="openSingle(${post.id})"><i class="bi bi-cup-straw">View More</i></button>
                                    <button class="btn btn-outline-primary" onclick="updatePost(${post.id})"><i class="bi bi-minecart">Update</i></button>
                                    <button class="btn btn-outline-warning" onclick="deletePost(${post.id})"><i class="bi bi-trash">Delete</i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            });
            container.innerHTML = postHolder;

}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    renderDetails(searchForm.arr.value.trim())
})



