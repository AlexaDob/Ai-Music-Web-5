willow = "";
edamame = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

status_songs = "";

function preload(){
    willow = loadSound("willow.mp3")
    edamame = loadSound("edamame.mp3")
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is Initialized');
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2){

        circle(leftWristX, leftWristY, 20);
        edamame.stop()

        
    }
}

function gotPoses(results){

    if(results.length > 0){

        scoreRightWrist =  results[0].pose.keypoints[10].score;
        scoreLeftWrist =  results[0].pose.keypoints[9].score;
        //console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        //console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
    
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        //console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
    }
}

function draw() {
	image(video, 0, 0, 600, 500);

	fill("#94C9A9");
	stroke("#94C9A9");

    status_songs = willow.isPlaying();

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,30);

       willow.stop();

        if(status_songs == false){
            console.log("Song: Edamame")
            willow.stop();
            edamame.play();

            document.getElementById("song_name").innerHTML = "Song Name: Edamame";	
        }
	}

    if(scoreRightWrist > 0.2)
	{
		circle(rightWristX,rightWristY,30);

        edamame.stop();

        if(status_songs == false){
            console.log("Song: Meet Me at Our Spot")
            willow.play();
            
            document.getElementById("song_name").innerHTML = "Song Name: Meet Me at Our Spot";	
        }
	}

    

}


