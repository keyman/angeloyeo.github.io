var scl;
var x = []
var sig = []
var moving_sig = [] // Data의 likelihood 계산용 pdf. 움직임.
var mu_moving

var sigma = 1
var mu = 0
var fs = 500
var data  = []
var nData = 20
var circles = []

var yPos1 = 0 // Normal Distribution 그려지는 자리
var yPos2 = 0 // Data 그려지는 자리
var yPos3 = 0 // likelihood function 그려지는 자리

var lh = []; // likelihood funtion 

var mouseX_scaled

function setup() {
     createCanvas(windowWidth/3, windowWidth/4);
     scl = width / 8;
     
     yPos1 = height * 1 / 4
     yPos2 = height * 2 / 4
     yPos3 = height * 3 / 4


     for (let i = -3; i < 3; i += 1 / fs) {
          x.push(i)
     }

     for (let i = 0; i < x.length; i++) {
          sig.push(
               gaussian(x[i], mu, sigma)
          )
     }

     for (let i = 0; i < nData; i++) {
          data.push(randomGaussian(mu, sigma))
     }

     var d = 10

     // DrawCircle instance가 저장된 array를 만들기
     for (let i = 0; i < data.length; i++) {
          // var c = color(random(255), random(255), random(255))
          var c = color(255)
          var s = random(4, 10)
          circles[i] = new DrawCircle(data[i]*scl, 0, d, c, s, yPos1, yPos2)
     }

     // likelihood function 계산하기

     for (let i = 0; i < x.length; i++){
          lh.push(1)
     }

     for (let i = 0; i < x.length; i++){
          temp_mu = x[i]
          temp_sigma = 1
          for (let j = 0; j < data.length; j ++){
               lh[i] = lh[i] * gaussian(data[j], temp_mu, temp_sigma)
          }
     }

     // likelihood 함수 정규화

     lh_max = max(lh)

     for (let i = 0; i < lh.length; i++){
          lh[i] = lh[i]/lh_max
     }

     // likelihood 계산 및 정규화 끝
}

function draw() {
     mouseX_scaled = (mouseX - width/2)/ scl

     background(0);

     plotGaussian2Sample();

     plotDataFallingDown();

     plotLikelihoodFunction(mouseX_scaled);

     plotMovingGaussian(mouseX_scaled);

     // 마지막 서명
     plotSignature();

     // print(mouseX, mouseY)
}

function gaussian(x, mu, sigma) {
     res = 1/(sqrt(2*PI) * sigma) * exp(-1 * (x-mu)**2 / (2*sigma**2))
     return res
}

function plotGaussian2Sample() {
     push();
     translate(width / 2, yPos1);
     scale(1, -1);

     // **************** Normal Dist. to sample **************** //
     beginShape();
     noFill();
     stroke(255);

     for (let i = 0; i < (x.length - 1); i++) {
          line(x[i] * scl, sig[i] * scl, x[i + 1] * scl, sig[i + 1] * scl);
     }
     endShape();
     // ************ end of Normal Dist. to sample ************** //

     // ************ x axis indicators ******************** //

     line(-3 * scl, -0.1 * scl, 3 * scl, -0.1 * scl)

     // 눈금 그리기
     textAlign(CENTER)

     for (i = -3; i <= 3; i++){
          line(i * scl, -0.15 * scl, i * scl, -0.05 * scl)
     }

     // 눈금에 숫자 써넣어주기
     scale(1, -1)
     for (i = -3; i <= 3; i++){
          text(i, i * scl, +0.30 * scl)
     }
     // ************ end of x axis indicators ******************** //
     pop();
}

function plotDataFallingDown() {
     push()
     translate(width / 2, yPos1);
     for (let i = 0; i < data.length; i++){
          circles[i].move();
          circles[i].display();
     }
     pop()
}

class DrawCircle {
     // data에 해당하는 동그라미들을 떨어뜨리기 위해 만드는 클래스
     constructor(x, y, d, c, s, startPos, endPos){
          // property 선언하기
          this.xPos = x;
          this.yPos = y;
          this.diameter = d;
          this.color = c;
          this.speed = s;

          this.dist = endPos - startPos
     }

     display() {// 현재 위치에서 그려주기
          fill(this.color)
          ellipse(this.xPos, this.yPos, this.diameter, this.diameter)

     };

     move() {// 움직여주기
          this.yPos += this.speed;
          
          if (this.yPos > this.dist) {
               this.yPos = this.dist
          }
     };

}

function plotLikelihoodFunction(mu_moving) {
     
     // print(x - mu_moving)
     // print(x)
     var x2 = []
     for (i = 0; i < x.length; i++){
          x2.push(abs(x[i] - mu_moving))
     }
     
     var x_min_idx = x2.indexOf(min(x2))

     push();
     translate(width / 2, yPos3);
     scale(1, -1);

     // **************** Normal Dist. to sample **************** //
     beginShape();
     noFill();
     stroke(255);

     for (let i = 0; i < x_min_idx; i++) {
          line(x[i] * scl, lh[i] * scl, x[i + 1] * scl, lh[i + 1] * scl);
     }
     endShape();
     // ************ end of Normal Dist. to sample ************** //

     // ************ x axis indicators ******************** //

     line(-3 * scl, -0.1 * scl, 3 * scl, -0.1 * scl)

     // 눈금 그리기
     textAlign(CENTER)

     for (i = -3; i <= 3; i++){
          line(i * scl, -0.15 * scl, i * scl, -0.05 * scl)
     }

     // 눈금에 숫자 써넣어주기
     scale(1, -1)
     for (i = -3; i <= 3; i++){
          text(i, i * scl, +0.30 * scl)
     }
     // ************ end of x axis indicators ******************** //
     pop();
}

function plotMovingGaussian(mu_moving){
     moving_sig = []
     for (let i = 0; i < x.length; i++) {
          moving_sig.push(
               gaussian(x[i], mu_moving, sigma)
          )
     }
     push()
     translate(width/2, yPos2)
     scale(1, -1)

     // **************** Normal Dist. to sample **************** //
     beginShape();
     noFill();
     stroke(255);

     for (let i = 0; i < (x.length - 1); i++) {
          line(x[i] * scl, moving_sig[i] * scl, x[i + 1] * scl, moving_sig[i + 1] * scl);
     }
     endShape();

     pop()
}
function plotSignature(){
     // fill(255);
     // textAlign(RIGHT)
     // textSize(12 / 800 * width)
     // text('(c) 공돌이의 수학정리노트', width * 0.98, height * 0.95)
}