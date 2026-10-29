// 宣告全域變數來儲存角色圖片與狀態
let imgRightToLeft; // 圖/01/合併1.png (8張圖，面向左/預設動畫)
let imgLeftToRight; // 圖/02/合併2.png (12張圖，面向右/往右移動動畫)

let posX; // 角色的 X 軸位置
let posY; // 角色的 Y 軸位置
let speed = 4; // 角色移動速度

let currentFrame = 0; // 目前播放到的圖幀索引
let frameCounter = 0; // 用於控制動畫播放速度的計數器
let frameDelay = 5; // 每隔幾幀更新一次動畫圖幀 (數值越小播放越快)

// 預載入圖片資源
function preload() {
  // 載入預設/往左顯示的圖片精靈 (8張圖，總寬 1019，高 195)
  imgRightToLeft = loadImage('圖/01/合併1.png');
  // 載入往右移動的圖片精靈 (12張圖，總寬 1019，高 195)
  imgLeftToRight = loadImage('圖/02/合併2.png');
}

// 初始化設定
function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  
  // 將角色的初始位置設定在畫畫正中央
  posX = width / 2;
  posY = height / 2;
  
  // 設定圖片繪製基準點為圖片中心點
  imageMode(CENTER);
}

// 主要繪製迴圈 (每秒執行約 60 次)
function draw() {
  // 設定背景顏色為淺粉色 (#FFB6C1)
  background(255, 182, 193);
  
  // 檢查是否按下鍵盤右方向鍵 (RIGHT_ARROW)
  if (keyIsDown(RIGHT_ARROW)) {
    // 角色往右移動
    posX += speed;
    
    // 定義「圖/02/合併2.png」的參數
    let totalFrames = 12; // 總共有 12 張子圖
    let spriteWidth = 1019 / totalFrames; // 單張子圖的寬度 (約 84.92 px)
    let spriteHeight = 195; // 子圖的高度
    
    // 更新動畫圖幀計數
    updateFrame(totalFrames);
    
    // 計算當前圖幀在精靈圖片中的裁切 X 座標
    let sx = currentFrame * spriteWidth;
    
    // 繪製往右移動的精靈圖
    // image(來源圖片, 畫布X, 畫布Y, 顯示寬, 顯示高, 裁切X, 裁切Y, 裁切寬, 裁切高)
    image(imgLeftToRight, posX, posY, spriteWidth, spriteHeight, sx, 0, spriteWidth, spriteHeight);
    
  } else {
    // 沒按下右鍵時，顯示預設循環動畫 (圖/01/合併1.png)
    
    // 定義「圖/01/合併1.png」的參數
    let totalFrames = 8; // 總共有 8 張子圖
    let spriteWidth = 1019 / totalFrames; // 單張子圖的寬度 (約 127.375 px)
    let spriteHeight = 195; // 子圖的高度
    
    // 更新動畫圖幀計數
    updateFrame(totalFrames);
    
    // 計算當前圖幀在精靈圖片中的裁切 X 座標
    let sx = currentFrame * spriteWidth;
    
    // 繪製預設動畫的精靈圖
    image(imgRightToLeft, posX, posY, spriteWidth, spriteHeight, sx, 0, spriteWidth, spriteHeight);
  }
}

// 控制動畫圖幀切換的自訂函式
function updateFrame(maxFrames) {
  // 增加計數器
  frameCounter++;
  
  // 當計數器達到指定的延遲間隔時，切換到下一張圖幀
  if (frameCounter >= frameDelay) {
    frameCounter = 0; // 重置計數器
    currentFrame = (currentFrame + 1) % maxFrames; // 循環切換圖幀索引
  }
}

// 當使用者調整瀏覽器視窗大小時，自動重繪畫布為全螢幕
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}