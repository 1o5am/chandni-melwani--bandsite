const oldComments = [
    {
        name: "Victor Pinto",
        timestamp: new Date("2023-11-02"),
        comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    },
    {
        name: "Christina Cabrera",
        timestamp: new Date("2023-10-28"),
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    },
    {
        name: "Isaac Tadesse",
        timestamp: new Date("2023-10-20"),
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    }
]

console.table(oldComments);

const commentsList = document.querySelector(".comments__list");
const commentForm = document.querySelector(".comments__form");

commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newComment = {
        name: event.target.name.value,
        timestamp: new Date(),
        comment: event.target.comment.value
    }
    oldComments.unshift(newComment);
    console.table(oldComments);
    LoopComments();
}
)

const LoopComments = () => {
    commentsList.innerHTML = "";
    oldComments.forEach((comment) => {

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
    })
}

LoopComments();
