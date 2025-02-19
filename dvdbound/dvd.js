const canvas = document.getElementById("dvdCanvas");
const ctx = canvas.getContext("2d");
const imageUpload = document.getElementById("imageUpload");
const bgUpload = document.getElementById("bgUpload");
const bgColor = document.getElementById("bgColor");
const sizeSlider = document.getElementById("sizeSlider");
const speedSlider = document.getElementById("speedSlider");
const startButton = document.getElementById("startButton");
let logo = new Image();
let bgImage = new Image();
let bgColorValue = "#000000";
let animationRunning = false;
let dvd = {
    x: 100,
    y: 100,
    width: parseInt(sizeSlider.value),
    height: parseInt(sizeSlider.value) / 2,
    dx: parseFloat(speedSlider.value),
    dy: parseFloat(speedSlider.value)
};

imageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            logo.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

bgUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            bgImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

bgColor.addEventListener("input", (event) => {
    bgColorValue = event.target.value;
});

sizeSlider.addEventListener("input", () => {
    dvd.width = parseInt(sizeSlider.value);
    dvd.height = parseInt(sizeSlider.value) / 2;
});

speedSlider.addEventListener("input", () => {
    let speed = parseFloat(speedSlider.value);
    dvd.dx = speed * (dvd.dx > 0 ? 1 : -1);
    dvd.dy = speed * (dvd.dy > 0 ? 1 : -1);
});

startButton.addEventListener("click", () => {
    if (!animationRunning && logo.src) {
        document.getElementById("controls").style.display = "none";
        canvas.style.display = "block";
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        animationRunning = true;
        requestAnimationFrame(update);
    }
});

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (bgImage.src && bgImage.complete) {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = bgColorValue;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    if (logo.src && logo.complete) {
        ctx.drawImage(logo, dvd.x, dvd.y, dvd.width, dvd.height);
    }
    
    dvd.x += dvd.dx;
    dvd.y += dvd.dy;

    if (dvd.x <= 0 || dvd.x + dvd.width >= canvas.width) {
        dvd.dx *= -1;
    }
    if (dvd.y <= 0 || dvd.y + dvd.height >= canvas.height) {
        dvd.dy *= -1;
    }
    requestAnimationFrame(update);
}
