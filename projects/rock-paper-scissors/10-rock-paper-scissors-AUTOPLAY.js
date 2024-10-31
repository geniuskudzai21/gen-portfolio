let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    ties: 0,
    losses: 0
  };

updateScoreElement();

function pickComputerMove(){
  const randomNumber = Math.random();
  let compMove = '';

  if(randomNumber >= 0 && randomNumber < 1/3){
    compMove = 'rock';
  } else if(randomNumber >= 1/3 && randomNumber < 2/3){
    compMove = 'paper';
  } else if(randomNumber >= 2/3 && randomNumber < 1){
    compMove = 'scissors';
  }
  return compMove;
}

function updateScoreElement(){
  document.querySelector('.js-score')
.innerHTML = `wins: ${score.wins} ties: ${score.ties} losses: ${score.losses}`;
}

let isAutoPlaying = false;
let intervalId; 

function autoPlay(){
  if(!isAutoPlaying){
      intervalId = setInterval(()=>{
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000);
    isAutoPlaying = true;
  } else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click',()=>{
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click',()=>{
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click',()=>{
  playGame('scissors');
});

document.querySelector('.js-reset-button').addEventListener('click',()=>{
    score.wins =0;
    score.ties=0;
    score.losses=0;
    localStorage.removeItem('score'); 
    updateScoreElement();
});

document.querySelector('.js-autoplay-button').addEventListener('click',()=>{
  autoPlay();
})

document.body.addEventListener('keydown',(event)=>{
  if(event.key === 'r'){
   playGame('rock');
  }else if(event.key === 'p'){
    playGame('paper')
  }else if(event.key === 's'){
    playGame('scissors')
  }
});

function playGame(playerMove){
    const compMove = pickComputerMove();
    let result = '';

    if (playerMove === 'rock'){
      if(compMove === 'rock'){
        result = 'tie';
      }else if(compMove === 'paper'){
        result = 'lost';
      }else if(compMove === 'scissors'){
        result = 'win';
      }
    }else if(playerMove === 'paper'){
      if(compMove === 'rock'){
        result = 'win';
      }else if(compMove === 'paper'){
        result = 'tie';
      }else if(compMove === 'scissors'){
        result = 'lost';
      }
    }else if(playerMove === 'scissors'){
      if(compMove === 'rock'){
        result = 'lost';
      }else if(compMove === 'paper'){
        result = 'win';
      }else if(compMove === 'scissors'){
        result = 'tie';
      }
    }  

     if(result === 'win'){
      score.wins += 1;
     }else if(result === 'tie'){
      score.ties += 1;
     }else if(result === 'lost'){
      score.losses += 1;
     }

     localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves')
    .innerHTML = `You
<img src="rps/${playerMove}.png">
<img src="rps/${compMove}.png">
Computer`;   
}

