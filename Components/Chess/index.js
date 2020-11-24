import { useEffect, useContext } from "react";
import { CHESS_SIZE, COLOR_GREY, COLOR_WHITE, COLOR_BLACK, EMPTY, BLACK } from "../../config/setting";
import { Store } from "../../Store";
import { flatten, get } from "lodash";
import shortid from "shortid";

const radius = CHESS_SIZE / 2;

function Chess({ boardInstance, x, y, role }) {
  const ctx = boardInstance.getContext("2d");
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
  ctx.closePath();

  if (role === BLACK) {
    ctx.fillStyle = COLOR_BLACK;
  } else {
    ctx.strokeStyle = COLOR_GREY;
    ctx.fillStyle = COLOR_WHITE;
    ctx.stroke();
  }
  ctx.fill();
}

const ChessWrapper = ({ boardInstance }) => {
  const {
    state: { boardArray }
  } = useContext(Store);

  const chessList = flatten(boardArray).filter((item) => get(item, "role") !== EMPTY);

  return chessList.length > 0
    ? chessList.map((item) =>
        Chess({
          boardInstance,
          x: get(item, "x"),
          y: get(item, "y"),
          role: get(item, "role"),
          key: shortid.generate()
        })
      )
    : null;
};

export default ChessWrapper;
