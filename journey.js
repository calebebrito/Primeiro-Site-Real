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
        
    }
]


dayVerse = document.querySelector('#verseOfDay')

const today = new Date()
const dayNumber = 
    today.getFullYear() +
    today.getMonth() +
    today.getDate()

const index = dayNumber % verses.length
const verseToday = verses[index]

dayVerse.textContent = verseToday


"Provérbios 16:3 - 'Consagre ao Senhor tudo o que você faz, e os seus planos serão bem sucedidos.'",
    "Josué 1:9 - 'Não fui eu que ordenei a você? Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar.'",
    "João 16:33 - 'Eu disse essas coisas para que em mim vocês tenham paz. Neste mundo vocês terão aflições; contudo, tenham ânimo! Eu venci o mundo.'",
    "Mateus 11:28 - 'Venham a mim, todos os que estão cansados e sobrecarregados, e eu darei descanso a vocês.'",
    "João 14:6 - 'Respondeu Jesus: 'Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai, a não ser por mim.''",
    "1 Tessalonicenses 5:18 - 'Deem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus.'",
    "Salmos 37:5 - 'Entregue o seu caminho ao Senhor; confie nele, e ele agirá'"