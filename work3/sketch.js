let mousePresedTime = 0;
let mousePressed = false;
let mouseFirstPress = false;


//#region faceLet
let faceOffsetX = 50;
let faceOffsetY = 0;

//#endregion
function setup() {
  createCanvas(400, 400);
  background(220);
  rectMode(CENTER);
}

function draw() {
  background(220);
  
  MouseInputSetting();
  
  FaceBackGround(200 + faceOffsetX, 200 + faceOffsetY);
  
 
  DrawEyes(200 + faceOffsetX, 210 + faceOffsetY);
  DrawGlasses(200 + faceOffsetX , 210  + faceOffsetY);
  DrawNose(200 + faceOffsetX, 250  + faceOffsetY);
  DrawMouth(200 + faceOffsetX, 290  + faceOffsetY);
  DrawHair(200 + faceOffsetX, 100  + faceOffsetY);
  

}

function MouseInputSetting(){
  if (mouseIsPressed){
    
    if (!mousePressed){
      mousePressed = true;
      mouseFirstPress = true;
    }
    
    mousePresedTime += deltaTime * 0.001;

    DrawEyeLaser();

  }
}
function mouseReleased(){
  
  mousePresedTime = 0;
  mousePressed = false;
  
}
//#region face



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
  
  if (!mouseFirstPress){
      ellipse(x - 50 + eyeOffsetX, y + eyeOffsetY, 15, 15); // 왼쪽 눈동자
  ellipse(x + 50 + eyeOffsetX, y + eyeOffsetY, 15, 15); // 오른쪽 눈동자
  }

  
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
  ellipse(x - 125, y + 100 , 20, 70); // 왼쪽 귀
  ellipse(x + 125 , y + 100 , 20, 70); // 오른쪽 귀
}

//#endregion

//#region InputEvent
function DrawEyeLaser( x , y){
   let laserLength = (mousePresedTime > 0.7 ? 0.7 : mousePresedTime) * 400; 

  noStroke();
  fill(255, 0, 0, 150); // 빨간색 반투명 레이저

  let rightEyeMouseDirection = createVector(mouseX - (x -50) , mouseY - (y));
  let leftEyeMouseDirection = createVector(mouseX - (x + 50) , mouseY - (y));
  
rightEyeMouseDirection.normalize();
 leftEyeMouseDirection.normalize();
  // 왼쪽 눈에서 쏘는 레이저 (왼쪽 눈 위치: x - 50, y)  


  triangle(
    x - 50, y,                // 눈 중심
    x - 50 + laserLength * leftEyeMouseDirection.x, y - 20  + laserLength * leftEyeMouseDirection.y,  // 왼쪽으로 뻗는 레이저
    x - 50 + laserLength * leftEyeMouseDirection.x, y + 20 + laserLength * leftEyeMouseDirection.y
  );

  // 오른쪽 눈에서 쏘는 레이저 (x + 50, y)
  triangle(
    x + 50, y,
    x + 50 + laserLength * rightEyeMouseDirection.x, y - 20 + laserLength * rightEyeMouseDirection.y,
    x + 50 + laserLength * rightEyeMouseDirection.x, y + 20 + laserLength * rightEyeMouseDirection.y
  );
}

function SuitOn(){

    
}

function SuitOnPart1(){

}
function SuitOnPart2(){
  
}
function SuitOnPart3(){
  
}
function SuitOnPart4(){
  
}
//#endregion