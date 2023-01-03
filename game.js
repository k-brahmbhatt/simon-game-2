var gamePattern = [];
var userClickPattern = [];
var gameOn = false;
var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

// function to play sound

function playSound(name){
    new Audio("sounds/"+name+".mp3").play();
}

// To start a game

$(document).click(function (e) { 
    if (!gameOn){
        gameOn = true;
        nextSequence();      
    }
});

function nextSequence() {
    userClickPattern = [];

    level++; 
    $("h1").text("Level "+level);

    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(50).fadeIn(50);
    playSound(randomChosenColour);

   
}

$(".btn").click(function (e) { 
        
        var userChosenColour = $(e.target).attr("id");
        userClickPattern.push(userChosenColour);
    
        playSound(userChosenColour);

        animatePress(userChosenColour);
        
        checkAnswer(userClickPattern.length-1);
        
    });


// function to animate user clicks

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}




function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]){
        console.log("Pass");
        if(userClickPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else {

        console.log("fail");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");

        $(document).click(function(e){
            startOver();
        });

    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    userClickPattern = [];
    gameOn = false;
}