Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90,
    flip_horiz: true
})

camera = document.getElementById("camera");

Webcam.attach('camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img style="width: 360px; height: 220px; padding-top: 20px;" id="capture_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Blo_L1S95/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is " + prediction_1;
    speak_data_2 = "The prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("capture_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        document.getElementById("result_hand_name1").innerHTML = result[0].label;
        prediction = result[0].label;
        document.getElementById("result_hand_name2").innerHTML = result[1].label;
        prediction = result[1].label;
        speak()
        if (result[0].label == "Amazing") {
            document.getElementById("update_emoji").innerHTML = "&#x1F44C;&#x1F3FB;";
        }
        if (result[1].label == "Amazing") {
            document.getElementById("update_emoji").innerHTML = "&#x1F44C;&#x1F3FB;";
        }
        if (result[0].label == "Best") {
            document.getElementById("update_emoji").innerHTML = "&#x1F44D;&#x1F3FB;";
        }
        if (result[1].label == "Best") {
            document.getElementById("update_emoji").innerHTML = "&#x1F44D;&#x1F3FB;";
        }
        if (result[0].label == "Victory") {
            document.getElementById("update_emoji").innerHTML = "&#x270C;&#x1F3FB;";
        }
        if (result[1].label == "Victory") {
            document.getElementById("update_emoji").innerHTML = "&#x270C;&#x1F3FB;";
        }
    }
}