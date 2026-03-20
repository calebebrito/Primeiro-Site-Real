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


let xp = 1000
let maxXp = 1200

let percent = (xp / maxXp) * 100

document.querySelector(".xpFill").style.width = percent + "%"

document.querySelector(".xpTxt").textContent = xp + " / " + maxXp