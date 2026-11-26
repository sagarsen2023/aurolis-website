import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import { type Mesh, ShaderMaterial, Vector2 } from "three";
import { WAVES_FRAGMENT, WAVES_VERTEX } from "@/lib/shaders";

type WaveCanvasProps = {
  active: boolean;
  reduced: boolean;
  shift: MotionValue<number>;
};

function Waves({ reduced, shift }: Omit<WaveCanvasProps, "active">) {
  const mesh = useRef<Mesh>(null);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: WAVES_VERTEX,
        fragmentShader: WAVES_FRAGMENT,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 4 },
          uResolution: { value: new Vector2(1, 1) },
          uShift: { value: 0 },
        },
      }),
    [],
  );

  useFrame((state, delta) => {
    const shader = mesh.current?.material as ShaderMaterial | undefined;
    if (!shader) return;
    if (!reduced) shader.uniforms.uTime.value += delta;
    state.gl.getDrawingBufferSize(shader.uniforms.uResolution.value);
    shader.uniforms.uShift.value = shift.get();
  });

  return (
    <mesh ref={mesh} frustumCulled={false} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}

export function WaveCanvas({ active, reduced, shift }: WaveCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{ alpha: true, antialias: false }}
      aria-hidden
    >
      <Waves reduced={reduced} shift={shift} />
    </Canvas>
  );
}
