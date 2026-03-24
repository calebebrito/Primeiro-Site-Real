let fill = document.querySelector('#xpFill')
let text = document.querySelector('#xpTxt')

let xp = 740
let maxXp = 1200

let percent = (xp / maxXp) * 100

fill.style.width = percent + "%"
text.textContent = xp + " / " + maxXp