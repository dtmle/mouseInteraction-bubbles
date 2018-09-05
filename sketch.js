const bubbles = [];
const backgroundBubbles = [];

function bubblePressed() {
  for (let i = 0; i < bubbles.length; i++) {
    let currBub = bubbles[i];
    currBub.clicked(mouseX, mouseY);
    if (currBub.isHighlighted()) {
      currBub.isusingAlt = false;
    }
  }
}

function mouseMoved() {
  for (let i = 0; i < bubbles.length; i++) {
    let currBub = bubbles[i];
    let distance = dist(currBub.x, currBub.y, mouseX, mouseY);
    if (distance < currBub.r * 10) {
      let moveDown = mouseY - currBub.y <= 0 ? true : false;
      let moveRight = mouseX - currBub.x <= 0 ? true : false;
      if (moveDown) {
        currBub.deltY = [0, 10];
      } else {
        currBub.deltY = [-10, 0];
      }
      if (moveRight) {
        currBub.deltX = [0, 10];
      } else {
        currBub.deltX = [-10, 0];
      }
    } else {
      currBub.deltX = [-0.5, 0.5];
      currBub.deltY = [-0.5, 0.5];
    }
  }
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.mousePressed(bubblePressed);
  for (let i = 0; i < 200; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(2, 10);
    let bub = new Bubble(x, y, r);
    bubbles.push(bub);
  }
  for (let i = 0; i < 500; i++) {
    let backX = random(width);
    let backY = random(height);
    let backR = random(2, 2);
    let backgroundBub = new Bubble(backX, backY, backR);
    backgroundBubbles.push(backgroundBub);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < bubbles.length; i++) {
    for (let j = i + 1; j < bubbles.length; j++) {
      if (bubbles[i].intersects(bubbles[j])) {
        bubbles[i].isusingAlt = true;
        bubbles[j].isusingAlt = true;
      }
    }
  }
  for (let i = 0; i < bubbles.length; i++) {
    let currBub = bubbles[i];
    currBub.move(currBub.deltX, currBub.deltY);
    currBub.show();
  }
  for (let i = 0; i < backgroundBubbles.length; i++) {
    let currBub = backgroundBubbles[i];
    currBub.move([-0.5, 0.5], [-0.5, 0.5]);
    currBub.show();
  }
}