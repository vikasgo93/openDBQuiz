const userName = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
//console.log(userName,saveScoreBtn);
const mostRecentScore = localStorage.getItem('mostRecentScore')
const scoreDisplay = document.getElementById('scoreDisplay');
scoreDisplay.innerHTML = mostRecentScore;

const homeBtn = document.getElementById('goHome');
const playAgainBtn = document.getElementById('playAgain');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores);

const MAX_HIGH_SCORES = 5;

homeBtn.addEventListener('click',() =>{
	window.location.assign('index.html');
})

playAgainBtn.addEventListener('click',() =>{
	window.location.assign('game.html')
})

saveScoreBtn.addEventListener('click' ,() => {
	window.location.assign('index.html');
})

saveHighScore = (e) => {
	console.log("clicked the save button");
	e.preventDefault();



	const score = {
		score:mostRecentScore,
		name: userName.value
	}
	console.log(highScores);
	highScores.push(score);
	highScores.sort((a, b) => b.score - a.score);
	highScores.splice(5);

	localStorage.setItem("highScores",JSON.stringify(highScores));
	
}

