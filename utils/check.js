import { HOW_MANY_CELL_OF_ONE_LINE, GAME_STATUS_START, GAME_STATUS_FINISH } from "../config";
import { get, values } from "lodash";

const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";
const RIGHT_DIAGONAL = "rightDiagonal";
const LEFT_DIAGONAL = "leftDiagonal";

function isSameRole(targetRole, currentRole) {
  return targetRole === currentRole;
}

export const check = (role, x, y) => {
  const counters = {
    [HORIZONTAL]: 1,
    [VERTICAL]: 1,
    [RIGHT_DIAGONAL]: 1,
    [LEFT_DIAGONAL]: 1
  };

  return (boardArray) => {
    for (let i = x - 1; i >= 0; i--) {
      if (!isSameRole(get(boardArray, [i, y, "role"]), role)) {
        break;
      }
      counters[HORIZONTAL] += 1;
    }

    for (let i = x + 1; i < HOW_MANY_CELL_OF_ONE_LINE; i++) {
      if (!isSameRole(get(boardArray, [i, y, "role"]), role)) {
        break;
      }
      counters[HORIZONTAL] += 1;
    }

    for (let i = y - 1; i >= 0; i--) {
      if (!isSameRole(get(boardArray, [x, i, "role"]), role)) {
        break;
      }
      counters[VERTICAL] += 1;
    }

    for (let i = y + 1; i < HOW_MANY_CELL_OF_ONE_LINE; i++) {
      if (!isSameRole(get(boardArray, [x, i, "role"]), role)) {
        break;
      }
      counters[VERTICAL] += 1;
    }

    for (let i = x - 1, j = y - 1; i >= 0, j >= 0; i--, j--) {
      if (!isSameRole(get(boardArray, [i, j, "role"]), role)) {
        break;
      }
      counters[LEFT_DIAGONAL] += 1;
    }

    for (let i = x + 1, j = y + 1; i < HOW_MANY_CELL_OF_ONE_LINE, j < HOW_MANY_CELL_OF_ONE_LINE; i++, j++) {
      if (!isSameRole(get(boardArray, [i, j, "role"]), role)) {
        break;
      }
      counters[LEFT_DIAGONAL] += 1;
    }

    for (let i = x + 1, j = y - 1; i < HOW_MANY_CELL_OF_ONE_LINE, j >= 0; i++, j--) {
      if (!isSameRole(get(boardArray, [i, j, "role"]), role)) {
        break;
      }
      counters[RIGHT_DIAGONAL] += 1;
    }

    for (let i = x - 1, j = y + 1; i >= 0, j < HOW_MANY_CELL_OF_ONE_LINE; i--, j++) {
      if (!isSameRole(get(boardArray, [i, j, "role"]), role)) {
        break;
      }
      counters[RIGHT_DIAGONAL] += 1;
    }

    let result = values(counters).some((amount) => amount >= 5);

    return result ? GAME_STATUS_FINISH : GAME_STATUS_START;
  };
};
