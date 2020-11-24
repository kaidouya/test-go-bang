import { CELL_SIZE } from "../config/setting";

export function getCellCoordinate(event, rectInfo) {
  const { clientX, clientY } = event;
  const { top, left } = rectInfo;
  const girdX = Math.floor((clientX - left) / CELL_SIZE);
  const girdY = Math.floor((clientY - top) / CELL_SIZE);
  return { girdX, girdY };
}

export function getCellCenterPosition(coordinateX, coordinateY) {
  const centerX = CELL_SIZE + coordinateX * CELL_SIZE - CELL_SIZE / 2;
  const centerY = CELL_SIZE + coordinateY * CELL_SIZE - CELL_SIZE / 2;
  return { centerX, centerY };
}
