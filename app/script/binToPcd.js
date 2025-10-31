const fs = require('fs');
const path = require('path');

/**
 * 将.bin文件转换为ASCII格式的.pcd文件
 * @param {string} inputDir 输入文件夹路径
 * @param {string} outputDir 输出文件夹路径
 */
function convertBinToPcd(inputDir, outputDir) {
  // 检查输入目录是否存在
  if (!fs.existsSync(inputDir)) {
    console.error(`输入目录 ${inputDir} 不存在`);
    return;
  }

  // 创建输出目录（如果不存在）
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 读取输入目录中的所有.bin文件
  const files = fs.readdirSync(inputDir).filter(file => path.extname(file) === '.bin');

  if (files.length === 0) {
    console.log('在输入目录中未找到 .bin 文件');
    return;
  }

  files.forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputFileName = path.basename(file, '.bin') + '.pcd';
    const outputPath = path.join(outputDir, outputFileName);

    try {
      convertSingleFile(inputPath, outputPath);
      console.log(`成功转换: ${file} -> ${outputFileName}`);
    } catch (error) {
      console.error(`转换失败 ${file}:`, error.message);
    }
  });
}

/**
 * 转换单个.bin文件为.pcd文件
 * @param {string} inputPath 输入文件路径
 * @param {string} outputPath 输出文件路径
 */
function convertSingleFile(inputPath, outputPath) {
  // 读取二进制数据
  const buffer = fs.readFileSync(inputPath);
  
  // 假设每个点包含 x, y, z, intensity (4个32位浮点数 = 16字节)
  const pointSize = 16;
  const numPoints = buffer.length / pointSize;
  
  // 解析点数据
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const offset = i * pointSize;
    const x = buffer.readFloatLE(offset);
    const y = buffer.readFloatLE(offset + 4);
    const z = buffer.readFloatLE(offset + 8);
    const intensity = buffer.readFloatLE(offset + 12);
    
    points.push({ x, y, z, intensity });
  }
  
  // 计算到原点的距离并确定颜色
  const distances = points.map(point => Math.sqrt(point.x * point.x + point.y * point.y + point.z * point.z));
  const minDistance = Math.min(...distances);
  const maxDistance = Math.max(...distances);
  const distanceRange = maxDistance - minDistance || 1; // 防止除零错误
  
  // 生成带颜色的点数据
  const coloredPoints = points.map((point, index) => {
    // 根据距离计算颜色值 (较近的点更亮，较远的点更暗)
    const normalizedDistance = (distances[index] - minDistance) / distanceRange;
    // 使用反向比例，使近距离的点更亮
    const brightness = Math.floor(255 * (1 - normalizedDistance));
    // RGB值相同，形成灰度色
    const rgb = brightness | (brightness << 8) | (brightness << 16);
    
    return {
      x: point.x,
      y: point.y,
      z: point.z,
      intensity: point.intensity,
      rgb: rgb
    };
  });
  
  // 生成PCD文件内容
  const pcdContent = generatePcdContent(coloredPoints, numPoints);
  
  // 写入文件
  fs.writeFileSync(outputPath, pcdContent);
}

/**
 * 生成PCD文件内容
 * @param {Array} points 点数据数组
 * @param {number} numPoints 点数量
 * @returns {string} PCD文件内容
 */
function generatePcdContent(points, numPoints) {
  let content = '';
  
  // PCD头部信息
  content += '# .PCD v0.7 - Point Cloud Data file format\n';
  content += 'VERSION 0.7\n';
  content += 'FIELDS x y z intensity rgb\n';
  content += 'SIZE 4 4 4 4 4\n';
  content += 'TYPE F F F F U\n';
  content += 'COUNT 1 1 1 1 1\n';
  content += `WIDTH ${numPoints}\n`;
  content += `HEIGHT 1\n`;
  content += 'VIEWPOINT 0 0 0 1 0 0 0\n';
  content += `POINTS ${numPoints}\n`;
  content += 'DATA ascii\n';
  
  // 添加点数据
  points.forEach(point => {
    content += `${point.x} ${point.y} ${point.z} ${point.intensity} ${point.rgb}\n`;
  });
  
  return content;
}

// 获取命令行参数
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('使用方法: node binToPcd.js <输入文件夹路径> <输出文件夹路径>');
  console.log('示例: node binToPcd.js ./input ./output');
  process.exit(1);
}

const inputDir = args[0];
const outputDir = args[1];

convertBinToPcd(inputDir, outputDir);
console.log('转换完成!');