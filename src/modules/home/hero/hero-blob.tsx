import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  type Points,
  ShaderMaterial,
} from "three";
import { BLOB_FRAGMENT, BLOB_VERTEX } from "@/lib/shaders";

type HeroBlobProps = {
  active: boolean;
  reduced: boolean;
};

const POINT_COUNT = 15000;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

function sphereGeometry(count: number) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = GOLDEN_ANGLE * index;
    positions[index * 3] = Math.cos(theta) * radius;
    positions[index * 3 + 1] = y;
    positions[index * 3 + 2] = Math.sin(theta) * radius;
    seeds[index] = Math.random();
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("aSeed", new BufferAttribute(seeds, 1));
  return geometry;
}

function Blob({ reduced }: { reduced: boolean }) {
  const points = useRef<Points>(null);
  const geometry = useMemo(() => sphereGeometry(POINT_COUNT), []);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: BLOB_VERTEX,
        fragmentShader: BLOB_FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: 3.1 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
          uDeep: { value: new Color("#3a1fa0") },
          uMid: { value: new Color("#7c5cff") },
          uRim: { value: new Color("#efe0ff") },
        },
      }),
    [],
  );

  useFrame((state, delta) => {
    const blob = points.current;
    if (!blob) return;
    if (!reduced) {
      (blob.material as ShaderMaterial).uniforms.uTime.value += delta;
      blob.rotation.y += delta * 0.05;
    }
    blob.rotation.x += (state.pointer.y * 0.18 - blob.rotation.x) * 0.03;
    blob.rotation.z += (-state.pointer.x * 0.12 - blob.rotation.z) * 0.03;
  });

  return (
    <points ref={points} geometry={geometry} material={material} scale={1.32} />
  );
}

export function HeroBlob({ active, reduced }: HeroBlobProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 4.4], fov: 38 }}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      }}
      aria-hidden
    >
      <Blob reduced={reduced} />
    </Canvas>
  );
}
