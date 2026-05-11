const signupForm = document.querySelector('#signupForm')

signupForm.addEventListener ("submit", function (event) {
    event.preventDefault()

    const emailInput = document.querySelector('#signupEmail')
    const passwordInput = document.querySelector('#signupPassword')
    const confirmPasswordInput = document.querySelector('#confirmPassword')

    const email = emailInput.value.trim()
    const password = passwordInput.value.trim()
    const confirmPassword = confirmPasswordInput.value.trim()

    if (!email || !password || !confirmPassword) {
        alert ("Please fill in all fields!")
        return
    }

    if (password.length < 6) {
        alert ("Password must contain at least 6 characters!")
        return
    }

    if (password !== confirmPassword) {
        alert ("Passwords do not match!")
        return
    }

    const recaptchaResponse = grecaptcha.getResponse()

    if (!recaptchaResponse) {
        alert ("Please confirm that you are not a robot!")
        return
    }

    const user = {
        email: email,
        password: password,
        username: email.split("@")[0],
        level: 1,
        xp: 0,
        maxXp: 100,
        completedQuizzes: 0,
        correcetAnswers: 0,
        createdAt: new Date().toISOString()
    }

    localStorage.setItem("versusUser", JSON.stringify(user))
    localStorage.setItem("versusLoggedIn", "true")

    window.location.href = "homeScreen.html"
})