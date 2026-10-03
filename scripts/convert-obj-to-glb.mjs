import fs from "fs";
import path from "path";

// Check obj file in public/models/door
const objPath = path.resolve("public/models/door/Standart SO1_910_F_Door N140326.obj");

if (fs.existsSync(objPath)) {
  console.log("Found OBJ model file:", objPath);
  const objContent = fs.readFileSync(objPath, "utf8");
  const lines = objContent.split("\n");

  const vertices = [];
  const normals = [];
  const faces = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("v ")) {
      const parts = trimmed.split(/\s+/).slice(1).map(Number);
      // Scale down if OBJ is in millimeters or large units (scale by 0.001 or normalize)
      vertices.push(parts);
    } else if (trimmed.startsWith("vn ")) {
      const parts = trimmed.split(/\s+/).slice(1).map(Number);
      normals.push(parts);
    } else if (trimmed.startsWith("f ")) {
      const parts = trimmed.split(/\s+/).slice(1);
      const faceIndices = parts.map((p) => {
        const vIdx = parseInt(p.split("/")[0], 10) - 1;
        return vIdx;
      });
      if (faceIndices.length >= 3) {
        // Triangulate
        faces.push([faceIndices[0], faceIndices[1], faceIndices[2]]);
        if (faceIndices.length === 4) {
          faces.push([faceIndices[0], faceIndices[2], faceIndices[3]]);
        }
      }
    }
  }

  console.log(`Parsed OBJ: ${vertices.length} vertices, ${faces.length} triangles`);

  // Calculate bounding box to normalize scale to ~2.5m door height
  let minY = Infinity, maxY = -Infinity;
  for (const v of vertices) {
    if (v[1] < minY) minY = v[1];
    if (v[1] > maxY) maxY = v[1];
  }

  const height = maxY - minY;
  const scale = height > 50 ? 2.4 / height : 1.0;
  console.log(`OBJ door height: ${height}, computed scale factor: ${scale}`);

  const positions = [];
  const outNormals = [];
  const indices = [];

  for (let i = 0; i < vertices.length; i++) {
    const v = vertices[i];
    // Center X & Z, floor at Y = 0
    positions.push(v[0] * scale, (v[1] - minY) * scale, v[2] * scale);
    if (normals[i]) {
      outNormals.push(normals[i][0], normals[i][1], normals[i][2]);
    } else {
      outNormals.push(0, 1, 0);
    }
  }

  for (const f of faces) {
    indices.push(f[0], f[1], f[2]);
  }

  // Generate standard glTF 2.0 Binary (.glb)
  const posBuffer = Buffer.from(new Float32Array(positions).buffer);
  const normBuffer = Buffer.from(new Float32Array(outNormals).buffer);
  const indBuffer = Buffer.from(new Uint16Array(indices).buffer);

  const pad = (buf) => {
    const rem = buf.length % 4;
    return rem === 0 ? buf : Buffer.concat([buf, Buffer.alloc(4 - rem)]);
  };

  const posPadded = pad(posBuffer);
  const normPadded = pad(normBuffer);
  const indPadded = pad(indBuffer);

  const binBuffer = Buffer.concat([posPadded, normPadded, indPadded]);

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
    scenes: [{ name: "SMC_Door", nodes: [0] }],
    nodes: [{ name: "SMC_Door_Node", mesh: 0 }],
    meshes: [
      {
        name: "SMC_Door_Mesh",
        primitives: [
          {
            attributes: { POSITION: 0, NORMAL: 1 },
            indices: 2,
            material: 0,
          },
        ],
      },
    ],
    materials: [
      {
        name: "SMC_Door_Material",
        pbrMetallicRoughness: {
          baseColorFactor: [0.35, 0.25, 0.18, 1.0],
          metallicFactor: 0.3,
          roughnessFactor: 0.5,
        },
      },
    ],
    accessors: [
      {
        bufferView: 0,
        byteOffset: 0,
        componentType: 5126,
        count: positions.length / 3,
        type: "VEC3",
        max: max,
        min: min,
      },
      {
        bufferView: 1,
        byteOffset: 0,
        componentType: 5126,
        count: outNormals.length / 3,
        type: "VEC3",
      },
      {
        bufferView: 2,
        byteOffset: 0,
        componentType: 5123,
        count: indices.length,
        type: "SCALAR",
      },
    ],
    bufferViews: [
      {
        buffer: 0,
        byteOffset: 0,
        byteLength: posBuffer.length,
        target: 34962,
      },
      {
        buffer: 0,
        byteOffset: posPadded.length,
        byteLength: normBuffer.length,
        target: 34962,
      },
      {
        buffer: 0,
        byteOffset: posPadded.length + normPadded.length,
        byteLength: indBuffer.length,
        target: 34963,
      },
    ],
    buffers: [{ byteLength: binBuffer.length }],
  };

  const jsonString = JSON.stringify(gltf);
  let jsonBuffer = Buffer.from(jsonString, "utf8");
  const jsonRem = jsonBuffer.length % 4;
  if (jsonRem !== 0) {
    jsonBuffer = Buffer.concat([jsonBuffer, Buffer.from(" ".repeat(4 - jsonRem), "utf8")]);
  }

  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546c67, 0);
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(12 + 8 + jsonBuffer.length + 8 + binBuffer.length, 8);

  const jsonChunkHeader = Buffer.alloc(8);
  jsonChunkHeader.writeUInt32LE(jsonBuffer.length, 0);
  jsonChunkHeader.writeUInt32LE(0x4e4f534a, 4);

  const binChunkHeader = Buffer.alloc(8);
  binChunkHeader.writeUInt32LE(binBuffer.length, 0);
  binChunkHeader.writeUInt32LE(0x004e4942, 4);

  const glb = Buffer.concat([
    header,
    jsonChunkHeader,
    jsonBuffer,
    binChunkHeader,
    binBuffer,
  ]);

  // Save to public/models/door/door.glb and public/models/door-wood.glb and public/models/door-pivot.glb
  fs.writeFileSync(path.resolve("public/models/door/door.glb"), glb);
  fs.writeFileSync(path.resolve("public/models/door/model.glb"), glb);
  fs.writeFileSync(path.resolve("public/models/door-wood.glb"), glb);
  fs.writeFileSync(path.resolve("public/models/door-pivot.glb"), glb);
  console.log(`Successfully compiled OBJ door to GLB: ${glb.length} bytes`);
}
