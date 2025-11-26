"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";

function CarModel({ model, filmTint }) {
  const { scene } = useGLTF(`/models/${model}.glb`);

  // Lista EXATA dos vidros reais do seu modelo
  const glassWhitelist = [
    "LOD_A_GLASS_LEFT_QUARTER_mm_windows",
    "LOD_A_GLASS_RIGHT_QUARTER_mm_windows",
    "LOD_A_GLASS_RIGHT_mm_windows",
    "LOD_A_GLASS_LEFT_mm_windows",
  ];

  // Aplica o efeito FUMÊ somente nos vidros corretos
  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        if (glassWhitelist.includes(obj.name)) {
          obj.material.transparent = true;
          obj.material.opacity = 1 - filmTint;
          obj.material.color.setRGB(0, 0, 0);
        }
      }
    });
  }, [scene, filmTint]);

  return <primitive object={scene} />;
}

export default function Viewer3D({ model, filmTint, night, internalView }) {
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current && !internalView) {
      // Ajuste de ângulo inicial — visão premium de concessionária
      controlsRef.current.setAzimuthalAngle((35 * Math.PI) / 180); 
      controlsRef.current.setPolarAngle((70 * Math.PI) / 180);
      controlsRef.current.update();
    }
  }, [internalView]);

  return (
    <div className="w-full h-[420px] md:h-[520px] rounded-xl border border-white/10">
      <Canvas
        camera={{
          position: internalView ? [0, 1, 0] : [4, 2, 4],
          fov: 45,
        }}
      >
        {/* Iluminação */}
        <ambientLight intensity={night ? 0.3 : 1} />
        <directionalLight position={[10, 10, 10]} intensity={night ? 0.5 : 1.2} />

        {/* Carro */}
        <CarModel model={model} filmTint={filmTint} />

        {/* Controles */}
        {!internalView && <OrbitControls ref={controlsRef} enablePan={false} />}

        {/* HDRI */}
        <Environment preset={night ? "night" : "sunset"} />
      </Canvas>
    </div>
  );
}
