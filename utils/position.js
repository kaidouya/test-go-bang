import { CELL_SIZE } from "../config/setting";

export function getCellCoordinate(event, rectInfo) {
  const { clientX, clientY } = event;
  const { top, left } = rectInfo;
  const coordinateX = Math.floor((clientX - left) / CELL_SIZE);
  const coordinateY = Math.floor((clientY - top) / CELL_SIZE);
  return { coordinateX, coordinateY };
}

export function getCellCenterPosition(coordinateX, coordinateY) {
  const CellX = CELL_SIZE + coordinateX * CELL_SIZE - CELL_SIZE / 2;
  const CellY = CELL_SIZE + coordinateY * CELL_SIZE - CELL_SIZE / 2;
  return { CellX, CellY };
}
