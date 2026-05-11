const whitePage = document.getElementById("menuPage")
const menuButton = document.getElementById("menuButton")


menuButton.addEventListener("click", function(openMenu) {
    whitePage.classList.toggle("open")
    menuButton.classList.toggle("open")
    overlay.classList.toggle("show")
})

document.addEventListener("click", (event) => {
    const clickedInsideMenu = menuButton.contains(event.target)

    if (!clickedInsideMenu) {
        whitePage.classList.remove("open")
        menuButton.classList.remove("open")
        overlay.classList.remove("show")
    }
})

whitePage.addEventListener("click", (e) => {
    e.stopPropagation();
});



const accountName = document.querySelector('#accountName')
const accountLevel = document.querySelector('#accountLevel')
const accountIcon = document.querySelector('.accountIcon')

const savedUser = localStorage.getItem("versusUser")
const isLoggedIn = localStorage.getItem("versusLoggedIn")

if (savedUser && isLoggedIn === "true") {
    const user = JSON.parse(savedUser)

    accountName.textContent = `Hello, ${user.username}`
    accountLevel.textContent = `Level ${user.level}`
} else {
    accountName.textContent = "Hello, guest"
    accountLevel.textContent = ""
}

const authButtons = document.querySelector("#authButtons")

if (savedUser && isLoggedIn === "true") {
    if (authButtons) {
    authButtons.style.display = "none"
    }
}