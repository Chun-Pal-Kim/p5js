let testImage;

function preload() {

    testImage = loadImage('assets/sampleBackGorund.png');
}

 /** This function sets up our sketch. */
function setup() {
  createCanvas(1600, 1200);
  frameRate(60);

  image(testImage , 0 ,0);
}


