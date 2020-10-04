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
var cubes = [];
var MAX_CUBES = 75;
var RAND_SEED = 1000;
var MAX_TIME = 12 * 1000;
var MIN_TIME = 5 * 1000;
var DISTANCE = 5200;
var MAX_BOX_SIZE = 100;
var MIN_BOX_SIZE = 25;

function CreateCube() {
    let container = document.getElementById('canvasContainer');
    const max_width = container.clientWidth;
    const max_height = container.clientHeight / 2;
    const textZ = -(windowX / 4) * 2.75 * (windowY / windowX);
    let direction = random();
    let y = random() * 600 + 500;
    if (direction <= 0.5) {
        y = random() * 600 - 850;
    }
    return {
        x: (random() * max_width) * 2 - max_width,
        y: y,
        size: (random() * MAX_BOX_SIZE) + MIN_BOX_SIZE,
        timer: 0,
        targetTime: (random() * MAX_TIME) + MIN_TIME,
        color: [floor(random() * 255), floor(random() * 255), floor(random() * 255)]
    };
}

window.addEventListener("mousemove", (ev) => {
    mouseX = ev.clientX;
    mouseY = ev.clientY;
})

window.addEventListener("resize", (ev) => {
    windowX = window.innerWidth;
    windowY = window.innerHeight;
})

function preload() {
    introObj = loadModel('/portfolio-header/assets/intro6.obj');
    windowX = window.innerWidth;
    windowY = window.innerHeight;
}

function setup() {
    let container = document.getElementById('canvasContainer');
    let canvas = createCanvas(container.clientWidth, container.clientHeight, WEBGL);
    canvas.parent("canvasContainer");

    // implement cubes
    randomSeed(RAND_SEED);
    for (let i = 0; i < MAX_CUBES; i++) {
        cubes.push(CreateCube())
    }
}

function draw() {
    background(250);
    lightFalloff(1, 0, 0);
    ambientLight(400); // white light

    let dirX = (mouseX / windowX - 0.5) * 2;
    let dirY = (mouseY / windowY - 0.5) * 2;
    directionalLight(250, 250, 250, -dirX, -dirY, -1);

    // figure out x rotation
    const x_rotate = ((mouseY / (windowY / 2)) - 1) * -.15;
    const y_rotate = ((mouseX / (windowX / 2)) - 1) * -.15;
    push();
    rotateX(PI);
    translate(0, 0, -(windowX / 4) * 2.7 * (windowY / windowX));
    rotateX(x_rotate);
    rotateY(y_rotate);
    
    ambientMaterial(70, 130, 230);
    noStroke();
    model(introObj);
    pop();

    // delete cubes that are "out of scope"
    cubes = cubes.filter(c => c.timer / c.targetTime < 1);

    // create new cubes
    const loop = MAX_CUBES - cubes.length;
    for (let i = 0; i < loop; i++) {
        cubes.push(CreateCube());
    }

    // update cubes
    for (let cube of cubes) {
        push();
        cube.timer += deltaTime;
        let vector = cube.timer / cube.targetTime;
        let radian = (vector * 180) * Math.PI / 180;
        translate(cube.x, cube.y, ((cos(radian) * -1) * DISTANCE) - (DISTANCE - 500));
        rotateX(vector * PI)
        rotateY(vector * PI)
        ambientMaterial(cube.color[0], cube.color[1], cube.color[2]);
        noStroke();
        box(cube.size, cube.size, cube.size);
        pop();
    }
}