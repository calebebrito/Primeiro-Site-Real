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

const currentUser = getCurrentUser()

// Declaração global da string da data de hoje para usar no arquivo todo
const todayStr = new Date().toDateString() 

if (currentUser) {
    const lastLogin = currentUser.lastLoginDate

    // Evita bug caso conta antiga nao tenha streak
    if (!currentUser.dailyStreak) {
        currentUser.dailyStreak = 1
    }

    if (!currentUser.lastLoginDate) {
        currentUser.lastLoginDate = todayStr
    }

    const todayDate = new Date(todayStr)
    const lastLoginDate = new Date(lastLogin)

    const differenceInTime = todayDate - lastLoginDate
    
    // CORREÇÃO: Math.round evita problemas com fusos horários e números quebrados (ex: 0.98 dias)
    const differenceInDays = Math.round(differenceInTime / (1000 * 60 * 60 * 24))

    // Entrou no dia seguinte
    if (differenceInDays === 1) {
        currentUser.dailyStreak += 1
    }

    // Perdeu a streak (2 ou mais dias sem entrar)
    if (differenceInDays >= 2) {
        currentUser.dailyStreak = 1
    }

    if (!currentUser.higherStreak) {
        currentUser.higherStreak = currentUser.dailyStreak
    }

    if (currentUser.dailyStreak > currentUser.higherStreak) {
        currentUser.higherStreak = currentUser.dailyStreak
    }

    // Salva a data atual
    currentUser.lastLoginDate = todayStr

    // Salva usuario atual
    localStorage.setItem("versusUser", JSON.stringify(currentUser))

    // Atualiza lista de usuarios
    const users = JSON.parse(localStorage.getItem("versusUsers")) || []
    const updatedUsers = users.map(function(user) {
        if (user.email === currentUser.email) {
            return currentUser
        }
        return user
    })

    localStorage.setItem("versusUsers", JSON.stringify(updatedUsers))
}

const streakPopup = document.querySelector("#streakPopup")
const streakMessage = document.querySelector("#streakMessage")
const closeStreakPopup = document.querySelector("#closeStreakPopup")

const lastPopupDate = localStorage.getItem("versusLastStreakPopup")

if (streakPopup && currentUser) {
    streakMessage.textContent = `You are on a ${currentUser.dailyStreak} day streak!`

    // CORREÇÃO: Usando a variável global todayStr corrigida
    if (lastPopupDate !== todayStr) {
        setTimeout(function () {
            streakPopup.classList.add("showPopup")
        }, 300)
    }
}

if (closeStreakPopup) {
    closeStreakPopup.addEventListener("click", function () {
        streakPopup.classList.remove("showPopup")
        // CORREÇÃO: Usando a variável global todayStr corrigida
        localStorage.setItem("versusLastStreakPopup", todayStr)
    })
}

const showDailyStreak = document.querySelector(".showDailyStreak")
if (showDailyStreak && streakPopup) {
    showDailyStreak.addEventListener("click", function() {
        streakPopup.classList.add("showPopup")
    })
}