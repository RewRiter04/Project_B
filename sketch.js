let anaglyph;
let scene = 1;
let lucky_number = 1;
let font_1;
let font_2;
let font_3;
let text_time = 800;
let test_time = 900;
let clock;
let angle = 0;

// ********    whether to display the handpose ******** //
let show_hand = false;

//scene1
let speed_1 = 1;
let speed_up = false;
let bg_1 = 0;
let switch_scene = false;

//scene_text_1
let count_text_1 = 0;
let alpha1;
let alpha2;
let alpha3;
let alpha0;
//scene2 
let savedBlocks = null; 

let cam;
let S = 50;  // *** size of the grid *** //  
let cols, rows;            
let cellColors;            
let scene2Ready   = false;              
let switch_scene2 = false; 
let time1 = 60;     
let position = 0; 
let dragging = false;
let dragOffsetX = 0;
let count_2 = 300;
let bg_2;

let flashActive   = false;
let flashTimer    = 0;
const FLASH_DUR   = 30;  // frame

//scene_text_2
let count_text_2 = 0;

//scene3
let scene3Ready     = false;
let activeMap       = [];
let timer3          = 0;
let control_z3      = 0;
const fall_time3    = 5;
const resize_time3  = 20;
let blocks3 = [];

let count_3 = 0;

//scene_text_3
let count_text_3 = 0;

//scene4
let count_4 = 0;
let handPose;
let video;
let hands = [];

let counter = 0;
let speedF = 0;

let proximityFrames = 0;   

//scene_text_4
let count_text_4 = 0;

//scene_text_5
let count_text_5 = 0;

//scene5

let terrain = {
    scale: 100,
    w: 1000,
    h: 1000,
    flightPos: 0,
    flightSpeed: .0010,
    noiseDelta: .4,
    terrainHeight: 200,
    coords: []
}
let count_5 = 0;

const fadeDuration  = 60;               
const holdDuration  = 30;               
const textImgs      = [];  

function preload() {
    handPose = ml5.handPose();  
    font_1 = loadFont("AdobeClean-Light.otf");
    font_2 = loadFont("CtrlAtri.0.001.otf");

    text1 = loadImage('img/line1.jpeg'); 
    text2 = loadImage('img/line2.jpeg');       
    text3 = loadImage('img/line3.jpeg');   
    text4 = loadImage('img/line4.jpeg');   
  }

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    // noCursor();          
    // imageMode(CENTER);  
    // angleMode(DEGREES);

    anaglyph = createAnaglyph(this);
    anaglyph.setDivergence(-.3);
    initTerrain();
    cam = createCapture(VIDEO);
    cam.hide();

    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    handPose.detectStart(video, gotHands);
}
function draw() {
    if (scene === 1) {
        anaglyph.draw(scene1);
    } else if (scene === 2) {
        anaglyph.draw(scene_text_1);
        //console.log('count_text_1', count_text_1);
    } else if (scene === 3) {
        anaglyph.draw(scene2);
        //console.log('count_2', count_2);
    } else if (scene === 4) {
        anaglyph.draw(scene_text_2);
        //console.log('count_text_2', count_text_2);
    } else if (scene === 5) {
        anaglyph.draw(scene3);
        //console.log('count_3', count_3);
    } else if (scene === 6) {
        anaglyph.draw(scene_text_3);
    } else if (scene === 7) {
        anaglyph.draw(scene4);
        //console.log('count_4', count_4);
    } else if (scene === 8) {
        anaglyph.draw(scene_text_4);
        //console.log('count_text_4', count_text_4);
    } else if (scene === 9) {
        anaglyph.draw(scene_text_5);
        //console.log('count_5', count_5);
    } else if (scene === 10) {
        anaglyph.draw(scene5);
    }
//   console.log(
//     'normX:', (mouseX / width).toFixed(2),
//     'normY:', (mouseY / height).toFixed(2)
//   );
// push();
// translate(mouseX, mouseY);

//angle -= 1;       
//rotate(angle);

//  let cursor_size = 64;

//   image(clock, 0, 0, cursor_size, cursor_size);
// pop();
}

function scene1(pg) {
    const boxW = 333;
    const pulseDuration = 5000;
    let t = millis() % pulseDuration;
    let alpha = map(sin(TWO_PI * t / pulseDuration), -1, 1, 0, 255);
    pg.background(bg_1);
 
    pg.rectMode(CENTER);
    pg.noFill();
    pg.strokeWeight(10);
    pg.stroke(255);
    if (speed_up && !switch_scene) {
        speed_1 *= 1.0020;
        bg_1 = map(speed_1, 1, 10, 0, 255);
        if (bg_1 >= 255) {
          bg_1 = 255;                
          switch_scene = true; 
          setTimeout(() => {scene = 2;}, 0);
        }
    }

    for (let z = 0; z < 30; z++) {
        pg.push();
        let dz = (z * 100 + speed_1 * frameCount) % 2000;
        dz -= 800;
        pg.translate(0, 0, dz);
        pg.rect(0, 0, boxW);
        pg.pop();
    }

    pg.push();
    pg.rotateX(PI / 2);
    pg.translate(0, 0, -boxW/2);
    pg.rect(0, 0, boxW, 1800);
    pg.translate(0, 0, boxW);
    pg.rect(0, 0, boxW, 1800);
    pg.pop();
    
    //let omega1 = map(speed_1, 1, 10, -frameCount / 200, -frameCount / 20);
    pg.push();
        pg.translate(0, 400, 0);
        pg.textAlign(pg.CENTER, pg.CENTER);
        if (font_1 && !speed_up) {
            pg.fill(255, alpha);
            pg.textFont(font_1, 40);
            //pg.rotateY(omega1);
            pg.text("Click mouse to start", 0, 0);
    pg.pop();
  }
}

function scene_text_1(){
  count_text_1++;
  if (count_text_1 <= text_time + 400){
    background(255);
    push();
    translate(-width/2, -height/2);
    textAlign(CENTER, CENTER);
    textFont(font_1);
    textSize(64);

    let words = ["We", "Shall", "See"];
    let sep   = 20; 

    let w0 = textWidth(words[0]);
    let w1 = textWidth(words[1]);
    let w2 = textWidth(words[2]);
    let totalW = w0 + sep + w1 + sep + w2;
    let startX = width/2 - totalW/2;
    let x0 = startX + w0/2;
    let x1 = startX + w0 + sep + w1/2;
    let x2 = startX + w0 + sep + w1 + sep + w2/2;    
    let y  = height/2;
    if (count_text_1 <= text_time) {
      alpha3 = count_text_1 > text_time/6    ? 255 : 0;                 
      alpha2 = count_text_1 > text_time/3    ? 255 : 0;                    
      alpha1 = count_text_1 > text_time/2    ? 255 : 0;                                 
    } else if (count_text_1 >= text_time && count_text_1 <= text_time + 400){
      alpha3 = map(count_text_1 - text_time, 0, 300, 255, 0)
      alpha2 = map(count_text_1 - text_time, 0, 300, 255, 0)                    
      alpha1 = map(count_text_1 - text_time, 0, 300, 255, 0)
    }
    fill(0, alpha1);
    text(words[0], x0, y);
    fill(0, alpha2);
    text(words[1], x1, y);
    fill(0, alpha3);
    text(words[2], x2, y);
    pop();
  }  else if (count_text_1 >= text_time + 400){
    switch_scene = true;
    setTimeout(() => { scene = 3; }, 500);
  }
}

function scene2(pg) {
    count_2++;
    
    if (lucky_number == 2) {
    pg.push();
    pg.background(0);
    cam.loadPixels();
  
    const cols = ceil(pg.width  / S);
    const rows = ceil(pg.height / S);
  
    if (count_2 <= 600) {
      if (count_2 === 600) {
        savedBlocks = Array.from({ length: rows },
                         () => Array(cols).fill(color(0)));
      }
        pg.push();
        pg.scale(-1, 1);

  
      for (let ix = 0; ix < cols; ix++) {
        let x = ix * S;
        for (let iy = 0; iy < rows; iy++) {
          let y = iy * S;
  
          let cx = floor(map(x, 0, pg.width, 0, cam.width));
          let cy = floor(map(y, 0, pg.height, 0, cam.height));
          let i  = (cx + cy * cam.width) * 4;
          let r  = cam.pixels[i],
              g  = cam.pixels[i+1],
              b  = cam.pixels[i+2];
  
          let usedCol = color(r, g, b);

          pg.push();
          pg.translate(
            x - pg.width/2,
            y - pg.height/2,
            0
          );
          pg.noStroke();
          pg.fill(usedCol);
          pg.rect(0, 0, S, S);
          pg.pop();
  
          if (count_2 === 600) {
            flashActive = true;
            flashTimer  = 0;
            savedBlocks[iy][ix] = usedCol;
          }
        }
      }
    }

    else if (savedBlocks) {

        pg.push();
        pg.scale(-1, 1);
  
            pg.push();
            pg.translate(-pg.width/2, -pg.height/2);
            for (let iy = 0; iy < rows; iy++) {
                for (let ix = 0; ix < cols; ix++) {
                pg.noStroke();
                pg.fill(savedBlocks[iy][ix]);
                pg.rect(ix * S, iy * S, S, S);
                }
            }
            pg.pop();
        pg.pop();
    }
    if (flashActive) {

        flashTimer++;

        let a = map(flashTimer, 0, FLASH_DUR, 255, 0, true);
    
        pg.push();
          pg.noStroke();
          pg.fill(0, a);
          pg.translate(0, 0, 1);      
          pg.rectMode(CENTER);
          pg.rect(0, 0, pg.width, pg.height);
        pg.pop();
    
        if (flashTimer >= FLASH_DUR) {
          flashActive = false;
        }
      }
    pg.pop();
    } else {
        push();
        background(0);
        cam.loadPixels();
      
        const cols = ceil(pg.width  / S);
        const rows = ceil(pg.height / S);
      
        if (count_2 <= test_time + 600) {
          if (count_2 === 600) {
            savedBlocks = Array.from({ length: rows },
                             () => Array(cols).fill(color(0)));
          }
    
            push();
            scale(-1, 1);

          for (let ix = 0; ix < cols; ix++) {
            let x = ix * S;
            for (let iy = 0; iy < rows; iy++) {
              let y = iy * S;
      
              let cx = floor(map(x, 0, pg.width, 0, cam.width));
              let cy = floor(map(y, 0, pg.height, 0, cam.height));
              let i  = (cx + cy * cam.width) * 4;
              let r  = cam.pixels[i],
                  g  = cam.pixels[i+1],
                  b  = cam.pixels[i+2];
      
              let usedCol = color(r, g, b);
      
              push();
              translate(
                x - pg.width/2,
                y - pg.height/2,
                //0//不知道这里改成0好不好
                map(r, 0, 255, 200, 0)
              );
              noStroke();
              fill(usedCol);
              rect(0, 0, S, S);
              pop();
      
              if (count_2 === test_time+600) {
                flashActive = true;
                flashTimer  = 0;
                savedBlocks[iy][ix] = usedCol;
              }
            }
          }
        }

        else if (savedBlocks) {
    
            push();
            scale(-1, 1);
      
                push();
                translate(-pg.width/2, -pg.height/2);
                for (let iy = 0; iy < rows; iy++) {
                    for (let ix = 0; ix < cols; ix++) {
                    noStroke();
                    fill(savedBlocks[iy][ix]);
                    rect(ix * S, iy * S, S, S);
                    }
                }
                pop();
            pop();
        }
        if (flashActive) {
            flashTimer++;
            let a = map(flashTimer, 0, FLASH_DUR, 255, 0, true);
        
            push();
              noStroke();
              fill(0, a);
              translate(0, 0, 1);  
              rectMode(CENTER);
              rect(0, 0, pg.width, pg.height);
            pop();
        
            if (flashTimer >= FLASH_DUR) {
              flashActive = false;
            }
          }
        pop();
    }

    if (count_2 >= 2*test_time) {        
        switch_scene2 = true; 
        setTimeout(() => {scene = 4;}, 0);
      }
}
class PixelBlock {
  constructor(gx, gy, col, size, count_3) {
    this.gx = gx;                
    this.gy = gy;
    this.x = gx - width/2;
    this.y = gy - height/2;
    this.z = 0;                   
    this.size = size;
    this.col = col;
    this.alpha = 255;
    this.count = count_3;

    this.dx = random(-0.5, 0.5);
    this.dy = random(-0.5, 0.5);
    this.dz = random(0, 2);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.z += this.dz;
  }
  display(pg) {
    pg.push();
      pg.translate(this.x, this.y, this.z);
      pg.fill(red(this.col), green(this.col), blue(this.col), this.alpha);
      pg.noStroke();
      pg.rectMode(CENTER);
      pg.rect(0, 0, this.size, this.size);
    pg.pop();
  }
}
class Pixel_Block_2 {
    constructor(gx, gy, col, size, count_3) {
      this.gx = gx;               
      this.gy = gy;
      this.x = gx - width/2;
      this.y = gy - height/2;
      this.z = 0;                  
      this.size = size;
      this.col = col;
      this.alpha = 255;
      this.count = count_3;
  
      this.dx = random(-0.5, 0.5);
      this.dy = random(-0.5, 0.5);
      this.dz = random(0, 2);
    }

    update() {
      this.x += this.dx * 0.0001 * count_3 ** 1.3;
      this.y += this.dy * 0.0001 * count_3 ** 1.3;
      this.z += this.dz * 0.0001 * count_3 ** 1.3;
      this.alpha = map(this.count, 0, 400, 255, 0);
    }
    display() {
      push();
        translate(this.x, this.y, this.z);
        fill(red(this.col), green(this.col), blue(this.col), this.alpha);
        noStroke();
        rectMode(CENTER);
        rect(0, 0, this.size, this.size);
      pop();
    }
  }

function scene_text_2(){
    count_text_2++;
    if (count_text_2 <= text_time + 400){
      background(0);
      push();
      translate(-width/2, -height/2);
      textAlign(CENTER, CENTER);
      textFont(font_1);
      textSize(64);

      let words = ["Let me", "predict", "your",'future?'];
      let sep   = 20; 
 
      let w0 = textWidth(words[0]);
      let w1 = textWidth(words[1]);
      let w2 = textWidth(words[2]);
      let w3 = textWidth(words[3]);
      let totalW = w0 + sep + w1 + sep + w2 + sep + w3;
      let startX = width/2 - totalW/2;
      let x0 = startX + w0/2;
      let x1 = startX + w0 + sep + w1/2;
      let x2 = startX + w0 + sep + w1 + sep + w2/2;
      let x3 = startX + w0 + sep + w1 + sep + w2 + sep + w3/2;     
      let y  = height/2;
              
      if (count_text_2 <= text_time) {
        alpha3 = count_text_2 > text_time/6     ? 255 : 0;                 
        alpha2 = count_text_2 > text_time/3      ? 255 : 0;                    
        alpha1 = count_text_2 > text_time/2      ? 255 : 0;                   
        alpha0 = count_text_2 > 2*text_time/3      ? 255 : 0;                                 
      } else if (count_text_2 >= text_time && count_text_2 <= text_time + 400){
        alpha3 = map(count_text_2 - text_time, 0, 300, 255, 0) ;
        alpha2 = map(count_text_2 - text_time, 0, 300, 255, 0)  ;                           
        alpha1 = map(count_text_2 - text_time, 0, 300, 255, 0)  ;                  
        alpha0 = map(count_text_2 - text_time, 0, 300, 255, 0)  ;                   
      }

      fill(255, alpha0);
      text(words[0], x0, y);
      fill(255, alpha1);
      text(words[1], x1, y);
      fill(255, alpha2);
      text(words[2], x2, y);
      fill(255, alpha3);
      text(words[3], x3, y);
      pop();
    } else {
      switch_scene = true;
      setTimeout(() => { scene = 5; }, 500);
    }
  }
// 
function scene3(pg) {
    count_3 ++;
    if (lucky_number == 2) {
        if (!scene3Ready) {
      blocks3 = [];
      const rows = savedBlocks.length;
      const cols = savedBlocks[0].length;
      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          let c  = savedBlocks[iy][ix];
          let gx = ix * S + S/2;
          let gy = iy * S + S/2;
          blocks3.push(new PixelBlock(gx, gy, c, S, count_3));
        }
      }
      scene3Ready = true;
        }
    
    pg.background(0);
  
    pg.push();
      pg.translate(0, 0, 0);
  
      pg.scale(-1, 1);
  
      for (let blk of blocks3) {
        blk.update();
        blk.display(pg);
      }
    pg.pop();  
    } else {
        if (!scene3Ready) {
            blocks3 = [];
            const rows = savedBlocks.length;
            const cols = savedBlocks[0].length;
            for (let iy = 0; iy < rows; iy++) {
              for (let ix = 0; ix < cols; ix++) {
                let c  = savedBlocks[iy][ix];
                let gx = ix * S + S/2;
                let gy = iy * S + S/2;
                blocks3.push(new Pixel_Block_2(gx, gy, c, S, count_3));
              }
            }
            scene3Ready = true;
              }
          
          background(0);
        
          push();
            translate(0, 0, 0);       
            scale(-1, 1);
        
            for (let blk of blocks3) {
              blk.update();
              blk.display();
            }
          pop();  
  }
  if (count_3 >= 1.5 * test_time) {
    switch_scene = true; 
    setTimeout(() => {scene = 6;}, 0);
  }
}
// scene = 6
function scene_text_3(){
  count_text_3++;
  if (count_text_3 <= text_time + 400){
    background(0);
    push();
    translate(-width/2, -height/2);
    textAlign(CENTER, CENTER);
    textFont(font_1);
    textSize(64)

    let words = ["Your", "past",'is yet','to come'];
    let sep   = 20; 

    let w0 = textWidth(words[0]);
    let w1 = textWidth(words[1]);
    let w2 = textWidth(words[2]);
    let w3 = textWidth(words[3]);
    let totalW = w0 + sep + w1 + sep + w2 + sep + w3;
    let startX = width/2 - totalW/2;
    let x0 = startX + w0/2;
    let x1 = startX + w0 + sep + w1/2;
    let x2 = startX + w0 + sep + w1 + sep + w2/2;
    let x3 = startX + w0 + sep + w1 + sep + w2 + sep + w3/2;     
    let y  = height/2;


    if (count_text_3 <= text_time) {
      alpha3 = count_text_3 > text_time/6     ? 255 : 0;                 
      alpha2 = count_text_3 > text_time/3      ? 255 : 0;                    
      alpha1 = count_text_3 > text_time/2      ? 255 : 0;                   
      alpha0 = count_text_3 > 2*text_time/3      ? 255 : 0;                                 
    } else if (count_text_3 >= text_time && count_text_3 <= text_time + 400){
      alpha3 = map(count_text_3 - text_time, 0, 300, 255, 0) ;
      alpha2 = map(count_text_3 - text_time, 0, 300, 255, 0)  ;                           
      alpha1 = map(count_text_3 - text_time, 0, 300, 255, 0)  ;                  
      alpha0 = map(count_text_3 - text_time, 0, 300, 255, 0)  ;                   
    }          

    fill(255, alpha0);
    text(words[0], x0, y);
    fill(255, alpha1);
    text(words[1], x1, y);
    fill(255, alpha2);
    text(words[2], x2, y);
    fill(255, alpha3);
    text(words[3], x3, y);
    pop();
  } else {
    switch_scene = true;
    setTimeout(() => { scene = 7; }, 500);
  }
  push();

  translate(-width/2, -height/2);

  textAlign(RIGHT, BOTTOM);
  textFont(font_1);               
  textSize(64);

  const cycle = 2000;             
  let t = millis() % cycle;
  let alpha = map(sin(TWO_PI * t / cycle), -1, 1, 50, 255);

  fill(255, alpha);
  textFont(font_1);
  textSize(32);
  text("Please put your hand in front of the camera", width - 40, height - 30);
  
pop();

}

// scene = 7
function scene4() {
  background(0);
  count_4 ++;
  // 拇指尖 到 食指尖 4 8
  let two_fingers = null;
  if (hands.length > 0) {
    const h = hands[0].keypoints;
    // const t4 = h[4], t8 = h[8];
    two_fingers = dist(h[4].x, h[4].y, h[8].x, h[8].y);
  }

//console.log('frame:',proximityFrames)

  push();
    translate(0, 0, 0);
    scale(-1, 1);
    for (let blk of blocks3) {
      blk.x += blk.dx * speedF;
      blk.y += blk.dy * speedF;
      blk.z += blk.dz * speedF;
      blk.display();
      blk.update();
    }
  pop();

  // SHOW hand!
  if (show_hand && hands.length > 0) {
    push();
//     resetMatrix();
      scale(-1,1);
      translate(-width/2, -height/2);
      const h = hands[0].keypoints;
      noFill();
      stroke(0,255,0);
      strokeWeight(2);
      line(h[4].x, h[4].y, h[8].x, h[8].y);
      noStroke();
      fill(0, 255, 0);
      circle(h[4].x, h[4].y, 10);
      circle(h[8].x, h[8].y, 10);
      // for (let i = 0; i < h.length; i++) {
      //   if (i === 4 || i === 8) {
      //     fill(255, 0, 0);    
      //     circle(h[i].x, h[i].y, 12);
      //   } else {
      //     fill(0, 255, 0);    
      //     circle(h[i].x, h[i].y, 8);
      //   }
      // }
    pop();
  }
  
  push();
  translate(-width/2, -height/2);
  scale(-1,1);
  if (hands.length > 0) {
    if (two_fingers < 200 || two_fingers > 10) {
      speedF = map(two_fingers, 10, 200, -6, 0);
    } 
    if (two_fingers > 200 || two_fingers < 350) {
      speedF = map(two_fingers, 200, 350, 0, 2);
    }
  } else {
    speedF = lerp(speedF, 0, 0.015);
  }
  pop();

if (blocks3.length > 1) {
  if (abs(blocks3[1].z) < 50) {
    proximityFrames++;
  } else {
    proximityFrames = 0;
  }
}

if (proximityFrames > 600) {
  switch_scene = true;
  setTimeout(() => { scene = 8; }, 0);
}

if (count_4 > 12000) {
  switch_scene = true;
  setTimeout(() => { scene = 9; }, 0);
}

} 

// scene = 8
function scene_text_4(){
  count_text_4++;
  if (count_text_4 <= text_time + 400){
    background(0);
    push();
    translate(-width/2, -height/2);
    textAlign(CENTER, CENTER);
    textFont(font_1);
    textSize(64);

    let words = ["Remember, ", "you are",'a photon'];
    let sep   = 20;  

    let w0 = textWidth(words[0]);
    let w1 = textWidth(words[1]);
    let w2 = textWidth(words[2]);
    let totalW = w0 + sep + w1 + sep + w2;
    let startX = width/2 - totalW/2;
    let x0 = startX + w0/2;
    let x1 = startX + w0 + sep + w1/2;
    let x2 = startX + w0 + sep + w1 + sep + w2/2;    
    let y  = height/2;
                        
    if (count_text_4 <= text_time) {
      alpha3 = count_text_4 > text_time/5               ? 255 : 0;                 
      alpha2 = count_text_4 > 2*text_time/5     ? 255 : 0;                    
      alpha1 = count_text_4 > 3*text_time/5   ? 255 : 0;                                
    } else if (count_text_4 >= text_time && count_text_4 <= text_time + 400){
      alpha3 = map(count_text_4 - text_time, 0, 300, 255, 0) ;
      alpha2 = map(count_text_4 - text_time, 0, 300, 255, 0)  ;                           
      alpha1 = map(count_text_4 - text_time, 0, 300, 255, 0)  ;                            
    }

    fill(255, alpha1);
    text(words[0], x0, y);
    fill(255, alpha2);
    text(words[1], x1, y);
    fill(255, alpha3);
    text(words[2], x2, y);
    pop();
  } else {
    switch_scene = true;
    setTimeout(() => { scene = 10; }, 500);
  }
}

// scene = 9
function scene_text_5(){
  count_text_5++;
  if (count_text_5 <= text_time + 400){
    background(0);
    push();
    translate(-width/2, -height/2);
    textAlign(CENTER, CENTER);
    textFont(font_1);
    textSize(64);

    let words = ["Well, ", "it seems that",'you have','got lost'];
    let sep   = 20;  

    let w0 = textWidth(words[0]);
    let w1 = textWidth(words[1]);
    let w2 = textWidth(words[2]);
    let w3 = textWidth(words[3]);
    let totalW = w0 + sep + w1 + sep + w2 + sep + w3;
    let startX = width/2 - totalW/2;
    let x0 = startX + w0/2;
    let x1 = startX + w0 + sep + w1/2;
    let x2 = startX + w0 + sep + w1 + sep + w2/2;
    let x3 = startX + w0 + sep + w1 + sep + w2 + sep + w3/2;     
    let y  = height/2;              

    if (count_text_5 <= text_time) {
      alpha3 = count_text_5 > text_time/6     ? 255 : 0;                 
      alpha2 = count_text_5 > text_time/3      ? 255 : 0;                    
      alpha1 = count_text_5 > text_time/2      ? 255 : 0;                   
      alpha0 = count_text_5 > 2*text_time/3      ? 255 : 0;                                 
    } else if (count_text_5 >= text_time && count_text_5 <= text_time + 400){
      alpha3 = map(count_text_5 - text_time, 0, 300, 255, 0) ;
      alpha2 = map(count_text_5 - text_time, 0, 300, 255, 0)  ;                           
      alpha1 = map(count_text_5 - text_time, 0, 300, 255, 0)  ;                  
      alpha0 = map(count_text_5 - text_time, 0, 300, 255, 0)  ;                   
    }          
    
    fill(255, alpha0);
    text(words[0], x0, y);
    fill(255, alpha1);
    text(words[1], x1, y);
    fill(255, alpha2);
    text(words[2], x2, y);
    fill(255, alpha3);
    text(words[3], x3, y);
    pop();
  } else {
    switch_scene = true;
    setTimeout(() => { scene = 10; }, 500);
  }
}

// scene = 10            
function scene5(pg) {
  count_5++;

  let fadeIn  = 120;
  let hold    = 720;
  let fadeOut = 120;
  
  let segment = fadeIn + hold + fadeOut;
  let total   = segment * 4;  

  if (count_5 <= total) {
    pg.push();
      pg.background(0);
      pg.stroke(0);
      pg.strokeWeight(5);
      pg.fill(255, 50);
      pg.translate(0, 300, -200);
      drawTerrain(pg);
    pg.pop();

    pg.push();
      pg.translate(0, 180, -200);
      pg.fill(255);
      pg.rotateY(frameCount / 200);
      pg.box(15);
    pg.pop();

    let idx = floor((count_5 - 1) / segment);
    let t   = (count_5 - 1) % segment;
    let alpha;
    if (t < fadeIn) {
      alpha = map(t, 0, fadeIn, 0, 255);
    } else if (t < fadeIn + hold) {
      alpha = 255;
    } else {
      alpha = map(t, fadeIn + hold, segment, 255, 0);
    }

    pg.push();
      pg.resetMatrix();
      pg.imageMode(CENTER);
      pg.tint(255, alpha);

      const imgs = [ text3, text1, text2, text4];
      const img  = imgs[idx];
      const targetW = pg.width * 0.7;
      const aspect  = img.height / img.width;
      const targetH = targetW * aspect;

      pg.image(img, 0, -230, targetW, targetH);
    pg.pop();
  }

  if (count_5 > total) {
    background(0);
    count_5 = 0;
    switch_scene = true;
    location.reload();
  }
}




function initTerrain() {
    terrain.cols = terrain.w / terrain.scale;
    terrain.rows = terrain.h / terrain.scale;
    for (let x = 0; x < terrain.cols; ++x) {
        terrain.coords[x] = [];
    }
}

function drawTerrain(pg) {
    terrain.flightPos -= terrain.flightSpeed;
    shiftNoiseSpace();
    pg.rotateX(PI / 2);
    pg.translate((-terrain.w / 2) + 1, (-terrain.h / 2) + 30);

    for (let y = 0; y < terrain.rows - 1; ++y) {
        pg.beginShape(TRIANGLE_STRIP);
        for (let x = 0; x < terrain.cols; ++x) {
            pg.vertex(x * terrain.scale, y * terrain.scale, terrain.coords[x][y]);
            pg.vertex(x * terrain.scale, (y + 1) * terrain.scale, terrain.coords[x][y + 1]);
        }
        pg.endShape();
    }
}

function shiftNoiseSpace() {
    let yOffset = terrain.flightPos;
    for (let y = 0; y < terrain.rows; ++y) {
        let xOffset = 0;
        for (let x = 0; x < terrain.cols; ++x) {
            terrain.coords[x][y] = map(noise(xOffset, yOffset), 0, 1, -terrain.terrainHeight, terrain.terrainHeight);
            xOffset += terrain.noiseDelta;
        }
        yOffset += terrain.noiseDelta;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    anaglyph.resize();
}


function displayFrameRate() {
    textFont(font_1);
    fill(0);
    noStroke();
    textSize(18);
    text(frameRate(), -width / 2 + 50, -height / 2 + 50);
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    anaglyph.resize();
}

function mousePressed() {
    speed_up = true;
}

// Callback function for when handPose outputs data
function gotHands(results) {
    // Save the output to the hands variable
    hands = results;
  }
  

