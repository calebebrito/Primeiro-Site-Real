const emailError = document.querySelector("#emailError")
const passwordError = document.querySelector("#passwordError")
const confirmPasswordError = document.querySelector("#confirmPasswordError")
const captchaError = document.querySelector("#captchaError")
const signupForm = document.querySelector('#signupForm')

signupForm.addEventListener ("submit", function (event) {
    event.preventDefault()

    const emailInput = document.querySelector('#signupEmail')
    const passwordInput = document.querySelector('#signupPassword')
    const confirmPasswordInput = document.querySelector('#confirmPassword')

    const email = emailInput.value.trim()
    const password = passwordInput.value.trim()
    const confirmPassword = confirmPasswordInput.value.trim()

    emailError.textContent = ""
    passwordError.textContent = ""
    confirmPasswordError.textContent = ""
    captchaError.textContent = ""

    emailInput.classList.remove("inputInvalid")
    passwordInput.classList.remove("inputInvalid")
    confirmPasswordInput.classList.remove("inputInvalid")

    if (!email) {
        emailError.textContent = "Email is required!"
        emailInput.classList.add("inputInvalid")
    }

    if (!password) {
        passwordError.textContent = "Password is required!"
        passwordInput.classList.add("inputInvalid")
    }

    if (!confirmPassword) {
        confirmPasswordError.textContent = "Please confirm your password!"
        confirmPasswordInput.classList.add("inputInvalid")
    }

    if (!email || !password || !confirmPassword) {
        return
    }

    if (password.length < 6) {
        passwordError.textContent = "Password must contain at least 6 characters!"

        passwordInput.classList.add("inputInvalid")
        return
    }

    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match!"

        confirmPasswordInput.classList.add("inputInvalid")
        return
    }

    const recaptchaResponse = grecaptcha.getResponse()

    if (!recaptchaResponse) {
        captchaError.textContent = "Please confirm that you are not a robot!"
        return
    }

    const savedUsers = localStorage.getItem("versusUsers")
    const users = savedUsers ? JSON.parse(savedUsers) : []

    const existingEmail = users.some (function(user) {
        return user.email.toLowerCase() === email.toLowerCase()
    })

    if (existingEmail) {
        emailError.textContent = "This email is already registered"

        emailInput.classList.add("inputInvalid")
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
        blessedQuizzes: 0,
        highestStreak: 1,
        achievementsUnlocked: 0,
        globalRanking: "Unranked",
        titlesUnlocked: 0,
        winPercentage: 0,
        favoriteMode: "None",
        favoriteDifficulty: "None",

        wins: 0,
        losses: 0,

        rank: "seed",
        rankXp: 0,
        maxRankXp: 1000,
        
        correctAnswers: 0,

        dailyStreak: 1,
        lastLoginDate: new Date().toDateString(),

        createdAt: new Date().toISOString()
    }

    users.push(user)

    localStorage.setItem("versusUsers", JSON.stringify(users))
    localStorage.setItem("versusUser", JSON.stringify(user))
    localStorage.setItem("versusLoggedIn", "true")

    window.location.href = "homeScreen.html"
})