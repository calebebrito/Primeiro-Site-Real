const loginForm = document.querySelector("#loginForm")

if (loginForm) {
    loginForm.addEventListener ("submit", function (event) {
        event.preventDefault()

        const emailInput = document.querySelector("#loginEmail")
        const passwordInput = document.querySelector("#loginPassword")

        const email = emailInput.value.trim()
        const password = passwordInput.value.trim()

        if (!email || !password) {
            alert ("Please fill in all the fields!")
            return
        }

        const savedUsers = localStorage.getItem("versusUsers")
        const users = savedUsers ? JSON.parse(savedUsers) : []

        const foundUser = users.find (function (user) {
            return user.email === email && user.password === password
        })

        if (!foundUser) {
            alert ("Incorrect email or password!")
            return
        }

        localStorage.setItem("versusUser", JSON.stringify(foundUser))
        localStorage.setItem("versusLoggedIn", "true")

        window.location.href = "homeScreen.html"        
    })
}