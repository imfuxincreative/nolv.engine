// ─── Paper Bend Shader ────────────────────────────────────────────────────────
// Custom ShaderMaterial that deforms a subdivided plane like a sheet of paper.
// Driven by scroll velocity, mouse position, drag, and time.

import * as THREE from 'three'

// ─── GLSL Vertex Shader ──────────────────────────────────────────────────────
const vertexShader = /* glsl */ `
  uniform float uBendX;
  uniform float uBendY;
  uniform float uCurl;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uTouchStrength;

  varying vec2 vUv;
  varying float vBend;

  void main() {
    vUv = uv;

    vec3 pos = position;

    // ── Paper bend along Y axis (scroll-driven) ──
    // Bends the plane like holding a sheet of paper at the bottom and pushing the top back.
    // Uses sin curve weighted by vertical position for natural curvature.
    float bendY = sin(pos.y * 3.14159) * uBendY * 0.15;

    // ── Paper bend along X axis (mouse/drag-driven) ──
    // Side-to-side curl, like wind catching one edge.
    float bendX = sin(pos.x * 3.14159) * uBendX * 0.15;

    // ── Edge curl (velocity-driven) ──
    // Curls corners more than center — paper edges lift when moved fast.
    // Uses distance from center to weight the curl effect.
    float distFromCenter = length(pos.xy);
    float curl = distFromCenter * distFromCenter * uCurl * 0.08;

    // ── Local Touch/Hover Paper Bend ──
    // Simulates a finger pressing into/touching paper.
    // Creates a smooth local depression at the cursor position and a subtle raised ring around it.
    float dist = length(pos.xy - uMouse);
    
    // Depression in the center (push back along Z)
    float pressDown = -0.15 * smoothstep(0.35, 0.0, dist);
    
    // Ridge lifting up around the depression (simulates paper stiffness pushing back up)
    float ridgeUp = 0.05 * smoothstep(0.5, 0.2, dist) * (1.0 - smoothstep(0.2, 0.0, dist));
    
    // Combine local deformation and scale with touch strength uniform
    float localTouchBend = (pressDown + ridgeUp) * uTouchStrength;

    // ── Ambient living paper wave ──
    // Very subtle sine wave so paper never looks perfectly flat — it breathes.
    float wave = sin(pos.x * 4.0 + uTime * 1.2) * cos(pos.y * 3.0 + uTime * 0.9) * 0.005;

    // Combine all Z displacements
    float totalBend = bendY + bendX + curl + localTouchBend + wave;
    pos.z += totalBend;

    // Pass bend amount to fragment shader for shading.
    // Include pressDown at reduced strength (0.4x) so we get a subtle shadow under the dent
    // without it being an overwhelming dark spot.
    vBend = bendY + bendX + curl + (pressDown * uTouchStrength * 0.4) + (ridgeUp * uTouchStrength) + wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

// ─── GLSL Fragment Shader ────────────────────────────────────────────────────
const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uFade;
  uniform float uIsDarkMode;
  uniform vec3 uBaseColor;

  varying vec2 vUv;
  varying float vBend;

  // Manual linear → sRGB conversion (replaces Three.js colorspace includes)
  vec3 linearToSRGB(vec3 color) {
    return pow(color, vec3(1.0 / 2.2));
  }

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);

    // Apply base color multiplication (used for theme fade)
    texColor.rgb *= uBaseColor;

    // ── Curvature-based shading ──
    // Adds highlight on peaks (positive vBend) and subtle shadow in valleys (negative vBend)
    // to sell the 3D paper texture.
    float shade = 1.0 + vBend * 3.0;
    shade = clamp(shade, 0.65, 1.3); // Shadow darkens by up to 35%, highlights brighten by up to 30%
    texColor.rgb *= shade;

    // ── Theme fade ──
    vec3 fadeTarget = mix(vec3(0.0), vec3(1.0), uIsDarkMode);
    texColor.rgb = mix(texColor.rgb, fadeTarget, uFade);

    // ── sRGB output encoding ──
    // Three.js decodes sRGB textures to linear on read; we must encode back.
    texColor.rgb = linearToSRGB(texColor.rgb);

    gl_FragColor = texColor;
  }
`

// ─── Create Paper Bend Material ──────────────────────────────────────────────
// Factory function: creates a new ShaderMaterial instance with all uniforms.
// Each image gets its own material (uniforms are per-instance) but shares geometry.
export function createPaperBendMaterial(texture: THREE.Texture): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: texture },
      uBendX: { value: 0.0 },
      uBendY: { value: 0.0 },
      uCurl: { value: 0.0 },
      uTime: { value: 0.0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTouchStrength: { value: 0.0 },
      uFade: { value: 0.0 },
      uIsDarkMode: { value: 0.0 },
      uBaseColor: { value: new THREE.Vector3(1, 1, 1) },
    },
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
    transparent: false,
    toneMapped: false,
  })
}

// ─── Shared subdivided geometry ──────────────────────────────────────────────
// 16×16 segments = 256 vertices per plane. Enough for smooth bends.
// Shared across ALL instances (same buffer, different material uniforms).
export const paperPlaneGeometry = new THREE.PlaneGeometry(1, 1, 16, 16)
