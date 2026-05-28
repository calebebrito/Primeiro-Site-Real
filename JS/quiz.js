const user = getCurrentUser()

if (!user) {
    const loginWarning = document.querySelector(".loginWarning")
    const closeLoginWarning = document.querySelector(".closeLoginWarning")
    const popupOverlay = document.querySelector(".popupOverlay")

    loginWarning.classList.add("showPopup")
    popupOverlay.classList.add("showOverlay")

    closeLoginWarning.addEventListener("click", function() {
        window.location.href = "logInScreen.html"
    })

    throw new Error("User not logged in")
}

const modeSection = document.querySelector("#modeSection")
const quizSection = document.querySelector("#quizSection")
const modeButtons = document.querySelectorAll(".modeButton")

const quizModeText = document.querySelector("#quizModeText")
const quizProgress = document.querySelector("#quizProgress")
const questionTitle = document.querySelector("#questionTitle")
const optionsContainer = document.querySelector("#optionsContainer")
const feedbackText = document.querySelector("#feedbackText")
const nextQuestionButton = document.querySelector("#nextQuestionButton")
const finishQuizButton = document.querySelector("#finishQuizButton")

let selectedMode = ""
let selectedQuestions = []
let currentQuestionIndex = 0
let correctAnswerInQuiz = 0
let hasAnswered = false

const allQuestions = {
    easy: [
        {
            question: "Who built the ark?",
            options: ["Moses", "Noah", "David", "Paul"],
            correctAnswer: "Noah"
        },
        {
            question: "Who defeated Goliath?",
            options: ["Solomon", "David", "Peter", "Joshua"],
            correctAnswer: "David"
        },
        {
            question: "Who betrayed Jesus?",
            options: ["Peter", "Judas", "Thomas", "John"],
            correctAnswer: "Judas"
        }
    ],

    medium: [
        {
            question: "How many days did God take to create the world?",
            options: ["3", "5", "6", "7"],
            correctAnswer: "6"
        },
        {
            question: "Who has swallowed by a great fish?",
            options: ["Jonah", "Elijah", "Abraham", "Isaac"],
            correctAnswer: "Jonah"
        },
        {
            question: "What was the first book of the bible?",
            options: ["Exodus", "Genesis", "Matthew", "Psalms"],
            correctAnswer: "Genesis"
        }
    ],

    hard: [
        {
            question: "Who interpreted Pharaoh's dreams in Egypt?",
            options: ["Daniel", "Joseph", "Moses", "Aaron"],
            correctAnswer: "Joseph"
        },
        {
            question: "What was the mother of Samuel?",
            options: ["Hannah", "Sarah", "Rachel", "Miriam"],
            correctAnswer: "Hannah"
        },
        {
            question: "Which apostle was known for doubting Jesus' resurrection?",
            options: ["Peter", "Thomas", "James", "Andrew"],
            correctAnswer: "Thomas"
        }
    ],

    blessed: [
        {
            question: "Complete the verse: 'I am the way and the truth and the...'",
            options: ["Light", "Life", "Power", "Door"],
            correctAnswer: "Life"
        },
        {
            question: "In Galatians 5, which of these is a fruit of the spirit?",
            options: ["Pride", "Fear", "Patience", "Anger"],
            correctAnswer: "Patience"
        },
        {
            question: "Who said: 'Here i am. Send me'?",
            options: ["Isaiah", "Jeremiah", "Ezekiel", "Elijah"],
            correctAnswer: "Isaiah"
        }
    ]
}

const modeNames = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    blessed: "Blessed"
}

const xpByMode = {
    easy: 20,
    medium: 30,
    hard: 45,
    blessed: 60
}

modeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectedMode = button.dataset.mode
        startQuiz(selectedMode)
    })
})

function startQuiz(mode) {
    selectedQuestions = shuffleArray(allQuestions[mode])

    currentQuestionIndex = 0
    correctAnswerInQuiz = 0

    modeSection.style.display = "none"
    quizSection.style.display = "flex"

    quizModeText.textContent = `Mode: ${modeNames[mode]}`

    renderQuestion()
}

function renderQuestion() {
    const currentQuestion = selectedQuestions[currentQuestionIndex]

    hasAnswered = false

    quizProgress.textContent = `Question ${currentQuestionIndex + 1} / ${selectedQuestions.length}`
    questionTitle.textContent = currentQuestion.question
    optionsContainer.innerHTML = ""
    feedbackText.textContent = ""

    nextQuestionButton.style.display = "none"
    finishQuizButton.style.display = "none"

    const shuffledOptions = shuffleArray(currentQuestion.options)

    shuffledOptions.forEach(function (option, index) {
        const button = document.createElement("button")
        const letters = ["a.", "b.", "c.", "d."]

        button.innerHTML = `
            <span class="optionLetter">${letters[index]}</span>
            <span>${option}</span>
        `

        button.classList.add("optionButton")

        button.addEventListener("click", function () {
            checkAnswer(option, button)
        })

        optionsContainer.appendChild(button)
    })
    
}

function shuffleArray(array) {
    const shuffled = [...array]

    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))

        const temp = shuffled[i]
        shuffled[i] = shuffled[randomIndex]
        shuffled[randomIndex] = temp
    }

    return shuffled
}

function checkAnswer(selectedOption, selectedButton) {
    if (hasAnswered) {
        return
    }

    hasAnswered = true

    const currentQuestion = selectedQuestions[currentQuestionIndex]
    const optionButtons = document.querySelectorAll(".optionButton")

    optionButtons.forEach(function (button) {
        button.disabled = true

        if (button.textContent === currentQuestion.correctAnswer) {
            button.classList.add("correctOption")
        }
    })

    if (selectedOption === currentQuestion.correctAnswer) {
        correctAnswerInQuiz++
        feedbackText.textContent = `+${xpByMode[selectedMode]} XP` 
        selectedButton.classList.add("correctOption")
    } else {
        feedbackText.textContent = "Wrong!"
        selectedButton.classList.add("wrongOption")
    }

    if (currentQuestionIndex === selectedQuestions.length - 1) {
        finishQuizButton.style.display = "block"
    } else {
        nextQuestionButton.style.display = "block"
    }
}

function nextQuestion() {
    currentQuestionIndex++
    renderQuestion()
}

function finishQuiz() {
    const currentUser = getCurrentUser()

    const xpPerCorrectAnswer = xpByMode[selectedMode]
    const perfectBonus = correctAnswerInQuiz === selectedQuestions.length ? xpPerCorrectAnswer * 2 : 0
    const earnedXp = correctAnswerInQuiz * xpPerCorrectAnswer + perfectBonus

    currentUser.xp = currentUser.xp || 0
    currentUser.maxXp = currentUser.maxXp || 100
    currentUser.level = currentUser.level || 1

    currentUser.completedQuizzes = currentUser.completedQuizzes || 0
    currentUser.correctAnswers = currentUser.correctAnswers || 0
    currentUser.blessedQuizzes = currentUser.blessedQuizzes || 0
    currentUser.favoriteMode = modeNames[selectedMode]

    currentUser.completedQuizzes++
    currentUser.correctAnswers += correctAnswerInQuiz
    currentUser.xp += earnedXp

    if (selectedMode === "blessed") {
        currentUser.blessedQuizzes++
    }

    while (currentUser.xp >= currentUser.maxXp) {
        currentUser.xp -= currentUser.maxXp
        currentUser.level++
        currentUser.maxXp = Math.floor(currentUser.maxXp * 1.25)
    }

    saveCurrentUser(currentUser)

    alert (`Quiz completed! You got ${correctAnswerInQuiz}/${selectedQuestions.length} correct answers and earned ${earnedXp} XP.`)

    window.location.href = "JourneyScreen.html"
}

nextQuestionButton.addEventListener("click", nextQuestion)
finishQuizButton.addEventListener("click", finishQuiz)