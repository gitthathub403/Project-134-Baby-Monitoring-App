status2 = "";
objects = [];
song="";
objectDetector = "";
function preload() {
    song=loadSound("alarm.mp3");

}
 function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(360,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model is Loaded ^w^ <3");
    status2 = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video,0,0,380,380);

    if (status2 != "") {
        objectDetector.detect(video, gotResult);
        for (var i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object(s) Detected ^w^";
            fill(0,0,255);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "  " + percent + "%", objects[i].x + 15, objects[i].y + 15 );
            noFill();
            stroke(0,0,255);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label=="person") {
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                console.log(stop);
                song.stop();    
            } else {
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
                song.play(); 
            }
        }
        if(objects.length==0) {
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
            song.play(); 
        }
    }
}