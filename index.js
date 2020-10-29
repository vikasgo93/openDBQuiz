let playBtn = document.getElementById('play');
let highScoresBtn = document.getElementById('highScores');


playBtn.addEventListener('click',() => {
	setTimeout(() =>{
		window.location.assign('game.html');
	},200)
})

highScoresBtn.addEventListener('click',() => {
	setTimeout(() =>{
		window.location.assign('highScores.html');
	},200)
})