const loginForm = document.querySelector("#loginForm")

if (loginForm) {
    loginForm.addEventListener ("submit", function (event) {
        event.preventDefault()

        const emailInput = document.querySelector("#loginEmail")
        const passwordInput = document.querySelector("#loginPassword")

        const emailError = document.querySelector("#emailError")
        const passwordError = document.querySelector("#passwordError")

        const email = emailInput.value.trim()
        const password = passwordInput.value.trim()

        emailError.textContent = ""
        passwordError.textContent = ""

        emailInput.classList.remove("inputInvalid")
        passwordInput.classList.remove("inputInvalid")


        if (!email) {
            emailError.textContent = "Email is required!"
            emailInput.classList.add("inputInvalid")
        }

        if (!password) {
            passwordError.textContent = "Password is required!"
            passwordInput.classList.add("inputInvalid")
        }

        if (!email || !password) {
            return
        }

        const savedUsers = localStorage.getItem("versusUsers")
        const users = savedUsers ? JSON.parse(savedUsers) : []

        const foundUser = users.find (function (user) {
            return user.email === email && user.password === password
        })

        if (!foundUser) {
            passwordError.textContent = "Incorrect email or password!"

            emailInput.classList.add("inputInvalid")
            passwordInput.classList.add("inputInvalid")
            return
        }

        localStorage.setItem("versusUser", JSON.stringify(foundUser))
        localStorage.setItem("versusLoggedIn", "true")

        window.location.href = "homeScreen.html"        
    })
}