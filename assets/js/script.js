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

var mainEl = document.querySelector("#main");
var startEl = document.querySelector("#start");
var questionEl = document.querySelector("#question");
var feedbackEl;
var choiceButtons = [];
var formEl;

var questionIndex= 0;
var currentQuestion;
var time = 75;


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
var StartButtonHandler = function()
{
    startEl.remove();
    for(i=0;i<4;i++)
    {
        choiceButtons.push(createEl("button","answer"));
    }
    
    feedbackEl = createEl("h2","feedback");
    Timer();
    NextQuestion();
    mainEl.addEventListener("click",AnswerButtonHandler);    
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

var createEl = function(type, styleClass){
    var el = document.createElement(type);
    el.className = styleClass;
    mainEl.appendChild(el);
    return el;
}

var PullRandom = function(array)
{
    var index = Math.floor(Math.random()* array.length-1)
    return array.splice(index,1)[0];
}

var showScore = function()
{
    console.log("showing score");
    choiceButtons.forEach(buttonEl =>{
        buttonEl.remove();
    });
    questionEl.textContent = "All done";
    yourScoreEl = createEl("div","yourScore");
    yourScoreEl.textContent = "your final score is: " +time;
    formEl = createEl("form","");
    formEl.innerHTML ='<input type="text" name="initials" placeholder="Enter initials" /><button class="" type="submit">submit</button> ';
    formEl.addEventListener("submit",SubmitHsHandler)
}

var DisplayHighScores = function(initials)
{
    questionEl.textContent ="";
    var index = 0;
    var CurrentEntry = initials +"- "+time;
    var myScore = parseInt(CurrentEntry.slice(CurrentEntry.length-2,CurrentEntry.length));
    var index =0;
    //highScores.push(myentry);
    highScores = loadHighScores();
    console.log(highScores);
    var score = highScores[index];
    //score = parseInt(score.slice(score.length-2));
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
  //  while(myScore<=score&& index < highScores.length) {

   // }   
    hs2 = highScores.slice(index);
    console.log(hs2);
    highScores.splice(index);
    console.log(highScores);
    highScores.push(CurrentEntry);
    highScores = highScores.concat(hs2);

   // highScores.copyWithin(index,highScores.length-1,highScores.length);
   // highScores.pop();
    console.log(highScores);
    highScores.forEach(score=>{
       var scoreEl = createEl("div","high-score");
       scoreEl.textContent = score;
    });
    saveEl = createEl("button","");
    saveEl.textContent = "save";
    saveEl.addEventListener("click",SaveHighScores(highScores));
    mainEl.innerHTML += '<input type="button" value="go back" onClick="window.location.reload(true)"></input>'
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
