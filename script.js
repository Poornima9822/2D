function keyCheck(event){

    var keyCode = event.which;

    if(keyCode == 13){
        //alert("Enter key");
        if(runAnimationId==0){
            runAnimationId = setInterval(boyRun,100);
            runSoundClip.play();
            moveBackgroundAnimationId = setInterval(moveBackground,100);
            scoreAnimationId = setInterval(updateScore,100);

            boxAnimationId = setInterval(moveBoxes,100); //move box
        }
    }

    if(keyCode == 32){
        //alert("Space key");
        if(jumpAnimationId == 0){
            clearInterval(runAnimationId); //stop run worker to start jump
            runSoundClip.pause(); // run sound stop for jump sound

            jumpAnimationId = setInterval(boyJump,100);
            jumpSoundClip.play(); // play jump sound
        }
    }
}

var runImageNumber = 1;
var runAnimationId = 0; //worker
var runSoundClip = new Audio("run.mp3"); //run sound
runSoundClip.loop = true; //repeat soundClip



function boyRun(){
    runImageNumber = runImageNumber + 1;

    if(runImageNumber == 9 ){
        runImageNumber = 1;
    }

    document.getElementById("boy").src = "Run ("+ runImageNumber +").png";
}

var x  = 0; //background position
var moveBackgroundAnimationId = 0;

function moveBackground(){
    x = x - 20; //10px times move forward

    document.getElementById("backgroundBox").style.backgroundPositionX = x+"px";
}

var score = 0;
var scoreAnimationId = 0;

function updateScore(){
    score = score + 5;

    document.getElementById("score").innerHTML = score;
}

var jumpImageNumber = 1;
var jumpAnimationId = 0;

var jumpSoundClip = new Audio("jump.mp3"); // jump sound

var boyMarginTop = 400;

function boyJump(){

    if (jumpImageNumber <= 6) {
        boyMarginTop = boyMarginTop - 30;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber >= 7) {
        boyMarginTop = boyMarginTop + 30;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }

    jumpImageNumber = jumpImageNumber + 1;

    if(jumpImageNumber == 13){
        jumpImageNumber = 1;
        clearInterval(jumpAnimationId);//after one jump, stop jumping
        jumpAnimationId = 0; //stop jump worker
        runAnimationId = setInterval(boyRun,100); //start run worker
        //runSoundClip.currentTime = 0; //start over
        runSoundClip.play(); // start run sound

        //if game starts from jump
        if(moveBackgroundAnimationId == 0){
            moveBackgroundAnimationId = setInterval(moveBackground,100);
        }
        if(scoreAnimationId == 0){
            scoreAnimationId = setInterval(updateScore,100);
        }
        if(boxAnimationId == 0){
            boxAnimationId = setInterval(moveBoxes, 100);
        }
    }
    document.getElementById("boy").src = "Jump ("+ jumpImageNumber + ").png";
}

var boxMarginLeft = 300;

function createBoxes(){
    for(var i = 0; i< 10; i++){
        var box = document.createElement("div");
        box.className = "box";
        box.id = "box" + i;

        if(i <= 5){
            boxMarginLeft = boxMarginLeft + 800;
        }

        if(i >= 6){
            boxMarginLeft = boxMarginLeft + 500;
        }

        box.style.marginLeft = boxMarginLeft + "px";
        document.getElementById("backgroundBox").appendChild(box);
    }
}

var boxAnimationId = 0;

function moveBoxes(){
    for(var i = 0; i < 10; i++){
        var box = document.getElementById("box" + i);
        var currentMarginLeft = getComputedStyle(box).marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        box.style.marginLeft = newMarginLeft + "px";

        //alert(newMarginLeft);
        //60-200

        if(newMarginLeft >= 60 & newMarginLeft <= 180){
            //alert("Dead!");

            if (boyMarginTop > 365){ //dead

                clearInterval(runAnimationId); //stop run
                runSoundClip.pause();
                runAnimationId = -1; //no to able to run

                clearInterval(jumpAnimationId);
                jumpSoundClip.pause();
                jumpAnimationId = -1;

                clearInterval(moveBackgroundAnimationId);
                moveBackgroundAnimationId = -1;

                clearInterval(scoreAnimationId);
                scoreAnimationId = -1;

                clearInterval(boxAnimationId);
                boxAnimationId = -1;

                // dead start

                deadAnimationID = setInterval(boyDead,100);
                deadSoundClip.play();

            }
        }
    }
}

var deadImageNumber = 0;
var deadAnimationID = 0;

var deadSoundClip =  new Audio("dead.mp3");

function boyDead(){
    deadImageNumber = deadImageNumber + 1;

    if(deadImageNumber == 11){
        deadImageNumber = 10; //stay dead
        document.getElementById("boy").style.marginTop = "400px";
        
        document.getElementById("endGame").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = score;
    }

    document.getElementById("boy").src = "Dead ("+ deadImageNumber +").png";

}

function reload(){
    location.reload();
}