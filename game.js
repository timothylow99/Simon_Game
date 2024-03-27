var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;

var level = 0;
$("#level-title").text("Press A Key to Start");
$(document).keypress(function(){
    if(!started){
        
        started = true;
        nextSequence();
    
});



$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    makeSound(userChosenColor);
    animatePress(userChosenColor);
    console.log(userClickedPattern);
    
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    makeSound(randomChosenColor);
    
    console.log(gamePattern);
}

function makeSound(name){
    var audio = new Audio("./sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },50);
}

function checkAnswer(currentlevel){
    if(userClickedPattern[currentlevel] === gamePattern[currentlevel]){
        console.log("success")
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        $("#level-title").text("Game Over, Press Any Key to Restart");
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        console.log("wrong");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}