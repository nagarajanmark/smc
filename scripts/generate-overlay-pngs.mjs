import fs from "fs";
import path from "path";
import zlib from "zlib";

const overlaysDir = path.resolve("public/overlays");
if (!fs.existsSync(overlaysDir)) {
  fs.mkdirSync(overlaysDir, { recursive: true });
}

// Function to create a raw RGBA PNG
function createPng(width, height, drawFn) {
  const buffer = Buffer.alloc(width * height * 4);

  const setPixel = (x, y, r, g, b, a = 255) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const idx = (y * width + x) * 4;
    buffer[idx] = r;
    buffer[idx + 1] = g;
    buffer[idx + 2] = b;
    buffer[idx + 3] = a;
  };

  const fillRect = (x, y, w, h, r, g, b, a = 255) => {
    for (let py = Math.max(0, y); py < Math.min(height, y + h); py++) {
      for (let px = Math.max(0, x); px < Math.min(width, x + w); px++) {
        setPixel(px, py, r, g, b, a);
      }
    }
  };

  drawFn({ setPixel, fillRect, width, height });

  // Add filter byte (0 = None) to each scanline
  const scanlines = [];
  for (let y = 0; y < height; y++) {
    const line = Buffer.alloc(1 + width * 4);
    line[0] = 0; // Filter byte
    buffer.copy(line, 1, y * width * 4, (y + 1) * width * 4);
    scanlines.push(line);
  }

  const rawData = Buffer.concat(scanlines);
  const compressed = zlib.deflateSync(rawData);

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth: 8
  ihdrData[9] = 6; // Color type: 6 (RGBA)
  ihdrData[10] = 0; // Compression: 0
  ihdrData[11] = 0; // Filter: 0
  ihdrData[12] = 0; // Interlace: 0

  function createChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, "ascii");
    const toCrc = Buffer.concat([typeBuf, data]);
    const crc = crc32(toCrc);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([len, toCrc, crcBuf]);
  }

  const ihdrChunk = createChunk("IHDR", ihdrData);
  const idatChunk = createChunk("IDAT", compressed);
  const iendChunk = createChunk("IEND", Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Simple CRC32 implementation for PNG chunks
function crc32(buf) {
  let table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

// 1. Sliding Glass Door Transparent PNG (600x800)
const slidingPng = createPng(600, 800, ({ fillRect }) => {
  // Outer frame
  fillRect(20, 20, 560, 760, 30, 30, 30, 255);
  // Outer frame cutouts
  fillRect(35, 35, 260, 730, 180, 220, 240, 90); // Semi-transparent glass left
  fillRect(305, 35, 260, 730, 180, 220, 240, 90); // Semi-transparent glass right
  // Center Meeting Stile
  fillRect(290, 25, 20, 750, 40, 40, 40, 255);
  // Glass frame borders
  fillRect(35, 35, 260, 15, 50, 50, 50, 255);
  fillRect(35, 750, 260, 15, 50, 50, 50, 255);
  fillRect(305, 35, 260, 15, 50, 50, 50, 255);
  fillRect(305, 750, 260, 15, 50, 50, 50, 255);
  // Architectural Handles
  fillRect(275, 380, 10, 120, 197, 168, 128, 255);
  fillRect(315, 380, 10, 120, 197, 168, 128, 255);
});
fs.writeFileSync(path.join(overlaysDir, "sliding-door.png"), slidingPng);

// 2. Architectural Window Transparent PNG (500x600)
const windowPng = createPng(500, 600, ({ fillRect }) => {
  // Outer frame
  fillRect(20, 20, 460, 560, 40, 40, 40, 255);
  // Glass Inner
  fillRect(45, 45, 410, 510, 200, 230, 250, 80);
  // Sash Frame Inner
  fillRect(40, 40, 420, 12, 60, 60, 60, 255);
  fillRect(40, 548, 420, 12, 60, 60, 60, 255);
  fillRect(40, 40, 12, 520, 60, 60, 60, 255);
  fillRect(448, 40, 12, 520, 60, 60, 60, 255);
  // European Window Handle
  fillRect(435, 290, 8, 50, 197, 168, 128, 255);
  fillRect(435, 305, 25, 8, 197, 168, 128, 255);
});
fs.writeFileSync(path.join(overlaysDir, "window-casement.png"), windowPng);
fs.writeFileSync(path.join(overlaysDir, "window-upvc.png"), windowPng);

// 3. Frameless Interior Door PNG (450x800)
const interiorPng = createPng(450, 800, ({ fillRect }) => {
  // Outer shadow gap
  fillRect(15, 15, 420, 770, 20, 20, 20, 255);
  // Main wood leaf
  fillRect(25, 25, 400, 750, 70, 55, 45, 255);
  // Horizontal design grooves
  for (let y = 120; y < 750; y += 120) {
    fillRect(35, y, 380, 4, 30, 25, 20, 255);
  }
  // Flush Magnetic Lever Handle
  fillRect(370, 400, 40, 12, 197, 168, 128, 255);
  fillRect(370, 395, 12, 22, 160, 130, 95, 255);
});
fs.writeFileSync(path.join(overlaysDir, "door-interior.png"), interiorPng);
fs.writeFileSync(path.join(overlaysDir, "door-bifold.png"), slidingPng);

console.log("Generated clean transparent PNG overlays in public/overlays/!");
