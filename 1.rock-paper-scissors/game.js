const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');

let userChoice //global

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id 
    userChoiceDisplay.innerHTML = userChoice
    generateComputerChoice()
    getResult()
}))

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3) + 1 //same to put 3 = possibleChoices.length
    // console.log(randomNumber)
    if(randomNumber === 1) {
        computerChoice = 'rock'
    }
    if(randomNumber === 2) {
        computerChoice = 'scissors'     //you can change this, by ternary operators": , ?"
    }
    if(randomNumber === 3) {
        computerChoice = 'paper'
    }
    computerChoiceDisplay.innerHTML = computerChoice
}

/////function for the result

function getResult() {
    if (computerChoice === userChoice) {
        result = 'its a draw! 🤝 '
      }
      if (computerChoice === 'rock' && userChoice === "paper") {
        result = 'You are the Winner, Champ 🏆'
      }
      if (computerChoice === 'rock' && userChoice === "scissors") {
        result = 'You lost, sorry mate! 😢'
      }
      if (computerChoice === 'paper' && userChoice === "scissors") {
        result = 'You are the Winner, Champ🏆'
      }
      if (computerChoice === 'paper' && userChoice === "rock") {
        result = 'You lost, sorry mate! 😢'
      }
      if (computerChoice === 'scissors' && userChoice === "rock") {
        result = 'You are the Winner, Champ🏆'
      }
      if (computerChoice === 'scissors' && userChoice === "paper") {
        result = 'You lost, sorry mate! 😢'
      }
      resultDisplay.innerHTML = result
}