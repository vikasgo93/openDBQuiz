const highScoresList = document.getElementById("highScoresList");
const highScores = localStorage.getItem("highScores")? JSON.parse(localStorage.getItem("highScores")) : [];

highScores.map(score => {
	console.log(score.name + " -- " + score.score)
	let listScores = document.createElement("li");
	listScores.innerText = score.name + " : " + score.score;
	highScoresList.appendChild(listScores)
})


homeBtn = document.getElementById('goHome');
homeBtn.addEventListener("click", () => {
	setTimeout(() =>{
		window.location.assign('index.html');
	},200)
});