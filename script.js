const whitePage = document.getElementById("menuPage")
const menuButton = document.getElementById("menuButton")

menuButton.addEventListener("click", function() {
    whitePage.classList.toggle("open")
    menuButton.classList.toggle("open")
})