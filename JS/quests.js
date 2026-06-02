    const comingSoon = document.querySelector(".comingSoon")
    const closeComingSoon = document.querySelector(".closeComingSoon")
    const popupOverlay = document.querySelector(".popupOverlay")

    if (comingSoon) comingSoon.classList.add("showPopup")
    if (popupOverlay) popupOverlay.classList.add("showOverlay")

    if (closeComingSoon) {
        closeComingSoon.addEventListener("click", function () {
            window.location.href = "homeScreen.html"
        })
}
