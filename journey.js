let fill = document.querySelector('#xpFill')
let text = document.querySelector('#xpTxt')

let xp = 740
let maxXp = 1200

let percent = (xp / maxXp) * 100

fill.style.width = percent + "%"
text.textContent = xp + " / " + maxXp

const verses = [
    {
        ref: "Provérbios 16:3",
        text: "'Consagre ao Senhor tudo o que você faz, e os seus planos serão bem sucedidos.'"
    },
    {
        ref: "Josué 1:9",
        text: "'Não fui eu que ordenei a você? Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar.'"
    },
    {
        ref: "João 16:33",
        text:"'Eu disse essas coisas para que em mim vocês tenham paz. Neste mundo vocês terão aflições; contudo, tenham ânimo! Eu venci o mundo.'"
    },
    {
        ref: "Mateus 11:28",
        text: "'Venham a mim, todos os que estão cansados e sobrecarregados, e eu darei descanso a vocês.'"
    },
    {
        ref: "João 14:6",
        text: "'Respondeu Jesus: 'Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai, a não ser por mim.''"
    },
    {
        ref: "1 Tessalonicenses 5:18",
        text: "'Deem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus.'"
    },
    {
        ref: "Salmos 37:5",
        text: "'Entregue o seu caminho ao Senhor; confie nele, e ele agirá.'"
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