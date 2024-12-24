const buttons = document.querySelectorAll('.color')
const startGame = document.querySelector('.startGame')

let isStarted = false
let isSequencePlaying = false

startGame.addEventListener('click', ()=>{
    nextRound()
    isStarted = true
})



let sequence = []
let playerSequence = []
let score = 0
let colors = ['red', 'green', 'blue', 'yellow']


buttons.forEach(button=>{
    button.addEventListener('click', (event)=>{

        if(isSequencePlaying) return

        const color = event.target.id
        playerSequence.push(color)
        flashButton(color)
        checkPlayerSequence()
    })
})

function nextRound(){
    playerSequence = []

    let randomColor = colors[Math.floor(Math.random() * 4)];
    sequence.push(randomColor)
    score++

    playSequence()

}

function playSequence(){
    isSequencePlaying = true
    let index = 0

    const interval = setInterval(()=>{
        flashButton(sequence[index])
        index++
        if(index >= sequence.length){
            clearInterval(interval)
        }
    }, 1000);

    isSequencePlaying = false
}

function flashButton(color){
    const button = document.getElementById(color)
    button.style.opacity = '1'
    setTimeout(()=>{
        button.style.opacity = '0.2'
    }, 500)
}

function checkPlayerSequence(){
    const lastIndex = playerSequence.length - 1

    if (playerSequence[lastIndex] != sequence[lastIndex]){
        score--
        endGame()
    }
    else if(playerSequence.length == sequence.length){
        setTimeout(()=>{
            nextRound()
        }, 1000)
    }
}

function endGame(){
    alert('Your Score: ' + score)
    resetGame()
}

function resetGame(){
    sequence = []
    playerSequence = []
    score = 0
    
}