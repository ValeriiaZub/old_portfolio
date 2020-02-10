$(document).ready(function () {
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function () {
                window.location.hash = hash;
            });
        }
    });

});

let canvas, introObj;

function preload() {
    introObj = loadModel('/assets/intro.obj');
}

function setup() {
    let container = document.getElementById('canvasContainer');
    let canvas = createCanvas(container.clientWidth, container.clientHeight, WEBGL);
    canvas.parent("canvasContainer");
}

function draw() {
    background(200);
    translate(width / 2, height / 2);
    translate(p5.Vector.fromAngle(millis() / 1000, 40));
    // rotateX(frameCount * 0.01);
    // rotateY(frameCount * 0.01);
    model(introObj)
}
