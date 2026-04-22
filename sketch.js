function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  // 將色彩模式設定為 HSB (色相 0-360, 飽和度 0-100, 亮度 0-100)
  // 這非常適合用來做彩虹漸層與明暗控制
  colorMode(HSB, 360, 100, 100); 
}

function draw() {
  // 在畫背景前關閉發光效果，避免背景出現殘影
  drawingContext.shadowBlur = 0;
  background(0); // 黑色背景能讓霓虹感更明顯

  let spacing = 60; // 圓形之間的間距
  let radius = 45;  // 圓形的大小 (稍微縮小一點，讓外發光的霓虹效果有空間展現)

  for (let x = spacing / 2; x < width; x += spacing) {
    for (let y = spacing / 2; y < height; y += spacing) {
      
      // 1. 決定彩虹漸層 (Hue)
      // 利用座標 (x, y) 和時間 (frameCount) 算出 0~360 的色相值，產生彩虹流動感
      let h = (x * 0.2 + y * 0.2 + frameCount) % 360;
      
      // 2. 決定明暗變化 (Brightness)
      // sin() 會產生波浪般的數值變化，map() 將它轉換為亮度 20 (暗) 到 100 (亮)
      let b = map(sin(frameCount * 0.05 + x * 0.01 + y * 0.01), -1, 1, 20, 100);

      // 設定當下的顏色
      let c = color(h, 100, b); 
      
      // 3. 設定霓虹發光效果
      drawingContext.shadowBlur = 20; // 霓虹發光的暈染範圍 (數值越大越模糊)
      drawingContext.shadowColor = c; // 發光的顏色與圓形本體相同

      fill(c);
      ellipse(x, y, radius, radius);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}