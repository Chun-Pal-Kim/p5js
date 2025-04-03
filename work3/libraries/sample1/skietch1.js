let mousePresedTime = 0;
let mousePressed = false;

function setup() {
  createCanvas(400, 400);
  background(220);
  rectMode(CENTER);
}

function draw() {
  background(220);
  
  MouseInputSetting();
  
  FaceBackGround(200, 200);
  DrawEyes(200, 180 + 30);
  DrawGlasses(200 , 180 + 30);
  DrawNose(200, 220 + 30);
  DrawMouth(200, 260 + 30);
  DrawHair(200, 100);
  
 
}

function MouseInputSetting(){
  if (mouseIsPressed){
    
    if (!mousePressed){
      mousePressed = true;
    }
    
    mousePresedTime += deltaTime * 0.001;
    console.log(mousePresedTime);
  }
}
function mouseReleased(){
  
  mousePresedTime = 0;
  mousePressed = false;
  
}
function FaceBackGround(xPos, yPos) {
  noStroke();
  fill('#a08472'); // 피부색
  let w = 240;
  let h = 330;
  ellipse(xPos, yPos, w, h); // 얼굴 그리기
}

function DrawEyes(x, y) {
  let eyeOffsetX = map(mouseX, 0, width, -3, 3);
  let eyeOffsetY = map(mouseY, 0, height, -1, 1);
  
  fill(255);
  ellipse(x - 50, y , 40, 15); // 왼쪽 눈 흰자
  ellipse(x + 50, y, 40, 15); // 오른쪽 눈 흰자
  
  fill(0);
  
  if (mousePressed){
    DrawEyeLaser(x , y);
  }
  else{
      ellipse(x - 50 + eyeOffsetX, y + eyeOffsetY, 15, 15); // 왼쪽 눈동자
  ellipse(x + 50 + eyeOffsetX, y + eyeOffsetY, 15, 15); // 오른쪽 눈동자
  }

  
}

function DrawEyeLaser( x , y){
  
}

function DrawGlasses(x,y){
  
   noFill();
   stroke(0,0,0);
  
   let glassesR = 80;
   ellipse(x - 55, y + 5 , glassesR);
     ellipse(x + 55, y + 5 , glassesR);
  
   line(x - 55 + glassesR / 2 ,y+5 , x + 55 - glassesR / 2 , y +5);
  
   line(x - 55 - glassesR / 2 ,y+5 , x - 85  - glassesR / 2 , y  - 10);
     line(x + 55 + glassesR / 2 ,y+5 , x + 85  + glassesR / 2 , y  - 10);
}

function DrawNose(x, y) {
  let noseOffsetX = map(mouseX, 0, width, -3, 3);
  
  noStroke();
  fill('#8B5A2B');
  triangle(x - 10 + noseOffsetX, y + 15, x + 10 + noseOffsetX, y + 15, x + noseOffsetX, y - 30 );
  
}

function DrawMouth(x, y) {
  let mouthOffsetX = map(mouseX, 0, width, -5, 5);
  let mouthOffsetY = map(mouseY, 0, height, -2, 2);
  
  fill('#8B0000');
  arc(x + mouthOffsetX, y + mouthOffsetY, 50, 20, 0, PI, CHORD);
}

function DrawHair(x, y) {
  fill(0,0,0);
  
  stroke(0,0,0);
  strokeWeight(4);
  
  //머리 밀도
  let hairDensity = 4;
  
  
  //시작점 끝점
  let xStartPos = -80;
  
  let xEndPos = 100;
  for (let i = xStartPos; i <= xEndPos; i += hairDensity) {

    line(x + i, y - 50 + Math.sin(i) , x + i - 10 ,y);
  }
  
      for (let i = xStartPos + 10; i <= xEndPos - 40; i += hairDensity) {

    line(x + i, y + Math.sin(i) , x + i + 15 ,y - 50);
  }
  
    for (let i = xStartPos + 20; i <= xEndPos - 40; i += hairDensity) {

    line(x + i, y + Math.sin(i) , x + i + 15 ,y - 60);
  }
  
  for (let i = -10;i < 10 ; i += 4.5){
      
   line(x - 120 + i, y+ 80 , x -70 +i ,y - 50);
    
  }

    for (let i = -10;i < 10 ; i += 4.5){
      
   line( x + 120 - i, y+ 80 ,  x + 70 -i ,y - 50);
    
  }
  
  noStroke();
  
  
  // 귀 추가
  fill('#a08472'); // 귀 색
  ellipse(x - 125, y + 100, 20, 70); // 왼쪽 귀
  ellipse(x + 125, y + 100, 20, 70); // 오른쪽 귀
}
