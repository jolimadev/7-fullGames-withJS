const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left'); //id
const score = document.querySelector('#score');

//global:
let result = 0;
let hitPosition
let currentTime = 10;
let timerId = null


function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)]  //obtener la posición de un cuadrado random. floor p/hacerlo entero al num. , obtain a random position number.
    // console.log(randomPosition);
    // console.log((Math.random() * 9))
    randomSquare.classList.add('mole')
    ///////////////////////////////
    hitPosition = randomSquare.id
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
      if (square.id == hitPosition) {
        result++
        score.textContent = result
        hitPosition = null
      }
    })
  })

function moveMole() {
   
    timerId = setInterval(randomSquare,400)
} //se mueva de forma random con un intervalo, i set an interval to move the square.

moveMole()

///contador regresivo| Timer:

function countDown () {
    currentTime--
    timeLeft.textContent = currentTime

    if(currentTime == 0){
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert('Game Over! Your final score is: ' + result)
    }
}

let countDownTimerId = setInterval(countDown, 1000)