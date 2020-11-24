import React, { useReducer } from "react";
import { BLACK, WHITE } from "../config/setting";
import {} from "../config/setting";

// function getBoardArray() {
//   let listArray = [];
//   Array.from(Array(HOW_MANY_CELL_OF_ONE_LINE + 1)).forEach((i) => {
//     let subList = [];
//     Array.from(Array(HOW_MANY_CELL_OF_ONE_LINE + 1)).forEach((j) =>
//       subList.push({
//         x: 0,
//         y: 0,
//         role: EMPTY
//       })
//     );
//     listArray.push(subList);
//   });

//   return listArray;
// }

// console.log(getBoardArray());

const initState = {
  // boardArray: getBoardArray(),
  prevRole: null,
  currentRole: BLACK,
  winner: null
};

function reducer(state, action) {
  switch (action.type) {
    case "put":
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    default:
      return state;
  }
}

export function useStore() {
  const [state, dispatch] = useReducer(reducer, initState);
  return { state, dispatch };
}
