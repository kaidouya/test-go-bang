import { useReducer } from "react";
import { BLACK, WHITE } from "../config";
import { GRID_AMOUNT, EMPTY, GAME_STATUS_STOP } from "../config";
import { UPDATE_GAME, UPDATE_STATUS, NEW_GAME, UPDATE_STEP } from "./constants";
import update from "immutability-helper";
import { useHistory } from "../hook";

function getBoardArray() {
  const point = GRID_AMOUNT + 1;
  return Array.from({ length: point }, () => {
    return Array.from({ length: point }, () => ({ x: 0, y: 0, role: EMPTY }));
  });
}

function changeRole(currentRole) {
  return currentRole === BLACK ? WHITE : BLACK;
}

const initState = {
  records: {
    past: [],
    present: null,
    future: []
  },
  boardArray: getBoardArray(),
  currentRole: BLACK,
  gameStatus: GAME_STATUS_STOP,
  stepCounter: 0
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case NEW_GAME:
      return update(state, {
        boardArray: { $set: initState.boardArray },
        currentRole: { $set: initState.currentRole },
        gameStatus: { $set: initState.gameStatus },
        stepCounter: { $set: initState.stepCounter }
      });

    case UPDATE_GAME:
      const {
        cell: [x, y],
        currentRole,
        centerX,
        centerY
      } = payload;

      return update(state, {
        currentRole: { $set: changeRole(currentRole) },
        boardArray: {
          [x]: {
            [y]: {
              $merge: { x: centerX, y: centerY, role: currentRole }
            }
          }
        }
      });

    case UPDATE_STATUS:
      return update(state, {
        gameStatus: { $set: payload }
      });

    case UPDATE_STEP:
      return update(state, {
        stepCounter: { $set: payload }
      });

    default:
      return state;
  }
}

export function useStore() {
  const [state, dispatch] = useReducer(reducer, initState);
  return { state, dispatch };
}
