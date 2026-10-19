import { Canvas } from "@react-three/fiber";
import { Float, Environment, Lightformer } from "@react-three/drei";

function FloatingShape() {
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 160, 32]} />
        <meshStandardMaterial color="#2f6bff" metalness={0.75} roughness={0.18} />
      </mesh>
    </Float>
  );
}

export default function CinematicScene() {
  return (
    <div className="absolute inset-0">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 5], fov: 50 }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <FloatingShape />
        <Environment>
          <Lightformer intensity={3} color="#22d3ee" position={[0, 5, -2]} scale={[10, 10, 1]} />
          <Lightformer intensity={2} color="#8b5cf6" position={[-5, 0, 0]} rotation-y={Math.PI / 2} scale={[20, 2, 1]} />
          <Lightformer intensity={2} color="#ffffff" position={[5, 1, 2]} rotation-y={-Math.PI / 2} scale={[20, 1, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}
