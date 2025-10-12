import { Canvas, useThree } from "@react-three/fiber";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader.js";
import { OrbitControls } from "@react-three/drei";
import useSliderStore from "../store/SliderStroe";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { preloadAllFrames, frameCache } from "../component/preloadUtils";// 全局缓存：存储所有已加载的 Points

function StablePointCloud() {
  const { scene } = useThree();
  const sliderValue = useSliderStore((state) => state.SliderValue);
  const formatNumber = useSliderStore((state) => state.formatNumber);
  const currentPointsRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const index = sliderValue;
    const isValidIndex = index >= 0 && index <= 77; // 根据你的范围调整

    if (!isValidIndex) return;

    // 1. 如果已在缓存中，直接切换
    if (frameCache.has(index)) {
      const points = frameCache.get(index)!;

      // 移除旧的
      if (currentPointsRef.current && currentPointsRef.current !== points) {
        scene.remove(currentPointsRef.current);
      }

      // 添加新的（如果不在场景中）
      if (!points.parent) {
        scene.add(points);
      }
      currentPointsRef.current = points;
      return;
    }

    // 2. 如果未缓存 → 异步加载（仅作为 fallback）
    const url = `/output/${formatNumber(index)}.pcd`;
    const loader = new PCDLoader();

    loader.load(
      url,
      (points: THREE.Points) => {
        points.rotation.set(0, 0, 0);
        points.rotateX(Math.PI / 2);

        if (currentPointsRef.current) {
          scene.remove(currentPointsRef.current);
        }
        scene.add(points);
        currentPointsRef.current = points;

        // 可选：加入缓存
        frameCache.set(index, points);
      },
      undefined,
      (err) => console.warn("Failed to load:", url, err)
    );
  }, [sliderValue, formatNumber, scene]);

  // 卸载清理
  useEffect(() => {
    return () => {
      if (currentPointsRef.current) {
        scene.remove(currentPointsRef.current);
        // 注意：不要 dispose 缓存中的 geometry/material！因为会被复用
        // 如果你确定不再需要，可以 dispose
        // currentPointsRef.current.geometry.dispose();
        // ...
        currentPointsRef.current = null;
      }
    };
  }, [scene]);

  return null;
}

function ThreeScene() {
  const formatNumber = useSliderStore((state) => state.formatNumber);

  // 👉 在这里预加载所有帧（只执行一次）
  useEffect(() => {
    if (frameCache.size === 0) {
      preloadAllFrames(0, 78, formatNumber); // 假设 0~77 共 78 帧
    }
  }, [formatNumber]);

  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}>
      <Canvas>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableZoom enablePan enableRotate />

        {/* 无 Suspense，无闪烁 */}
        <StablePointCloud />
      </Canvas>
    </div>
  );
}

export default ThreeScene;