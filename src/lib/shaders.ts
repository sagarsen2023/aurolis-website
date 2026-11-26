export const SIMPLEX_NOISE = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

export const BLOB_VERTEX = `
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
attribute float aSeed;
varying float vFacing;
varying float vLift;
varying float vLight;
varying float vSeed;
${SIMPLEX_NOISE}
void main() {
  vec3 base = normalize(position);
  float broad = snoise(base * 1.15 + vec3(0.0, uTime * 0.11, uTime * 0.05));
  float fine = snoise(base * 2.7 - vec3(uTime * 0.07));
  float lift = broad * 0.24 + fine * 0.06;
  vec3 displaced = base * (1.0 + lift);
  vec4 viewPosition = modelViewMatrix * vec4(displaced, 1.0);
  vec3 viewNormal = normalize(normalMatrix * base);
  vFacing = dot(viewNormal, normalize(-viewPosition.xyz));
  vLight = max(dot(viewNormal, normalize(vec3(-0.55, 0.75, 0.45))), 0.0);
  vLift = lift;
  vSeed = aSeed;
  gl_Position = projectionMatrix * viewPosition;
  gl_PointSize = uSize * uPixelRatio * (0.7 + lift * 1.6 + aSeed * 0.35) * (4.0 / -viewPosition.z);
}
`;

export const BLOB_FRAGMENT = `
uniform vec3 uDeep;
uniform vec3 uMid;
uniform vec3 uRim;
varying float vFacing;
varying float vLift;
varying float vLight;
varying float vSeed;
void main() {
  vec2 point = gl_PointCoord - 0.5;
  float dist = length(point);
  if (dist > 0.5) discard;
  float soft = smoothstep(0.5, 0.08, dist);
  float facing = clamp(vFacing, -1.0, 1.0);
  float rim = pow(1.0 - abs(facing), 2.4);
  float hidden = smoothstep(0.05, -0.25, facing);
  vec3 color = mix(uDeep, uMid, clamp(0.45 + vLift * 2.4 + vLight * 0.35, 0.0, 1.0));
  color = mix(color, uRim, clamp(rim * 0.8 + vLight * 0.45, 0.0, 1.0));
  float alpha = soft * (0.42 + rim * 0.6 + vLight * 0.6) * mix(1.0, 0.24, hidden) * (0.6 + vSeed * 0.4);
  gl_FragColor = vec4(color * alpha, alpha);
}
`;

export const WAVES_VERTEX = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const WAVES_FRAGMENT = `
uniform float uTime;
uniform vec2 uResolution;
uniform float uShift;
${SIMPLEX_NOISE}
float lobe(vec2 uv, vec2 center, float angle, vec2 scale) {
  vec2 q = uv - center;
  float c = cos(angle);
  float s = sin(angle);
  q = vec2(c * q.x - s * q.y, s * q.x + c * q.y) / scale;
  return exp(-dot(q, q));
}
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  uv.y += uShift;
  float drift = snoise(vec3(uv * 0.85, uTime * 0.05));
  float field = dot(uv, normalize(vec2(0.62, 1.0))) + drift * 0.34 + 0.06 * sin(uv.x * 3.2 + uTime * 0.3);
  float bands = field * 46.0;
  float width = fwidth(bands);
  float distanceToLine = abs(fract(bands) - 0.5);
  float line = 1.0 - smoothstep(0.2 - width, 0.2 + width, distanceToLine);
  float mask = lobe(uv, vec2(-0.34, 0.16), -0.75, vec2(0.62, 0.3)) + lobe(uv, vec2(0.28, -0.12), -0.75, vec2(0.6, 0.28));
  mask = clamp(mask, 0.0, 1.0);
  vec3 blue = vec3(0.23, 0.2, 0.98);
  vec3 violet = vec3(0.55, 0.3, 1.0);
  vec3 lavender = vec3(0.86, 0.72, 1.0);
  vec3 color = mix(blue, violet, smoothstep(-0.7, 0.6, uv.x + uv.y * 0.4));
  color = mix(color, lavender, pow(mask, 4.0) * 0.45);
  float alpha = line * smoothstep(0.02, 0.9, mask);
  float haze = mask * 0.07;
  gl_FragColor = vec4(color * (alpha + haze), alpha + haze);
}
`;
