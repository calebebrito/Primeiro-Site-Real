let fill = document.querySelector('#xpFill')
let text = document.querySelector('#xpTxt')

let xp = 1260
let maxXp = 2000

let percent = (xp / maxXp) * 100

fill.style.width = percent + "%"
text.textContent = xp + " / " + maxXp

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
        text:"'I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world'"
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


const today = new Date()

const dayNumber =
    today.getFullYear() +
    today.getMonth() +
    today.getDate()

const index = dayNumber % verses.length

const verseText = document.querySelector('#verseText')
const verseRef = document.querySelector('#verseRef')

const random = Math.floor(Math.random() * verses.length)

verseRef.textContent = verses[index].ref
verseText.textContent = verses[index].text


function updateBattleBar(wins, losses) {
    const win = document.querySelector(".wins")
    const loss = document.querySelector(".losses")
    const battleTxt = document.querySelector(".battleTxt")
    const middleLine = document.querySelector(".middleLine")


    const total = wins + losses

    if (total === 0) {
        win.style.width = "50%"
        loss.style.width = "50%"
        middleLine.style.left = "0%"
        battleTxt.innerText = "0 Wins | 0 Losses"
        return
    }

    const winPercent = (wins / total) * 100
    const lossPercent = (losses / total) * 100

    win.style.width = winPercent + "%"
    loss.style.width = lossPercent + "%"
    middleLine.style.right = lossPercent + "%"

    battleTxt.innerText = `${wins} Wins | ${losses} Losses`
}

updateBattleBar(243, 114)



let rankFill = document.querySelector('.rankFill')

let xp2 = 740
let maxXp2 = 1200

let percent2 = (xp2 / maxXp2) * 100

rankFill.style.width = percent2 + "%"