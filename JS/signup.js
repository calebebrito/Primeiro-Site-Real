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

    const savedUsers = localStorage.getItem("versusUsers")
    const users = savedUsers ? JSON.parse(savedUsers) : []

    const existingEmail = users.some (function(user) {
        return user.email === email
    })

    if (existingEmail) {
        alert ("This email is already registered")
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
        higherStreak: 0,
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

        createdAt: new Date().toISOString()
    }

    users.push(user)

    localStorage.setItem("versusUsers", JSON.stringify(users))
    localStorage.setItem("versusUser", JSON.stringify(user))
    localStorage.setItem("versusLoggedIn", "true")

    window.location.href = "homeScreen.html"
})