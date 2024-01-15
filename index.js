var buttonColours = ["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started = false;
var level = 0;

//random button
function nextSequence() {
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);

    var randomNumber = Math.floor(Math.random() *4);
    var randomChosenColor = buttonColours[randomNumber];

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}   

//what btn chosen by user
$(".btn").click(function() {
    var userChosenColor= $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    checkAnswer(userClickedPattern.length-1);

    animatePress(userChosenColor);
    playSound(userChosenColor);
});  

//button sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//buttonanime
function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout( function(){
        $("#"+currentColor).removeClass("pressed")
    }, 100 );
}

//game starts
$("body").keypress(function() {
    if(!started){
        $("h1").text("Level "+level);
        started = true;
        nextSequence();   
        starting();
    }
});

//checking game sequence  
function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if(userClickedPattern.length-1 === gamePattern.length-1 )
        
            setTimeout(function() {
                nextSequence();
            },1000);
    }

    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout( function(){
            $("body").removeClass("game-over")
        }, 200 );

        $("h1").text("Game Over, Press Any Key To Restart");
        startOver();

        console.log("failure");
    }
}

//starting again
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


