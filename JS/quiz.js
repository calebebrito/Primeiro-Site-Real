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

const quizFinishPopup = document.querySelector("#quizFinishPopup")
const quizFinishOverlay = document.querySelector("#quizFinishOverlay")
const finalScore = document.querySelector("#finalScore")
const earnedXpText = document.querySelector("#earnedXpText")
const closeQuizFinish = document.querySelector("#closeQuizFinish")

const levelUpPopup = document.querySelector("#levelUpPopup")
const levelUpOverlay = document.querySelector("#levelUpOverlay")
const newLevelText = document.querySelector("#newLevelText")
const closeLevelUp = document.querySelector("#closeLevelUp")

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
        },
        {
            question: "Who was the first man created by God?",
            options: ["Adam", "Noah", "Moses", "Abraham"],
            correctAnswer: "Adam"
        },
        {
            question: "How many disciples did Jesus have?",
            options: ["10", "11", "12", "13"],
            correctAnswer: "12"
        },
        {
            question: "How many commandments did God give Moses on Mount Sinai?",
            options: ["5", "7", "10", "12"],
            correctAnswer: "10"
        },
        {
            question: "What is the last book of the Bible?",
            options: ["Jude", "Revelation", "Acts", "Malachi"],
            correctAnswer: "Revelation"
        },
        {
            question: "Complete the verse: 'I am the way and the truth and the...'",
            options: ["Light", "Life", "Power", "Door"],
            correctAnswer: "Life"
        },
        {
            question: "What was the name of Isaac's wife?",
            options: ["Rachel", "Leah", "Rebekah", "Sarah"],
            correctAnswer: "Rebekah"
        },
        {
            question: "How many disciples did Jesus have?",
            options: ["10", "11", "12", "13"],
            correctAnswer: "12"
        },
        {
            question: "What was Jesus' profession before His ministry?",
            options: ["Fisherman", "Teacher", "Carpenter", "Farmer"],
            correctAnswer: "Carpenter"
        },
        {
            question: "What was the name of Jesus' earthly father?",
            options: ["Joseph", "John", "Jacob", "James"],
            correctAnswer: "Joseph"
        },
        {
            question: "Who led the Israelites out of Egypt?",
            options: ["Aaron", "Joshua", "Moses", "Caleb"],
            correctAnswer: "Moses"
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
        },
        {
            question: "What sea did Moses part?",
            options: ["Dead Sea", "Sea of Galilee", "Red Sea", "Mediterranean Sea"],
            correctAnswer: "Red Sea"
        },
        {
            question: "Where was Jesus born?",
            options: ["Nazareth", "Jerusalem", "Bethlehem", "Capernaum"],
            correctAnswer: "Bethlehem"
        },
        {
            question: "What was the profession of Peter before following Jesus?",
            options: ["Carpenter", "Farmer", "Fisherman", "Tax Collector"],
            correctAnswer: "Fisherman"
        },
        {
            question: "Who denied Jesus three times?",
            options: ["John", "Peter", "Matthew", "Andrew"],
            correctAnswer: "Peter"
        },
        {
            question: "What was the first miracle performed by Jesus?",
            options: ["Healing a blind man", "Walking on water", "Turning water into wine", "Feeding 5000 people"],
            correctAnswer: "Turning water into wine"
        },
        {
            question: "How many days and nights did it rain during Noah's flood?",
            options: ["30", "40", "50", "70"],
            correctAnswer: "40"
        },
        {
            question: "Who was the strongest man in the Bible?",
            options: ["David", "Samson", "Saul", "Joshua"],
            correctAnswer: "Samson"
        },
        {
            question: "Which apostle was a tax collector before following Jesus?",
            options: ["Matthew", "Andrew", "Philip", "Bartholomew"],
            correctAnswer: "Matthew"
        },
        {
            question: "What was the name of Lazarus' sister who sat at Jesus' feet?",
            options: ["Martha", "Mary", "Salome", "Joanna"],
            correctAnswer: "Mary"
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
        },
        {
            question: "Which king built the first temple in Jerusalem?",
            options: ["David", "Solomon", "Saul", "Hezekiah"],
            correctAnswer: "Solomon"
        },
        {
            question: "Who was the father of John the Baptist?",
            options: ["Zechariah", "Joseph", "Joachim", "Elkanah"],
            correctAnswer: "Zechariah"
        },
        {
            question: "How many chapters are in the Book of Psalms?",
            options: ["120", "150", "180", "200"],
            correctAnswer: "150"
        },
        {
            question: "What was the name of the island where John received Revelation?",
            options: ["Crete", "Patmos", "Cyprus", "Malta"],
            correctAnswer: "Patmos"
        },
        {
            question: "How many people were aboard Noah's Ark?",
            options: ["6", "7", "8", "10"],
            correctAnswer: "8"
        },
        {
            question: "Who said: 'Here i am. Send me'?",
            options: ["Isaiah", "Jeremiah", "Ezekiel", "Elijah"],
            correctAnswer: "Isaiah"
        },
        {
            question: "What was the name of the woman who hid the Israelite spies in Jericho?",
            options: ["Deborah", "Rahab", "Jael", "Ruth"],
            correctAnswer: "Rahab"
        },
        {
            question: "Who was the father of John the Apostle and James?",
            options: ["Zebedee", "Alphaeus", "Jonah", "Cleopas"],
            correctAnswer: "Zebedee"
        },
        {
            question: "Which king was turned into a beast?",
            options: ["Belshazzar", "Nebuchadnezzar", "Darius", "Cyrus"],
            correctAnswer: "Nebuchadnezzar"
        },
        {
            question: "Which disciple brought Nathanael to Jesus?",
            options: ["Peter", "John", "Andrew", "Philip"],
            correctAnswer: "Philip"
        },
        {
            question: "Who committed the first murder?",
            options: ["Cain", "David", "Lot", "Samson"],
            correctAnswer: "Cain"
        }
    ],

    blessed: [
        {
            question: "In Galatians 5, which of these is a fruit of the spirit?",
            options: ["Pride", "Fear", "Patience", "Love"],
            correctAnswer: "Patience"
        },
        {
            question: "How many stones did David pick up before facing Goliath?",
            options: ["3", "5", "7", "10"],
            correctAnswer: "5"
        },
        {
            question: "Which king saw the 'writing on the wall'?",
            options: ["Nebuchadnezzar", "Belshazzar", "Darius", "Cyrus"],
            correctAnswer: "Belshazzar"
        },
        {
            question: "Which son of David attempted to seize the throne while David was still alive?",
            options: ["Absalom", "Amnon", "Adonijah", "Solomon"],
            correctAnswer: "Adonijah"
        },
        {
            question: "Who was King Saul's father?",
            options: ["Kish", "Jesse", "Ner", "Abner"],
            correctAnswer: "Kish"
        },
        {
            question: "Which disciple died in a inverted cross?",
            options: ["Peter", "John", "Thomas", "Matthew"],
            correctAnswer: "Peter"
        },
        {
            question: "Who was the queen that visited Solomon to test his wisdom?",
            options: ["Queen of Egypt", "Queen of Persia", "Queen of Sheba", "Queen Esther"],
            correctAnswer: "Queen of Sheba"
        },
        {
            question: "Who was Esther's cousin and guardian?",
            options: ["Ezra", "Nehemiah", "Mordecai", "Haman"],
            correctAnswer: "Mordecai"
        },
        {
            question: "Which king threw Daniel into the lions' den?",
            options: ["Nebuchadnezzar", "Belshazzar", "Darius", "Cyrus"],
            correctAnswer: "Darius"
        },
        {
            question: "Who carried Jesus' cross?",
            options: ["Joseph of Arimathea", "Simon of Cyrene", "Peter", "Nicodemus"],
            correctAnswer: "Simon of Cyrene"
        },
        {
            question: "Who was Ruth's mother-in-law?",
            options: ["Naomi", "Leah", "Martha", "Elizabeth"],
            correctAnswer: "Naomi"
        },
        {
            question: "Which prophet confronted King David after his sin with Bathsheba?",
            options: ["Elijah", "Isaiah", "Nathan", "Samuel"],
            correctAnswer: "Nathan"
        },
        {
            question: "Which king of Judah was struck with leprosy after entering the temple to burn incense?",
            options: ["Hezekiah", "Uzziah", "Josiah", "Manasseh"],
            correctAnswer: "Uzziah"
        },
        {
            question: "Which tribe of Israel was Paul from?",
            options: ["Judah", "Benjamin", "Levi", "Dan"],
            correctAnswer: "Benjamin"
        },
        {
            question: "What was the name of Job's first daughter after his restoration?",
            options: ["Keziah", "Jemimah", "Dinah", "Abigail"],
            correctAnswer: "Jemimah"
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
    easy: 10,
    medium: 15,
    hard: 25,
    blessed: 50
}

modeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectedMode = button.dataset.mode
        startQuiz(selectedMode)
    })
})

function startQuiz(mode) {
    selectedQuestions = shuffleArray(allQuestions[mode]).slice(0,5)

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
    if (!currentUser) return // Segurança extra

    const xpPerCorrectAnswer = xpByMode[selectedMode] || 0
    const perfectBonus = correctAnswerInQuiz === selectedQuestions.length ? xpPerCorrectAnswer * 2 : 0
    const earnedXp = (correctAnswerInQuiz * xpPerCorrectAnswer) + perfectBonus

    currentUser.xp = currentUser.xp || 0
    currentUser.maxXp = currentUser.maxXp || 100
    currentUser.level = currentUser.level || 1

    currentUser.completedQuizzes = currentUser.completedQuizzes || 0
    currentUser.correctAnswers = currentUser.correctAnswers || 0
    currentUser.blessedQuizzes = currentUser.blessedQuizzes || 0
    currentUser.favoriteMode = modeNames[selectedMode]

    currentUser.completedQuizzes++
    currentUser.correctAnswers += correctAnswerInQuiz

    currentUser.totalQuestionsAnswered = currentUser.totalQuestionsAnswered || 0
    currentUser.totalQuestionsAnswered += selectedQuestions.length

    currentUser.xp += earnedXp

    if (selectedMode === "blessed") {
        currentUser.blessedQuizzes++
    }

    let leveledUp = false
    while (currentUser.xp >= currentUser.maxXp) {
        leveledUp = true
        currentUser.xp -= currentUser.maxXp
        currentUser.level++
        currentUser.maxXp = Math.floor(currentUser.maxXp * 1.25)
    }

    saveCurrentUser(currentUser)

    // Renderização do texto de XP
    if (earnedXpText) {
        if (perfectBonus > 0) {
            earnedXpText.innerHTML = `
            <span class="perfectBonusText">
                PERFECT QUIZ! DOUBLE XP BONUS!
            </span> <br> <br>
            +${earnedXp} XP earned`
        } else {
            earnedXpText.textContent = `+${earnedXp} XP earned`
        }
        earnedXpText.style.color = "#5eff00"
    }

    // Exibe os Popups
    if (quizFinishPopup) quizFinishPopup.classList.add("showPopup")
    if (quizFinishOverlay) quizFinishOverlay.classList.add("showOverlay")

    // 👇 CORREÇÃO: Usar .onclick garante que o evento anterior seja DELETADO
    // Isso impede o acúmulo de cliques fantasmas que quebram o multiplicador
    closeQuizFinish.onclick = function() {
        if (quizFinishPopup) quizFinishPopup.classList.remove("showPopup")
        if (quizFinishOverlay) quizFinishOverlay.classList.remove("showOverlay")

        if (leveledUp) {
            setTimeout(function() {
                if (newLevelText) newLevelText.innerHTML = `Congratulations<br>You reached level ${currentUser.level}!`
                if (levelUpPopup) levelUpPopup.classList.add("showPopup")
                if (levelUpOverlay) levelUpOverlay.classList.add("showOverlay")
            }, 250)
        } else {
            window.location.href = "JourneyScreen.html"
        }
    }

    closeLevelUp.onclick = function() {
        window.location.href = "JourneyScreen.html"
    }
}
nextQuestionButton.addEventListener("click", nextQuestion)
finishQuizButton.addEventListener("click", finishQuiz)