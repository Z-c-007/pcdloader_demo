import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader.js";
import * as THREE from "three";

// -------------------------------
// 全局缓存：存储所有已加载的 Points
// -------------------------------
const frameCache = new Map<number, THREE.Points>();

// 是否正在预加载
let isPreloading = false;

// 预加载所有帧（建议在 App 启动时调用一次）
export async function preloadAllFrames(
  start: number = 0,
  count: number,
  formatNumber: (n: number) => string
) {
  if (isPreloading) return;
  isPreloading = true;

  const loader = new PCDLoader();
  const promises = [];

  for (let i = start; i < start + count; i++) {
    const url = `/output/${formatNumber(i)}.pcd`;
    const promise = new Promise<void>((resolve) => {
      loader.load(
        url,
        (points: THREE.Points) => {
          points.rotation.set(0, 0, 0);
          points.rotateX(Math.PI / 2);
          frameCache.set(i, points);
          resolve();
        },
        undefined,
        () => resolve() // 失败也继续
      );
    });
    promises.push(promise);
  }

  await Promise.all(promises);
  isPreloading = false;
}

export { frameCache };