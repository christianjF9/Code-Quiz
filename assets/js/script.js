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
   new Question("Comonly used data types DO Not Include","alerts","strings","boolean","numbers"),
   new Question("how","b","wrong answera","wrong answerb","wrong answerc"),
   new Question("when","b","wrong answera","wrong answerb","wrong answerc"),
   new Question("where","b","wrong answera","wrong answerb","wrong answerc")
]

var mainEl = document.querySelector("#main");
var startEl = document.querySelector("#start");
var questionEl = document.querySelector("#question");
var feedbackEl = document.querySelector("#feedback");
var infoEl = document.querySelector("#info")
var choiceButtons = [];
var formEl;

var questionIndex= 0;
var currentQuestion;
var time = 75;

//picks a random question and displays it
var NextQuestion = function()
{
    currentQuestion = PullRandom(questions);
    console.log(currentQuestion);
    if (currentQuestion== undefined)
        showScore();
    else{
        questionEl.textContent =  currentQuestion.question;
        choiceButtons.forEach(choice => {
            choice.textContent = PullRandom(currentQuestion.choices);       
        });
        
    }
}

//start the quiz
var StartButtonHandler = function()
{
    startEl.remove();
    for(i=0;i<4;i++)
    {
        choiceButtons.push(createEl("button","answer"));
    }    
    Timer();
    questionEl.className = "";
    infoEl.className = "";
    infoEl.textContent = "";
    NextQuestion();
    mainEl.addEventListener("click",AnswerButtonHandler);    
}

//listens for the answer button and determins if the answer is right
var AnswerButtonHandler = function(event)
{
    var buttonEl = event.target;
    if(buttonEl.matches(".answer"))
    {
        feedbackEl.className= "";
        if(buttonEl.textContent== currentQuestion.correctAnswer)
        {
            feedbackEl.textContent= "Correct!";
            NextQuestion();
        }
        else
        {
            feedbackEl.textContent="wrong";
            time -= 20;
        }
        var feedbackTimeInterval = setInterval(function() {
            feedbackEl.className = "hide"
            clearInterval(feedbackTimeInterval);
        },1000);
    }

}

//gives initials and score to the highscore board and loads high score board 
var SubmitHsHandler = function(event)
{
    event.preventDefault();
    var initials = document.querySelector("input[name='initials']").value;
    console.log(initials);
    if(!initials){
        alert("Please enter your initials");
    }else
    {
        formEl.remove();
        DisplayHighScores(initials);
    }
}

//creates a element adds a class and adds it to main
var createEl = function(type, styleClass){
    var el = document.createElement(type);
    el.className = styleClass;
    feedbackEl.before(el)
    return el;
}

// returns a random element of an array and removes it from the array
var PullRandom = function(array)
{
    var index = Math.floor(Math.random()* array.length-1)
    return array.splice(index,1)[0];
}

// tells the user their score and ask them to fill out their initials
var showScore = function()
{
    choiceButtons.forEach(buttonEl =>{
        buttonEl.remove();
    });
    questionEl.textContent = "All done";
    infoEl.textContent ="";
    infoEl.textContent = "your final score is: " +time;
    formEl = createEl("form","");
    formEl.innerHTML ='<input type="text" name="initials" placeholder="Enter initials" /><button class="small-button" type="submit">submit</button> ';
    formEl.addEventListener("submit",SubmitHsHandler)
}

//loads the highscores and put the users scores in right part of the highscore board
var DisplayHighScores = function(initials)
{
    questionEl.textContent ="";
    var index = 0;
    var CurrentEntry = initials +"- "+time;
    var myScore = parseInt(CurrentEntry.slice(CurrentEntry.length-2,CurrentEntry.length));
    var index =0;
    highScores = loadHighScores();
    console.log(highScores);
    var score = highScores[index];
    console.log(myScore);
    index =0;

    for(index=0;i<highScores.length;)
    {
        score = highScores[index];
        if(score==undefined)
        break;
        score = parseInt(score.slice(score.length-2));
        if(myScore>score)
            break;
        index++;
        console.log(index);
        console.log(score);
    }
    hs2 = highScores.slice(index);
    console.log(hs2);
    highScores.splice(index);
    console.log(highScores);
    highScores.push(CurrentEntry);
    highScores = highScores.concat(hs2);
    console.log(highScores);
    highScores.forEach(score=>{
       var scoreEl = createEl("div","high-score");
       scoreEl.textContent = score;
    });
    saveEl = createEl("button","small-button");
    saveEl.textContent = "save";
    saveEl.addEventListener("click",SaveHighScores(highScores));
    backEl = createEl("button","small-button");
    backEl.textContent = "go back";
    backEl.addEventListener("click",BackHandler);
}

    var BackHandler = function(){
        location.reload();
    }

var SaveHighScores = function(highScores){
    localStorage.setItem("highscore", JSON.stringify(highScores));
}
var loadHighScores = function(){
    highScores = localStorage.getItem("highscore");
    highScores = JSON.parse(highScores);
    console.log(highScores);
    if(!highScores) return [];
    else return highScores;
}

var Timer = function() {
    var timerEl = document.querySelector("#timer");
    var timeInterval = setInterval(function() {
      if(time==0){
        console.log("times up");
        showScore();
        clearInterval(timeInterval);
      }
      else{
        time--;
        timerEl.textContent = "time: "+time; 
      }
    },1000);
}
startEl.addEventListener("click",StartButtonHandler)
