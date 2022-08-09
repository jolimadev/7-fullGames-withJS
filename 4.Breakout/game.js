const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 300

let yDirection = 2
let xDirection = 2
//////////////////////////////////////////////
const userStart = [230, 10] //coordinates where my user gonna start
let currentPosition = userStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart
/////////////////////////////////
let timerId
let score = 0

//create Block with class. the movement of the bottom's
class Block {
  constructor(xAxis, yAxis) {
       this.bottomLeft = [xAxis, yAxis]
       this.bottomRight = [xAxis + blockWidth, yAxis]
       this.topLeft = [xAxis, yAxis + blockHeight]
       this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
  } 
}

//all my blocks, mis bloques
const blocks = [
    new Block(10,270), //xAxis & yAxis
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

//Draw my block function:
function addBlocks() {
      for (let i = 0; i < blocks.length; i++){
      const block = document.createElement('div')
      block.classList.add('block')
      block.style.left = blocks[i].bottomLeft[0] + 'px'
      block.style.bottom = blocks[i].bottomLeft[1] + 'px'
      grid.appendChild(block)
      // console.log(blocks[i].bottomLeft)
  }
}
addBlocks()

//add user, añadir usuario
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()

//add ball
const ball = document.createElement('div')
ball.classList.add('ball') /*add style from the css*/
grid.appendChild(ball)
drawBall()

//move a user
function moveUser(e) {
  switch(e.key) {
    case 'ArrowLeft':
        if(currentPosition[0] > 0) {
        currentPosition[0] -= 10
        drawUser()
      }
       break;
    case 'ArrowRight':
        if(currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] +=10
        drawUser()
      }
      break;

  }
}

document.addEventListener('keydown', moveUser) //anytime you press the key, the key r gonna move

//draw User
function drawUser() {
  user.style.left = currentPosition[0] + 'px'
  user.style.bottom = currentPosition[1] + 'px'
}

//draw Ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px'
  ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//move the ball, movimiento de la bola
function moveBall() {
  ballCurrentPosition[0] += xDirection
  ballCurrentPosition[1] += yDirection
  drawBall()
  checkForCollisions()
}

timerId = setInterval(moveBall, 20)

//check for collision, que tome las colisiones
function checkForCollisions() {
  //check for walls collision,si tocan o colisionan los muros del grid
  for (let i = 0; i < blocks.length; i++) {
    if 
    (
      (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
      ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]) 
    )
      {
      const allBlocks = Array.from(document.querySelectorAll('.block'))
      allBlocks[i].classList.remove('block')
      blocks.splice(i, 1)
      changeDirection()   
      score++
      scoreDisplay.innerHTML = score
      if (blocks.length == 0) {
        scoreDisplay.innerHTML = 'You Win, mate!'
        clearInterval(timerId)
        document.removeEventListener('keydown', moveUser)
      }
    }
  }
  // check for wall hits
  if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter))
  {
    changeDirection()
  }

  //check for user collision
  if
  (
    (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
    (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight ) 
  )
  {
    changeDirection()
  }

  //game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId)
    scoreDisplay.innerHTML = 'You lose! pal'
    document.removeEventListener('keydown', moveUser)
  }
}


function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2
    return
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2
    return
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2
    return
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2
    return
  }
}
  