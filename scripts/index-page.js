const API_KEY = 'chandni'; 
const api = new BandSiteApi(API_KEY);

// DOM Elements
const commentsList = document.querySelector(".comments__list");
const commentForm = document.querySelector(".comments__form");

// Initialize comments
const loadComments = async () => {
    try {
        const comments = await api.getComments();
        displayComments(comments);
    } catch (error) {
        console.error('Error loading comments:', error);
    }
};

// Display comments
const displayComments = (comments) => {

    const sortedComments = comments.sort((a,b) => b.timestamp - a.timestamp);
    commentsList.innerHTML = "";
    comments.forEach((comment) => {
        const commentItem = document.createElement("li");
        commentItem.classList.add("comments__item");

        const avatar = document.createElement("div");
        avatar.classList.add("comments__item-avatar");
        commentItem.appendChild(avatar);

        const commentContainer = document.createElement("div");
        commentContainer.classList.add("comments__item-content");

        const commentHeader = document.createElement("div");
        commentHeader.classList.add("comments__item-header");

        const commentName = document.createElement("h3");
        commentName.classList.add("comments__item-name");
        commentName.innerText = comment.name;
        commentHeader.appendChild(commentName);

        const commentDate = document.createElement("p");
        commentDate.classList.add("comments__item-date");
        commentDate.innerText = new Date(comment.timestamp).toLocaleDateString();
        commentHeader.appendChild(commentDate);

        commentContainer.appendChild(commentHeader);
        
        const commentText = document.createElement("p");
        commentText.classList.add("comments__item-text");
        commentText.innerText = comment.comment;
        commentContainer.appendChild(commentText);

        commentItem.appendChild(commentContainer);
        commentsList.appendChild(commentItem);
    });
};

// Handle form submission
commentForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const newComment = {
        name: event.target.name.value,
        comment: event.target.comment.value
    };

    try {
        await api.postComment(newComment);
        event.target.reset();
        loadComments(); 
    } catch (error) {
        console.error('Error posting comment:', error);
    }
});

loadComments();