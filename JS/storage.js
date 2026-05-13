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