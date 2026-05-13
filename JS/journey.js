const user = getCurrentUser()

if (!user) {
    alert ("You need to log in first!")
    window.location.href = "loginScreen.html"
}

//PROGRESS / LEVEL
const fill = document.querySelector("#xpFill")
const text = document.querySelector("#xpTxt")
const journeyLevel = document.querySelector("#journeyLevel")
const journeyTitle = document.querySelector("#journeyTitle")

if (user) {
    const xp = user.xp || 0
    const maxXp = user.maxXp || 100
    const percent = (xp / maxXp) * 100

    if (fill) {
        fill.computedStyleMap.width = percent + "%"
    }

    if (text) {
        text.textContent = xp + " / " + maxXp + " XP"
    }

    if (journeyLevel) {
        journeyLevel.textContent = `Level ${user.level}`
    }

    if (journeyTitle) {
        journeyTitle.textContent = getLevelTitle(user.level)
    }
}


//STATS
const completedQuizzes = document.querySelector("#completedQuizzes")
const blessedQuizzes = document.querySelector("#blessedQuizzes")
const higherStreak = document.querySelector("#higherStreak")
const achievementsUnlocked = document.querySelector("#achievementsUnlocked")
const globalRanking = document.querySelector("#globalRanking")
const titlesUnlocked = document.querySelector("#titlesUnlocked")
const winPercentage = document.querySelector("#winPercentage")
const favoriteMode = document.querySelector("#favoriteMode")
const favoriteDifficulty = document.querySelector("#favoriteDifficulty")

if (user) {
    if (completedQuizzes) {
        completedQuizzes.textContent = user.completedQuizzes || 0
    }

    if (blessedQuizzes) {
        blessedQuizzes.textContent = user.blessedQuizzes || 0
    }

    if (higherStreak) {
        higherStreak.textContent = user.higherStreak || 0
    }

    if (achievementsUnlocked) {
        achievementsUnlocked.textContent = user.achievementsUnlocked || 0
    }

    if (globalRanking) {
        globalRanking.textContent = user.globalRanking || "Unranked"
    }

    if (titlesUnlocked) {
        titlesUnlocked.textContent = user.titlesUnlocked || 0
    }

    if (winPercentage) {
        winPercentage.textContent =`${ user.winPercentage || 0}%`
    }

    if (favoriteMode) {
        favoriteMode.textContent = user.favoriteMode || "None"
    }

    if (favoriteDifficulty) {
        favoriteDifficulty.textContent = user.favoriteDifficulty || "None"
    }
}



//RANK IMAGE / RANK TEXT
const rankImage = document.querySelector("#rankImage")
const rankText = document.querySelector("#rankText")

const rankImages = {
    "seed": "rank-imgs/seed_rank-removebg-preview.png",
    "seed+": "rank-imgs/seed+_rank-removebg-preview.png",

    "rift": "rank-imgs/rift_rank-removebg-preview.png",
    "rift+": "rank-imgs/rift+_rank-removebg-preview (1).png",

    "flux": "rank-imgs/flux_rank-removebg-preview (1).png",
    "flux+": "rank-imgs/flux+_rank.png",

    "ultra": "rank-imgs/ultra_rank-removebg-preview.png",
    "ultra+": "rank-imgs/ultra+_rank.png",

    "ascend": "rank-imgs/ascend_rank-removebg-preview.png",
    "ascend+": "rank-imgs/ascend+_rank-removebg-preview.png",

    "eclipse": "rank-imgs/eclipse_rank.png"
}

const rankNames = {
    "seed": "Seed",
    "seed+": "Seed +",

    "rift": "Rift",
    "rift+": "Rift +",

    "flux": "Flux",
    "flux+": "Flux +",

    "ultra": "Ultra",
    "ultra+": "Ultra +",

    "ascend": "Ascend",
    "ascend+": "Ascend +",

    "eclipse": "Eclipse"
}

const rankColors = {
    "seed": "#23E835",
    "seed+": "#6CFF75",

    "rift": "#C0C0C0",
    "rift+": "#E5E7EB",

    "flux": "#C8A2FF",
    "flux+": "#E0B8FF",

    "ultra": "#B8860B",
    "ultra+": "#FFD700",

    "ascend": "#E6A8A8",
    "ascend+": "#F4B6C2",

    "eclipse": "#FFFFFF"
}

const rankGlows = {
    "seed": "0 0 12px #23E835",
    "seed+": "0 0 14px #6CFF75",

    "rift": "0 0 12px #C0C0C0",
    "rift+": "0 0 14px #E5E7EB",

    "flux": "0 0 14px #C8A2FF",
    "flux+": "0 0 16px #E0B8FF",

    "ultra": "0 0 14px #B8860B",
    "ultra+": "0 0 16px #FFD700",

    "ascend": "0 0 14px #E6A8A8",
    "ascend+": "0 0 16px #F4B6C2",

    "eclipse": "0 0 18px #FFFFFF"
}

if (user) {
    const currentRank = user.rank || "seed"

    if (rankImage) {
        rankImage.src = rankImages[currentRank] || rankImages["seed"]
    }

    if (rankText) {
        rankText.textContent = rankNames[currentRank] || "Seed"
        rankText.style.color = rankColors[currentRank] || rankColors["seed"]
        rankText.style.textShadow = rankGlows[currentRank] || rankGlows["seed"]
    }
}



//DAY VERSE
const verses = [
    {
        ref: "Proverbs 16:3",
        text: "'Commit to the Lord whatever you do, and he will establish your plans.'"
    },
    {
        ref: "Joshua 1:9",
        text: "'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.'"
    },
    {
        ref: "John 16:33",
        text: "'I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world'"
    },
    {
        ref: "Matthew 11:28",
        text: "'Come to me, all you who are weary and burdened, and I will give you rest.'"
    },
    {
        ref: "John 14:6",
        text: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'"
    },
    {
        ref: "1 Thessalonians 5:18",
        text: "'give thanks in all circumstances; for this is God’s will for you in Christ Jesus.'"
    },
    {
        ref: "Psalms 37:5",
        text: "'Commit your way to the Lord, trust in him and he will do this:'"
    }
]

const today = new Date();

const dayNumber =
    today.getFullYear() +
    today.getMonth() +
    today.getDate();

const index = dayNumber % verses.length;

const verseText = document.querySelector("#verseText");
const verseRef = document.querySelector("#verseRef");

if (verseRef && verseText) {
    verseRef.textContent = verses[index].ref;
    verseText.textContent = verses[index].text;
}


//BATTLE BAR
function updateBattleBar(wins, losses) {
    const win = document.querySelector(".wins")
    const loss = document.querySelector(".losses")
    const battleTxt = document.querySelector(".battleTxt")
    const middleLine = document.querySelector(".middleLine")

    if (!win || !loss || !battleTxt || !middleLine) {
        return
    }

    const total = wins + losses

    if (total === 0) {
        win.style.width = "50%"
        loss.style.width = "50%"
        middleLine.style.width = "50%"
        battleTxt.innerText = "0 wins | 0 losses"
        return
    }

    const winPercent = (wins / total) * 100
    const lossPercent = (losses / total) * 100

    win.style.width = winPercent + "%"
    loss.style.width = lossPercent + "%"
    middleLine.style.left = winPercent + "%"

    battleTxt.innerText = `${wins} Wins | ${losses} Losses`
}

if (user) {
    updateBattleBar(user.wins || 0, user.losses || 0)
}


//RANK BAR
const rankFill = document.querySelector(".rankFill")

if (rankFill && user) {
    const rankXp = user.rankXp || 0
    const maxRankXp = user.maxRankXp || 1000

    const rankPercent = (rankXp / maxRankXp) * 100

    rankFill.style.width = rankPercent + "%"
}


//LEVEL TITLE
function getLevelTitle(level) {
    if (level >= 50) {
        return "(Prophet)"
    }

    if (level >= 30) {
        return "(Pilgrim)"
    }

    if (level >= 15) {
        return "(Disciple)"
    }

    if (level >= 5) {
        return "(Seeker)"
    }

    return "(Beginner)"
}