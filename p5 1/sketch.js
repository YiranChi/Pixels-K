// /* standard 16x9 resolutions
// 2160p: 3840×2160
// 1440p: 2560×1440
// 1080p: 1920×1080
// 720p: 1280×720
// 480p: 854×480
// 360p: 640×360
// 240p: 426×240
// */
let A, B, C, D, E, F, G, H, I, J;
function preload() {
  A = loadImage("images/1.png");
  B = loadImage("images/2.png");
  C = loadImage("images/3.png");
  D = loadImage("images/4.png");
  E = loadImage("images/5.png");
  F = loadImage("images/6.png");
  G = loadImage("images/7.png");
  H = loadImage("images/8.png");
  I = loadImage("images/9.png");
  J = loadImage("images/10.png");
}

// these values based on camera input that is 1920x1080, adjust for your camera
let capture;
let scaleValue = 50;
let videoWidth = 1920;
let videoHeight = 1080;
let appWidth = 1540;
let appHeight = 720;

function setup() {
  createCanvas(appWidth, appHeight);
  capture = createCapture(VIDEO);
  capture.size(videoWidth / scaleValue, videoHeight / scaleValue);
  pixelDensity(1);
  rectMode(CENTER);
  noStroke();
}

function drawRetangles(color, xpos, ypos, pixelSize) {
  fill(color);
  rect(
    xpos,
    ypos,
    pixelSize, // (pixelSize * capture.pixels[offset] + 0) / 255,
    pixelSize // (pixelSize * capture.pixels[offset] + 1) / 255
  );
}

function drawImages(color, xpos, ypos) {
  for (j = 0; j < 10; j++) {
    if (color > j * 36 && color < (j + 1) * 36) {
      switch (j) {
        case 0:
          image(A, xpos, ypos);
          break;
        case 1:
          image(B, xpos, ypos);
          break;
        case 2:
          image(C, xpos, ypos);
          break;
        case 3:
          image(D, xpos, ypos);
          break;
        case 4:
          image(E, xpos, ypos);
          break;
        case 5:
          image(F, xpos, ypos);
          break;
        case 6:
          image(G, xpos, ypos);
          break;
        case 7:
          image(H, xpos, ypos);
          break;
        case 8:
          image(I, xpos, ypos);
          break;
        case 9:
          image(J, xpos, ypos);
          break;
      }
    }
  }
  
}

function draw() {
  background(255);
  fill(255);
  translate(width, 0);
  scale(-1, 1);

  capture.loadPixels();

  let pixelSize = 50;
  A.resize(pixelSize, pixelSize);
  B.resize(pixelSize, pixelSize);
  C.resize(pixelSize, pixelSize);
  D.resize(pixelSize, pixelSize);
  E.resize(pixelSize, pixelSize);
  F.resize(pixelSize, pixelSize);
  G.resize(pixelSize, pixelSize);
  H.resize(pixelSize, pixelSize);
  I.resize(pixelSize, pixelSize);
  J.resize(pixelSize, pixelSize);

  let gridSize = 2;
  for (let captureY = 0; captureY < capture.height; captureY += gridSize) {
    for (let captureX = 0; captureX < capture.width; captureX += gridSize) {
 
      let offset = (captureY * capture.width + captureX) * 4;
      let xpos = (captureX / capture.width) * appWidth;
      let ypos = (captureY / capture.height) * appHeight;

      let r = capture.pixels[offset];
      let g = capture.pixels[offset + 1];
      let b = capture.pixels[offset + 2];
      let a = capture.pixels[offset + 3];

      let brightness = (r + g + b) / 3;
      let hsbValue = map(brightness, 0, 255, 0, 360);
      drawImages(hsbValue, xpos, ypos, pixelSize * 2);
    }
  }
}