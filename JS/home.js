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

const authButtons = document.querySelector("#authButtons")
const logoutButton = document.querySelector(".logout")
const playQuiz = document.querySelector("#playQuizButton")


if (savedUser && isLoggedIn === "true") {
    const user = JSON.parse(savedUser)

    accountName.textContent = `Hello, ${user.username}`
    accountLevel.textContent = `Level ${user.level}`

    playQuiz.style.display = "flex"

    if (authButtons) {
        authButtons.style.display = "none"
    }

    if (logoutButton) {
        logoutButton.style.button = "block"
    }

} else {
    accountName.textContent = "Hello, guest"
    accountLevel.textContent = ""

    if (authButtons) {
        authButtons.style.display = "flex"
    }

    if (logoutButton) {
        logoutButton.style.display = "none"
    }
}

if (logoutButton) {
    logoutButton.addEventListener ("click", function() {
        localStorage.setItem("versusLoggedIn", "false")

        window.location.href = "homeScreen.html"
    })
}