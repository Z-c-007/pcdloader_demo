import { create } from "zustand";

export interface SliderState {
  SliderValue: number;
  changeSliderValue: (value: number) => void;
  formatNumber: (number: number, length?: number) => string; // 格式化数字，符合点云的格式(0000000000.pcd)
}

const useSliderStore = create<SliderState>((set) => ({
  SliderValue: 0,
  changeSliderValue: (value: number) => set(() => ({ SliderValue: value })),
  formatNumber: (number: number, length: number = 10) => {
    return number.toString().padStart(length, "0");
  },
}));

export default useSliderStore;
