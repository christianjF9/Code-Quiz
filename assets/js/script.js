var Question = class Question
{
    constructor(question, correctAnswer,choice1,choice2,choice3)
    {
        this.question = question
        this.correctAnswer = correctAnswer;
        this.choices= [correctAnswer,choice1,choice2,choice3];
    }   
}

var questions = 
[
   new Question("why","a","wrong answer1","wrong answer2","wrong answer3"),
   new Question("how","b","wrong answera","wrong answerb","wrong answerc"),
   new Question("when","b","wrong answera","wrong answerb","wrong answerc"),
   new Question("where","b","wrong answera","wrong answerb","wrong answerc")
]

var choiceButtons = [];

var mainEl = document.querySelector("#main");
var questionEl = document.querySelector("#question");
var feedbackEl;
var questionIndex= 0;
var currentQuestion;

var NextQuestion = function()
{
    currentQuestion = PullRandom(questions);
    questionEl.textContent =  currentQuestion.question;
    choiceButtons.forEach(choice => {
        choice.textContent = PullRandom(currentQuestion.choices);
        
    });
}
var AnswerButtonHandler = function(event)
{
    var buttonEl = event.target;
    if(buttonEl.matches(".answer"))
        if(buttonEl.textContent== currentQuestion.correctAnswer)
        {
            feedbackEl.textContent= "Correct!";
            NextQuestion();
        }
        else
        {
            feedbackEl.textContent="wrong";
        }
}
var PullRandom = function(array)
{
    var index = Math.floor(Math.random()* array.length-1)
    return array.splice(index,1)[0];
}

var createEl = function(type, styleClass){
    var el = document.createElement(type);
    el.className = styleClass;
    mainEl.appendChild(el);
    return el;
}

for(i=0;i<4;i++)
{
    choiceButtons.push(createEl("button","answer"));
}
feedbackEl = createEl("h2","feedback");

NextQuestion();
mainEl.addEventListener("click",AnswerButtonHandler)
