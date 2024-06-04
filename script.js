document.getElementById('new-post-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const image = document.getElementById('post-image').files[0];

    addPost(title, content, image);

    document.getElementById('new-post-form').reset();
});

function addPost(title, content, image) {
    const postsContainer = document.getElementById('posts');

    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    const postTitle = document.createElement('h2');
    postTitle.innerText = title;

    const postContent = document.createElement('p');
    postContent.innerText = content;

    postDiv.appendChild(postTitle);
    postDiv.appendChild(postContent);

    if (image) {
        const postImage = document.createElement('img');
        const reader = new FileReader();
        reader.onload = function(e) {
            postImage.src = e.target.result;
        };
        reader.readAsDataURL(image);
        postDiv.appendChild(postImage);
    }

    const editButton = document.createElement('button');
    editButton.id = 'editID'
    editButton.innerText = 'Edit';
    editButton.onclick = function() {
        editPost(postDiv, postTitle, postContent, image);
    };

    const deleteButton = document.createElement('button');
    deleteButton.id = 'deleteID'
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = function() {
        deletePost(postDiv);
    };

    postDiv.appendChild(editButton);
    postDiv.appendChild(deleteButton);

    postsContainer.insertBefore(postDiv, postsContainer.firstChild);
}

function editPost(postDiv, postTitle, postContent, postImage) {
    postDiv.classList.add('editing');

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = postTitle.innerText;

    const contentTextarea = document.createElement('textarea');
    contentTextarea.value = postContent.innerText;

    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.accept = 'image/*';

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.onclick = function() {
        saveEdit(postDiv, postTitle, postContent, postImage, titleInput, contentTextarea, imageInput);
    };

    postDiv.innerHTML = '';
    postDiv.appendChild(titleInput);
    postDiv.appendChild(contentTextarea);
    postDiv.appendChild(imageInput);
    postDiv.appendChild(saveButton);
}

function saveEdit(postDiv, postTitle, postContent, postImage, titleInput, contentTextarea, imageInput) {
    postTitle.innerText = titleInput.value;
    postContent.innerText = contentTextarea.value;

    const image = imageInput.files[0];

    postDiv.innerHTML = '';
    postDiv.classList.remove('editing');
    postDiv.appendChild(postTitle);
    postDiv.appendChild(postContent);

    if (image) {
        const newImage = document.createElement('img');
        const reader = new FileReader();
        reader.onload = function(e) {
            newImage.src = e.target.result;
        };
        reader.readAsDataURL(image);
        postDiv.appendChild(newImage);
    } else if (postImage) {
        const existingImage = document.createElement('img');
        existingImage.src = postImage.src;
        postDiv.appendChild(existingImage);
    }

    const editButton = document.createElement('button');
    editButton.id = 'editID'
    editButton.innerText = 'Edit';
    editButton.onclick = function() {
        editPost(postDiv, postTitle, postContent, postImage);
    };

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.id = 'deleteID';
    deleteButton.onclick = function() {
        deletePost(postDiv);
    };

    postDiv.appendChild(editButton);
    postDiv.appendChild(deleteButton);
}

function deletePost(postDiv) {
    if (confirm('Are you sure you want to delete this post?')) {
        postDiv.remove();
    }
}
