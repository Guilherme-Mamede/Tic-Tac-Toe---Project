//Initial data
let square = {
  a1: '', a2: '', a3: '',
  b1: '', b2: '', b3: '',
  c1: '', c2: '', c3: ''
} 
let player = '';
let warning = '';
let playing = false;

reset();

//Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', itemClick);
})

//Functions
function itemClick(event){
  let item = event.target.getAttribute('data-item');
  if(playing && square[item] === '') {
    square[item] = player;
    renderSquare();
    togglePlayer();
  }
}

function reset() {
  warning = '';

  let random = Math.floor(Math.random() * 2);
  player = (random === 0) ? 'x' : 'o';

  for(let i in square) {
    square[i] = '';
  }

  playing = true

  renderSquare();
  renderInfo();
}

function renderSquare() {
  for(let i in square) {
    let item = document.querySelector(`div[data-item=${i}]`)
    item.innerHTML = square[i];
  }

  checkGame();
}

function renderInfo() {
  document.querySelector('.turn').innerHTML =  player
  document.querySelector('.result').innerHTML = warning
}

function togglePlayer() {
  player = (player === 'x') ?'o':'x';
  renderInfo()
}

function checkGame() {
   if(checkWinnerFor('x')){
      warning = 'O "x" won';
      playing = false 
   }else if (checkWinnerFor('o')) {
      warning = 'O "o" won';
      playing = false;
   }else if(isFull()) {
      warning = 'Draw'
      playing = false;
   }
}

function checkWinnerFor(player) {
    let pos = [
      'a1,a2,a3',
      'b1,b2,b3',
      'c1,c2,c3',

      'a1,b1,c1', 
      'a2,b2,c2', 
      'a3,b3,c3',
      
      'a1,b2,c3',
      'a3,b2,c1',

      'a1,b2,c1',
      'a3,b2,c3',
      'c1,b2,c3',
      'a1,b2,a3',

      'b1,a2,b3',
      'b1,c2,b3'
    ];

    for(let w in pos) {
      let pArray = pos[w].split(',');
      let hasWon = pArray.every(option => square[option] === player)
      if(hasWon) {
        return true;
      }
    }

    return false;
}


function isFull() {
    for(let i in square) {
      if(square[i] === ''){
        return false;
      }
    }

    return true;
}