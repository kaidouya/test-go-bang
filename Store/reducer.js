import React, { useReducer } from "react";
import { BLACK, WHITE } from "../config/setting";
import {
  HOW_MANY_CELL_OF_ONE_LINE,
  EMPTY,
  GAME_STATUS_STOP,
  GAME_STATUS_START,
  GAME_STATUS_FINISH
} from "../config/setting";
import { UPDATE_GAME, UPDATE_STATUS, NEW_GAME } from "./constants";
import { get, cloneDeep, set } from 'lodash';

function getBoardArray() {
  const point = HOW_MANY_CELL_OF_ONE_LINE + 1
  return new Array(point)
    .fill([])
    .map(() => new Array(point).fill({ x: 0, y: 0, role: EMPTY }));
}

function setBoardArray(state, payload) {
  const { cell, centerX, centerY } = payload;
  const [girdX, girdY] = cell;
  const { boardArray, currentRole, } = state;


  // set(newArr, [...cell, 'role'], '1234124124')
  console.log('1', boardArray);
  console.log('2', boardArray[0]);
  console.log('3', boardArray[0][0]);
  console.log('4', boardArray[0][0]['role']);
  boardArray[0][0]['role'] = 'gold';
  console.log('5', boardArray);
  // newArr[cell.girdX][cell.girdY].x = centerX;
  // newArr[cell.girdX][cell.girdY].y = centerY;
  // newArr[cell.girdX][cell.girdY].role = currentRole;
  // console.log(newArr)
  return boardArray;
}

const initState = {
  boardArray: getBoardArray(),
  prevRole: null,
  currentRole: BLACK,
  winner: null
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_GAME:
      const { cell: [x, y] } = payload;
      const currentGirdStatus = get(state, ['boardArray', `${x}`, `${y}`, 'role']);

      if (currentGirdStatus !== EMPTY) {
        return state;
      }

      return {
        ...state,
        boardArray: setBoardArray(state, payload),
      }
    default:
      return state;
  }
}

export function useStore() {
  const [state, dispatch] = useReducer(reducer, initState);
  return { state, dispatch };
}
