import { useReducer } from "react";
import { BLACK, WHITE } from "../config/setting";
import { HOW_MANY_CELL_OF_ONE_LINE, EMPTY, GAME_STATUS_STOP, GAME_STATUS_START, GAME_STATUS_FINISH } from "../config/setting";
import { UPDATE_GAME, UPDATE_STATUS, NEW_GAME } from "./constants";
import update from "immutability-helper";
import { get, set } from "lodash";

function getBoardArray() {
  const point = HOW_MANY_CELL_OF_ONE_LINE + 1;
  return Array.from({ length: point }, () => {
    return Array.from({ length: point }, () => ({ x: 0, y: 0, role: EMPTY }));
  });
}

function changeRole(currentRole) {
  return currentRole === BLACK ? WHITE : BLACK;
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
      const {
        cell: [x, y],
        currentRole,
        centerX,
        centerY
      } = payload;

      const currentGirdStatus = get(state, ["boardArray", `${x}`, `${y}`, "role"]);

      if (currentGirdStatus !== EMPTY) {
        return state;
      }
      const newRole = changeRole(currentRole);
      return update(state, {
        currentRole: { $set: newRole },
        boardArray: {
          [x]: {
            [y]: {
              $merge: { x: centerX, y: centerY, role: currentRole }
            }
          }
        }
      });
    default:
      return state;
  }
}

export function useStore() {
  const [state, dispatch] = useReducer(reducer, initState);
  return { state, dispatch };
}
