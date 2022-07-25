//crear 12 cartas : create 12 cards. 

const cardArray = [             //array of cards using object's
    {
        name: 'fries',
        img: 'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    }
]
// console.log(cardArray)
cardArray.sort(() => 0.5 - Math.random())  //get randomnly values from an array. (0 or random element to shuffle)

const gridDisplay = document.querySelector('#grid') //#id or use getelementbyId
const resultDisplay = document.querySelector('#result')
let cardsChosen = []
let cardsChosenIds = []
let cardsWon = [] //cuantos match lograste

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {         //you could replace this by an arrow function if you want
        const card = document.createElement('img') //good method to create an element, metodo p/crear un elemento
        card.setAttribute('src', 'images./blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        // console.log(card, i)
        gridDisplay.appendChild(card) 
    }
}
createBoard()

function checkMatch() {
   const cards = document.querySelectorAll('img') //dentro del grid buscar el img, opcional: #grid img
   const optionOneId = cardsChosenIds[0]
   const optionTwoId = cardsChosenIds[1] 
    // console.log('check for match')
    //console.log(cards)
    if (optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert('You have clicked the same image! WELL DONE')
    }

    if (cardsChosen[0] == cardsChosen[1]) {
        alert('You found a match!')
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)  //cuando sea match que remueva el event de seguir clickeando
        cards[optionTwoId].removeEventListener('click', flipCard)
    }else {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert('Sorry Folk, Try Again')
    }
    resultDisplay.textContent = cardsWon.length
    cardsChosen = []
    cardsChosenIds = []

    if(cardsWon.length == cardArray.length/2) {
        resultDisplay.textContent = 'Congratulations you found them all'
    }
}

function flipCard() {           //function to allow us to flip de card : funcion que nos ayuda a voltear las cartas
    console.log(cardArray)
    const cardId = this.getAttribute('data-id') 
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    
    this.setAttribute('src', cardArray[cardId].img) //now go to array and get the img trough thei id's.(show the image of the card flipped)

    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500 )
    }
}