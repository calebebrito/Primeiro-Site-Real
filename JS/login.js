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

        const savedUser = localStorage.getItem("versusUser")

        if (!savedUser) {
            alert ("No account found. Please create an account first!")
            return
        }

        const user = JSON.parse(savedUser)

        if (email !== user.email || password !== user.password) {
            alert ("Incorrect email or password!")
            return
        }

        localStorage.setItem("versusLoggedIn", "true")

        window.location.href = "homeScreen.html"        
    })
}