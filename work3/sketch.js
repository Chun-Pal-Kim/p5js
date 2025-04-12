let mousePresedTime = 0;
let mousePressed = false;
let mouseFirstPress = false;

let suitOnTime = 0; // 슈트 입히는 시간
let suitOnActive = false; 

//#region faceLet
let faceOffsetX = 0;
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
  DrawGlasses(200 + faceOffsetX, 210 + faceOffsetY);
  DrawNose(200 + faceOffsetX, 250 + faceOffsetY);
  DrawMouth(200 + faceOffsetX, 290 + faceOffsetY);
  DrawHair(200 + faceOffsetX, 100 + faceOffsetY);


  if (suitOnActive) {
    suitOnTime += deltaTime * 0.001; // 시간 증가
    SuitOn(200 + faceOffsetX, 200 + faceOffsetY);
  }

  
  if (mousePressed) {
    DrawEyeLaser(200 + faceOffsetX,  210 + faceOffsetY);
  }
}

function MouseInputSetting() {
  if (mouseIsPressed) {

    if (!mousePressed) {
      mousePressed = true;
      mouseFirstPress = true;
    }

    mousePresedTime += deltaTime * 0.001;

    DrawEyeLaser();

  }
}
function mouseReleased() {

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
  ellipse(x - 50, y, 40, 15); // 왼쪽 눈 흰자
  ellipse(x + 50, y, 40, 15); // 오른쪽 눈 흰자

  fill(0);


  if (!mouseFirstPress) {
    ellipse(x - 50 + eyeOffsetX, y + eyeOffsetY, 15, 15); // 왼쪽 눈동자
    ellipse(x + 50 + eyeOffsetX, y + eyeOffsetY, 15, 15); // 오른쪽 눈동자
  }


}



function DrawGlasses(x, y) {

  noFill();
  stroke(0, 0, 0);

  let glassesR = 80;
  ellipse(x - 55, y + 5, glassesR);
  ellipse(x + 55, y + 5, glassesR);

  line(x - 55 + glassesR / 2, y + 5, x + 55 - glassesR / 2, y + 5);

  line(x - 55 - glassesR / 2, y + 5, x - 85 - glassesR / 2, y - 10);
  line(x + 55 + glassesR / 2, y + 5, x + 85 + glassesR / 2, y - 10);
}

function DrawNose(x, y) {
  let noseOffsetX = map(mouseX, 0, width, -3, 3);

  noStroke();
  fill('#8B5A2B');
  triangle(x - 10 + noseOffsetX, y + 15, x + 10 + noseOffsetX, y + 15, x + noseOffsetX, y - 30);

}

function DrawMouth(x, y) {
  let mouthOffsetX = map(mouseX, 0, width, -5, 5);
  let mouthOffsetY = map(mouseY, 0, height, -2, 2);

  fill('#8B0000');
  arc(x + mouthOffsetX, y + mouthOffsetY, 50, 20, 0, PI, CHORD);
}

function DrawHair(x, y) {
  fill(0, 0, 0);

  stroke(0, 0, 0);
  strokeWeight(4);

  //머리 밀도
  let hairDensity = 4;


  //시작점 끝점
  let xStartPos = -80;

  let xEndPos = 89;
  for (let i = xStartPos; i <= xEndPos; i += hairDensity) {

    line(x + i, y - 50 + Math.sin(i), x + i - 10, y);
  }

  for (let i = xStartPos + 10; i <= xEndPos - 40; i += hairDensity) {

    line(x + i, y + Math.sin(i), x + i + 15, y - 50);
  }

  for (let i = xStartPos + 20; i <= xEndPos - 40; i += hairDensity) {

    line(x + i, y + Math.sin(i), x + i + 15, y - 60);
  }

  for (let i = -10; i < 10; i += 4.5) {

    line(x - 120 + i, y + 80, x - 70 + i, y - 50);

  }

  for (let i = -10; i < 10; i += 4.5) {

    line(x + 120 - i, y + 80, x + 70 - i, y - 50);

  }

  noStroke();


  // 귀 추가
  fill('#a08472'); // 귀 색
  ellipse(x - 125, y + 100, 20, 70); // 왼쪽 귀
  ellipse(x + 125, y + 100, 20, 70); // 오른쪽 귀
}

//#endregion

//#region InputEvent
function DrawEyeLaser(x, y) {
  let laserLength = (mousePresedTime > 0.7 ? 0.7 : mousePresedTime) * 400;

  noStroke();
  fill(255, 0, 0, 150); // 빨간색 반투명 레이저

  let rightEyeMouseDirection = createVector(mouseX - (x - 50), mouseY - (y));
  let leftEyeMouseDirection = createVector(mouseX - (x + 50), mouseY - (y));

  rightEyeMouseDirection.normalize();
  leftEyeMouseDirection.normalize();
  // 왼쪽 눈에서 쏘는 레이저 (왼쪽 눈 위치: x - 50, y)  


  triangle(
    x - 50, y,                // 눈 중심
    x - 50 + laserLength * leftEyeMouseDirection.x, y - 20 + laserLength * leftEyeMouseDirection.y,  // 왼쪽으로 뻗는 레이저
    x - 50 + laserLength * leftEyeMouseDirection.x, y + 20 + laserLength * leftEyeMouseDirection.y
  );

  // 오른쪽 눈에서 쏘는 레이저 (x + 50, y)
  triangle(
    x + 50, y,
    x + 50 + laserLength * rightEyeMouseDirection.x, y - 20 + laserLength * rightEyeMouseDirection.y,
    x + 50 + laserLength * rightEyeMouseDirection.x, y + 20 + laserLength * rightEyeMouseDirection.y
  );
}

function keyPressed() {
  if (key === 'i') {
    suitOnActive = true; // 슈트 입히기 활성화
    suitOnTime = 0; 
  }

  if (key === 's') {
    saveGif('Chun_Pal_Kim', 6);
  }
}
let lastShakeTime = 0; // 마지막으로 흔들림이 발생한 시간

function SuitOn(x, y) {
  let partDuration = 0.3; // 각 파츠가 입혀지는 데 걸리는 시간 (초)

  if (suitOnTime > 0 && suitOnTime <= partDuration) {
    SuitOnPart1(x, y, suitOnTime / partDuration); // 왼쪽에서 날아오는 파츠


    if (suitOnTime >= partDuration * 0.9) {
      applyShake();
    }


  } else if (suitOnTime > partDuration && suitOnTime <= partDuration * 2) {
    SuitOnPart1(x, y, 1);
    SuitOnPart2(x, y, (suitOnTime - partDuration) / partDuration); // 오른쪽에서 날아오는 파츠

    if (suitOnTime >= partDuration * 2 * 0.9) {
      applyShake();
    }
  } else if (suitOnTime > partDuration * 2 && suitOnTime <= partDuration * 3) {
    SuitOnPart1(x, y, 1);
    SuitOnPart2(x, y, 1);
    SuitOnPart3(x, y, (suitOnTime - partDuration * 2) / partDuration); // 아래에서 날아오는 파츠
    if (suitOnTime >= partDuration * 3 * 0.9) {
      applyShake();
    }
  } else if (suitOnTime > partDuration * 3 && suitOnTime <= partDuration * 4) {
    SuitOnPart1(x, y, 1);
    SuitOnPart2(x, y, 1);
    SuitOnPart3(x, y, 1);
    SuitOnPart4(x, y, (suitOnTime - partDuration * 3) / partDuration);
    if (suitOnTime >= partDuration * 4 * 0.9) {
      applyShake();
    }
  }
  else {
    SuitOnPart1(x, y, 1);
    SuitOnPart2(x, y, 1);
    SuitOnPart3(x, y, 1);
    SuitOnPart4(x, y, 1);
  }
}

function applyShake() {
  faceOffsetX = random(-5, 5); //흔들림림
  faceOffsetY = random(-5, 5);
  setTimeout(() => {
    faceOffsetX = 0; // 흔들림 초기화
    faceOffsetY = 0;
  }, 100); // 
}
function SuitOnPart1(x, y, progress) {
  fill(200, 0, 0); // 빨간색
  let startX = x - 300; // 왼쪽에서 시작
  let currentX = lerp(startX, x - 120, progress); // 선형 보간
  rect(currentX, y, 30, 100); // 왼쪽 얼굴 부분

  // 회전된 사각형의 네 꼭짓점 계산
  let x1 = currentX - 16;
  let y1 = y - 45;
  let x2 = x1 + 90;
  let y2 = y1 - 120;
  let x3 = x2 - 40;
  let y3 = y2;
  let x4 = x1 + 28;
  let y4 = y1;
  // 회전된 사각형 그리기
  quad(x1, y1, x4, y4, x2, y2, x3, y3);


  // 오른쪽으로 기울어진 사각형의 네 꼭짓점 계산
  let x12 = currentX - 16; // 오른쪽으로 이동
  let y12 = y + 45;
  let x22 = x12 + 50; // 오른쪽으로 이동
  let y22 = y12 + 120;
  let x32 = x22 + 40;
  let y32 = y22;
  let x42 = x12 + 30;
  let y42 = y12;

  // 오른쪽으로 기울어진 사각형 그리기
  quad(x12, y12, x22, y22, x32, y32, x42, y42);
}
function SuitOnPart2(x, y, progress) {
  fill(200, 0, 0); // 빨간색
  let startX = x + 300; // 오른쪽에서 시작
  let currentX = lerp(startX, x + 120, progress); // 선형 보간
  rect(currentX, y, 30, 100); // 오른쪽 얼굴 부분

  // 회전된 사각형의 네 꼭짓점 계산
  let x1 = currentX + 16;
  let y1 = y - 45;
  let x2 = x1 - 90;
  let y2 = y1 - 120;
  let x3 = x2 + 40;
  let y3 = y2;
  let x4 = x1 - 28;
  let y4 = y1;

  // 회전된 사각형 그리기
  quad(x1, y1, x4, y4, x2, y2, x3, y3);

  // 왼쪽으로 기울어진 사각형의 네 꼭짓점 계산
  let x12 = currentX + 16; // 왼쪽으로 이동
  let y12 = y + 45;
  let x22 = x12 - 50; // 왼쪽으로 이동
  let y22 = y12 + 120;
  let x32 = x22 - 40;
  let y32 = y22;
  let x42 = x12 - 30;
  let y42 = y12;

  // 왼쪽으로 기울어진 사각형 그리기
  quad(x12, y12, x22, y22, x32, y32, x42, y42);
}

function SuitOnPart3(x, y, progress) {
  fill(200, 0, 0); // 빨간색
  let startY = y + 300; // 아래에서 시작
  let currentY = lerp(startY, y + 150, progress); // 선형 보간
  rect(x, currentY, 130, 30); // 아래 얼굴 부분






}

function SuitOnPart4(x, y, progress) {
  fill(200, 0, 0); 
  let startY = y - 300; 
  let currentY = lerp(startY, y - 140, progress); // 선형 보간
  rect(x, currentY, 150, 50); 

  fill(200, 200, 0);

  rect(x +1, currentY + 140, 220, 90); 

  let x1 = x  - 110; 
  let y1 = currentY + 185;
  let x2 = x1 + 33; 
  let y2 = y1 + 90;
  let x3 = x2 + 150;
  let y3 = y2;
  let x4 = x1 + 220;
  let y4 = y1;
  quad(x1, y1, x2, y2, x3, y3, x4, y4);



  let x12 = x  - 75; 
  let y12 = currentY + 10;
  let x22 = x12 - 33; 
  let y22 = y12 + 85;
  let x32 = x22 + 220;
  let y32 = y22;
  let x42 = x12 + 150;
  let y42 = y12;
  quad(x12, y12, x22, y22, x32, y32, x42, y42);


  fill(255,255,255);
  rect(x - 50, currentY + 150, 50, 10); 
  rect(x + 50, currentY + 150, 50, 10);
  fill(0,0,0);
  rect(x , currentY + 230, 80, 10); 
}
//#endregion