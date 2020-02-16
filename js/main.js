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

let canvas, texture, introObj;
let mouseX, mouseY;
let windowX, windowY;

window.addEventListener("mousemove", (ev) => {
    mouseX = ev.clientX;
    mouseY = ev.clientY;
})

window.addEventListener("resize", (ev) => {
    windowX = window.innerWidth;
    windowY = window.innerHeight;
})

function preload() {
    introObj = loadModel('/assets/intro3.obj');
    windowX = window.innerWidth;
    windowY = window.innerHeight;
}

function setup() {
    let container = document.getElementById('canvasContainer');
    let canvas = createCanvas(container.clientWidth, container.clientHeight, WEBGL);
    canvas.parent("canvasContainer");
}

function draw() {
    background(200);

    // figure out x rotation
    const x_rotate = ((mouseY / (windowY / 2)) - 1) * -1;
    const y_rotate = ((mouseX / (windowX / 2)) - 1) * -1;

    rotateX(PI);
    // translate(-1350, 0, 1200);
    rotateX(x_rotate);
    rotateY(y_rotate);
    // translate(p5.Vector.fromAngle(millis() / 1000, 40));
    // rotateX(frameCount * 0.01);
    // rotateY(frameCount * 0.01);
    normalMaterial();
    model(introObj);
}
