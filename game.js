const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressBar = document.querySelector(".progress-bar");
const scoreText = document.querySelector('.score-text');
const questionNumber = document.getElementById('questionNumber');
const gameID = document.getElementById('game');
const loaderID = document.getElementById('loader');

let currentQuestion = {}
let acceptingAnswers = true;
let score = 0;
let questionCounter =0;
let availableQuestions = [];

let questions = [];

fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'). then(res =>{
  console.log(res);
  return res.json();
}). then(loadedQuestions => {
  console.log(loadedQuestions.results);
  questions = loadedQuestions.results.map(loadedQuestion => {
    const formattedQuestion = {
      question: loadedQuestion.question
    };

    const answerChoices = [...loadedQuestion.incorrect_answers ];
    formattedQuestion.answer =  Math.floor(Math.random() * 3)+1;
    answerChoices.splice(formattedQuestion.answer -1,0,loadedQuestion.correct_answer);

    answerChoices.forEach((choice, index) =>{
    	formattedQuestion['choice' +(index+1)] = choice;
    })
    console.log(formattedQuestion);
    return formattedQuestion;
  })
  gameID.classList.remove('d-none');
  loaderID.classList.add('d-none');
  setTimeout(() =>{
  	startGame();	
  },200)
  
})
.catch(err =>{
  console.error(err);
})
    
//CONSTANTS
const MAX_QUESTIONS = 10;

startGame = () => {
	questionCounter= 0;
	score =0;
	availableQuestions = [...questions];
	getNewQuestion();
}


getNewQuestion = () => {
	if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
		localStorage.setItem('mostRecentScore',score);
		return window.location.assign("end.html")
	}
	questionCounter++;
	questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	question.innerText = currentQuestion.question;
	questionNumber.innerText = questionCounter + "/" + MAX_QUESTIONS;

	choices.forEach(choice => {
		const number = choice.dataset["number"];
		choice.innerText = currentQuestion['choice'+number];
	})

	availableQuestions.splice(questionIndex, 1);
	progressBar.style.cssText = "width:+"+questionCounter/MAX_QUESTIONS * 100 +"%";
	console.log("width:+"+questionCounter/MAX_QUESTIONS * 100 +"%");
};

choices.forEach(choice => {
	choice.addEventListener('click', e => {
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset["number"];

		if(selectedAnswer == currentQuestion.answer) {
			score+=10;
			scoreText.innerText = score;
		};
		const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
		selectedChoice.parentElement.classList.add(classToApply);
		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		},500)
		

		
	})
});