import { useEffect } from "react";
import { CHESS_SIZE, COLOR_GREY, COLOR_WHITE, COLOR_BLACK } from "../../config/setting";
import { flatten } from "lodash";

const radius = CHESS_SIZE / 2;

export default function Chess({ boardInstance }) {
  useEffect(() => {
    if (boardInstance) {
      const ctx = boardInstance.getContext("2d");
      ctx.beginPath();
      ctx.arc(20, 20, radius, 0, 2 * Math.PI, true);
      ctx.closePath();
      ctx.strokeStyle = COLOR_GREY;
      ctx.fillStyle = COLOR_WHITE;
      ctx.stroke();
      ctx.fill();
    }
  }, [boardInstance]);

  return <></>;
}
