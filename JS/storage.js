function getCurrentUser() {
    const savedUser = localStorage.getItem("versusUser")
    const isLoggedIn = localStorage.getItem("versusLoggedIn")

    if (!savedUser || isLoggedIn !== "true") {
        return null
    }

    return JSON.parse(savedUser)
}

function getAllUsers() {
    const savedUsers = localStorage.getItem("versusUsers")
    return savedUsers ? JSON.parse(savedUsers) : []
}

function saveCurrentUser(updateUser) {
    const users = getAllUsers()

    const updateUsers = users.map(function(user) {
        if (user.email === updateUser.email) {
            return updateUser
        }

        return user
    })

    localStorage.setItem("versusUsers", JSON.stringify(updateUsers))
    localStorage.setItem("versusUser", JSON.stringify(updateUser))
}

const currentUser = JSON.parse(localStorage.getItem("versusUser"))

if (currentUser) {
    const today = new Date().toDateString()

    const lastLogin = currentUser.lastLoginDate

    //Evita bug caso conta antiga nao tenha streak
    if (!currentUser.dailyStreak) {
        currentUser.dailyStreak = 1
    }

    if (!currentUser) {
        currentUser.lastLoginDate = today
    }

    const todayDate = new Date(today)
    const lastLoginDate = new Date(lastLogin)

    const differenceInTime = todayDate - lastLoginDate

    const differenceInDays = 
        differenceInTime / (1000 * 60 *60 * 24)


    //Entrou no dia seguinte
    if (differenceInDays >= 1 && differenceInDays < 2) {
        currentUser.dailyStreak += 1
    }

    //Perdeu a streak
    if (differenceInDays >= 2) {
        currentUser.dailyStreak = 1
    }

    //Salva a data atual
    currentUser.lastLoginDate = today

    //Salva usuario atual
    localStorage.setItem(
        "versusUser",
        JSON.stringify(currentUser)
    )

    //Atualiza lista de usuarios
    const users = JSON.parse(localStorage.getItem("versusUsers")) || []

    const updatedUsers = users.map(function(user) {
        if (user.email === currentUser.email) {
            return currentUser
        }

        return user
    })

    localStorage.setItem(
        "versusUsers",
        JSON.stringify(updatedUsers)
    )
}

const streakPopup = document.querySelector("#streakPopup")
const streakMessage = document.querySelector("#streakMessage")
const closeStreakPopup = document.querySelector("#closeStreakPopup")

const today = new Date().toDateString()

const lastPopupDate =
    localStorage.getItem("versusLastStreakPopup")

if (streakPopup && currentUser) {

    streakMessage.textContent =
        `You are on a ${currentUser.dailyStreak} day streak!`

    // aparece só uma vez por dia
    if (lastPopupDate !== today) {

        setTimeout(function () {

            streakPopup.classList.add("showPopup")

        }, 300)

        localStorage.setItem(
            "versusLastStreakPopup",
            today
        )
    }
}

if (closeStreakPopup) {

    closeStreakPopup.addEventListener("click", function () {

        streakPopup.classList.remove("showPopup")

    })

}

const showDailyStreak = document.querySelector(".showDailyStreak")

if (showDailyStreak) {
    showDailyStreak.addEventListener("click", function() {
        streakPopup.classList.add("showPopup")
    })
  }