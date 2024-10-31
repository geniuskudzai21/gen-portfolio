
let score = JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0
}; 

updateScore();

function playGame(playerMove){
const computerMove = pickComputerMove();
let result = '';

if(playerMove === 'tail'){
    if(computerMove === 'tail'){
        result = 'win';
    }else if(computerMove === 'head'){
        result = 'lose';
    }
    
} else if(playerMove === 'head'){
    if(computerMove === 'head'){
        result = 'win';
    }else if(computerMove === 'tail'){
        result = 'lose';
    }
}

if(result === 'win'){
   score.wins += 1;
}else if(result === 'lose'){
    score.losses += 1;
}
localStorage.setItem('score',JSON.stringify(score));

document.querySelector('.js-result').innerHTML = `You ${result}`;
document.querySelector('.js-choices').innerHTML = `You picked ${playerMove}, Computer picked ${computerMove}`;
updateScore();
}

function updateScore(){
document.querySelector('.js-score')
.innerHTML = `wins ${score.wins}, losses: ${score.losses}`;    
}

function pickComputerMove(){
let computerMove = '';
const randomNumber = Math.random();

if(randomNumber < 0.5){
    computerMove = 'head';
} else if(randomNumber > 0.5){
computerMove = 'tail';
}
return computerMove;
}
document.querySelector('.js-btn-head').addEventListener('click',()=>{
    playGame('head');
});
document.querySelector('.js-btn-tail').addEventListener('click',()=>{
    playGame('tail');
});
document.querySelector('.js-btn-autoplay').addEventListener('click',()=>{
    autoPlay();
});

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
    if(!isAutoPlaying){
        intervalId = setInterval(()=>{
            const playerMove = pickComputerMove();
            playGame(playerMove);
        },1000);
        isAutoPlaying = true;
    }else{
        clearInterval(intervalId);
        isAutoPlaying = false;
    }


}












