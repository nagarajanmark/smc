import fs from "fs";
import path from "path";

const modelsDir = path.resolve("public/models");
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

/**
 * Creates a valid glTF 2.0 Binary (.glb) container from mesh data (vertices, normals, indices, material colors).
 */
function createGLB({
  name = "ArchitecturalDoor",
  positions,
  normals,
  indices,
  materials = [],
  primitives = [],
}) {
  // Float32 arrays for positions & normals, Uint16 for indices
  const posBuffer = Buffer.from(new Float32Array(positions).buffer);
  const normBuffer = Buffer.from(new Float32Array(normals).buffer);
  const indBuffer = Buffer.from(new Uint16Array(indices).buffer);

  // Pad each buffer chunk to 4-byte alignment
  const pad = (buf) => {
    const rem = buf.length % 4;
    return rem === 0 ? buf : Buffer.concat([buf, Buffer.alloc(4 - rem)]);
  };

  const posPadded = pad(posBuffer);
  const normPadded = pad(normBuffer);
  const indPadded = pad(indBuffer);

  const binBuffer = Buffer.concat([posPadded, normPadded, indPadded]);

  const posByteOffset = 0;
  const posByteLength = posBuffer.length;

  const normByteOffset = posPadded.length;
  const normByteLength = normBuffer.length;

  const indByteOffset = posPadded.length + normPadded.length;
  const indByteLength = indBuffer.length;

  // Calculate min & max bounds for positions
  let min = [Infinity, Infinity, Infinity];
  let max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < positions.length; i += 3) {
    min[0] = Math.min(min[0], positions[i]);
    min[1] = Math.min(min[1], positions[i + 1]);
    min[2] = Math.min(min[2], positions[i + 2]);

    max[0] = Math.max(max[0], positions[i]);
    max[1] = Math.max(max[1], positions[i + 1]);
    max[2] = Math.max(max[2], positions[i + 2]);
  }

  const gltf = {
    asset: { version: "2.0", generator: "SMC Fabrication 3D Engine" },
    scene: 0,
    scenes: [{ name: name, nodes: [0] }],
    nodes: [{ name: name, mesh: 0 }],
    meshes: [
      {
        name: name,
        primitives: primitives.length > 0 ? primitives : [
          {
            attributes: { POSITION: 0, NORMAL: 1 },
            indices: 2,
            material: 0,
          },
        ],
      },
    ],
    materials: materials.length > 0 ? materials : [
      {
        name: "ArchitecturalFinish",
        pbrMetallicRoughness: {
          baseColorFactor: [0.2, 0.18, 0.16, 1.0],
          metallicFactor: 0.7,
          roughnessFactor: 0.35,
        },
      },
    ],
    accessors: [
      {
        bufferView: 0,
        byteOffset: 0,
        componentType: 5126, // FLOAT
        count: positions.length / 3,
        type: "VEC3",
        max: max,
        min: min,
      },
      {
        bufferView: 1,
        byteOffset: 0,
        componentType: 5126, // FLOAT
        count: normals.length / 3,
        type: "VEC3",
      },
      {
        bufferView: 2,
        byteOffset: 0,
        componentType: 5123, // UNSIGNED_SHORT
        count: indices.length,
        type: "SCALAR",
      },
    ],
    bufferViews: [
      {
        buffer: 0,
        byteOffset: posByteOffset,
        byteLength: posByteLength,
        target: 34962, // ARRAY_BUFFER
      },
      {
        buffer: 0,
        byteOffset: normByteOffset,
        byteLength: normByteLength,
        target: 34962, // ARRAY_BUFFER
      },
      {
        buffer: 0,
        byteOffset: indByteOffset,
        byteLength: indByteLength,
        target: 34963, // ELEMENT_ARRAY_BUFFER
      },
    ],
    buffers: [
      {
        byteLength: binBuffer.length,
      },
    ],
  };

  const jsonString = JSON.stringify(gltf);
  let jsonBuffer = Buffer.from(jsonString, "utf8");
  // 4-byte align JSON chunk with spaces
  const jsonRem = jsonBuffer.length % 4;
  if (jsonRem !== 0) {
    jsonBuffer = Buffer.concat([jsonBuffer, Buffer.from(" ".repeat(4 - jsonRem), "utf8")]);
  }

  // GLB Header (12 bytes)
  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546c67, 0); // Magic: 'glTF'
  header.writeUInt32LE(2, 4); // Version: 2

  // Total Length = 12 (header) + 8 (json chunk header) + jsonBuffer.length + 8 (bin chunk header) + binBuffer.length
  const totalLength = 12 + 8 + jsonBuffer.length + 8 + binBuffer.length;
  header.writeUInt32LE(totalLength, 8);

  // JSON Chunk Header
  const jsonChunkHeader = Buffer.alloc(8);
  jsonChunkHeader.writeUInt32LE(jsonBuffer.length, 0);
  jsonChunkHeader.writeUInt32LE(0x4e4f534a, 4); // 'JSON'

  // BIN Chunk Header
  const binChunkHeader = Buffer.alloc(8);
  binChunkHeader.writeUInt32LE(binBuffer.length, 0);
  binChunkHeader.writeUInt32LE(0x004e4942, 4); // 'BIN\0'

  return Buffer.concat([
    header,
    jsonChunkHeader,
    jsonBuffer,
    binChunkHeader,
    binBuffer,
  ]);
}

/**
 * Builds a 3D architectural door geometry with jambs, leaf panel, flutes and pull handle.
 */
function buildDoorGeometry() {
  const positions = [];
  const normals = [];
  const indices = [];

  function addBox(x, y, z, w, h, d) {
    const startIndex = positions.length / 3;
    const hw = w / 2;
    const hh = h / 2;
    const hd = d / 2;

    // 24 vertices for standard cube with proper face normals
    // Front (+Z)
    positions.push(
      x - hw, y - hh, z + hd,
      x + hw, y - hh, z + hd,
      x + hw, y + hh, z + hd,
      x - hw, y + hh, z + hd
    );
    normals.push(
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1
    );

    // Back (-Z)
    positions.push(
      x + hw, y - hh, z - hd,
      x - hw, y - hh, z - hd,
      x - hw, y + hh, z - hd,
      x + hw, y + hh, z - hd
    );
    normals.push(
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1
    );

    // Top (+Y)
    positions.push(
      x - hw, y + hh, z + hd,
      x + hw, y + hh, z + hd,
      x + hw, y + hh, z - hd,
      x - hw, y + hh, z - hd
    );
    normals.push(
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0
    );

    // Bottom (-Y)
    positions.push(
      x - hw, y - hh, z - hd,
      x + hw, y - hh, z - hd,
      x + hw, y - hh, z + hd,
      x - hw, y - hh, z + hd
    );
    normals.push(
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0
    );

    // Right (+X)
    positions.push(
      x + hw, y - hh, z + hd,
      x + hw, y - hh, z - hd,
      x + hw, y + hh, z - hd,
      x + hw, y + hh, z + hd
    );
    normals.push(
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0
    );

    // Left (-X)
    positions.push(
      x - hw, y - hh, z - hd,
      x - hw, y - hh, z + hd,
      x - hw, y + hh, z + hd,
      x - hw, y + hh, z - hd
    );
    normals.push(
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0
    );

    for (let face = 0; face < 6; face++) {
      const b = startIndex + face * 4;
      indices.push(b, b + 1, b + 2, b, b + 2, b + 3);
    }
  }

  // 1. Outer Frame Left Jamb (Width 0.08, Height 2.8, Depth 0.14)
  addBox(-0.75, 1.4, 0, 0.08, 2.8, 0.14);
  // 2. Outer Frame Right Jamb
  addBox(0.75, 1.4, 0, 0.08, 2.8, 0.14);
  // 3. Top Header Jamb
  addBox(0, 2.76, 0, 1.58, 0.08, 0.14);

  // 4. Main Door Leaf (Height 2.68m, Width 1.38m, Depth 0.08m)
  addBox(0, 1.36, 0, 1.38, 2.68, 0.08);

  // 5. Architectural Vertical Flutes (3D relief ribs on door face)
  for (let i = -4; i <= 4; i++) {
    addBox(i * 0.13, 1.36, 0.045, 0.02, 2.4, 0.015);
  }

  // 6. Full-Height Minimalist Pull Bar Handle (Champagne Bronze / Charcoal)
  addBox(0.55, 1.36, 0.075, 0.03, 1.8, 0.03);
  addBox(0.55, 2.1, 0.055, 0.025, 0.04, 0.04);
  addBox(0.55, 0.62, 0.055, 0.025, 0.04, 0.04);

  // 7. Pivot Base & Top Hinge Hardware
  addBox(-0.35, 0.02, 0, 0.08, 0.04, 0.08);
  addBox(-0.35, 2.7, 0, 0.06, 0.04, 0.06);

  return { positions, normals, indices };
}

// Generate the 3D files
const { positions, normals, indices } = buildDoorGeometry();

const modelNames = [
  "door-pivot.glb",
  "door-wood.glb",
  "sliding-door.glb",
  "door-interior.glb",
  "door-bifold.glb",
  "door-custom.glb",
  "window-casement.glb",
  "window-upvc.glb",
];

for (const name of modelNames) {
  const glbBuffer = createGLB({
    name: name.replace(".glb", ""),
    positions,
    normals,
    indices,
    materials: [
      {
        name: "SMC_Architectural_Material",
        pbrMetallicRoughness: {
          baseColorFactor: name.includes("wood")
            ? [0.45, 0.28, 0.16, 1.0]
            : [0.15, 0.15, 0.15, 1.0],
          metallicFactor: name.includes("wood") ? 0.1 : 0.75,
          roughnessFactor: name.includes("wood") ? 0.6 : 0.35,
        },
      },
    ],
  });

  const targetPath = path.join(modelsDir, name);
  fs.writeFileSync(targetPath, glbBuffer);
  console.log(`✓ Generated standard-compliant 3D GLB: ${targetPath} (${glbBuffer.length} bytes)`);
}

console.log("All 3D models generated successfully!");
