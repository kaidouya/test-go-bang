import { useEffect, useRef } from "react";
import styled from "styled-components";
import { CELL_SIZE, HOW_MANY_CELL_OF_ONE_LINE } from "../../config/setting";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const Canvas = styled.canvas`
  box-shadow: -2px -2px 2px #efefef, 5px 5px 5px #b9b9b9;
  background-color: #c19b6c;
`;

export default function Board({ children, onClik, setBoardCancas }) {
  const myCanvas = useRef(null);

  const draw = () => {
    const ctx = myCanvas.current?.getContext("2d");
    if (ctx) {
      const lines = HOW_MANY_CELL_OF_ONE_LINE + 1;

      for (let i = 0; i < lines; i++) {
        ctx.moveTo(20 + i * CELL_SIZE, 20);
        ctx.lineTo(20 + i * CELL_SIZE, CELL_SIZE * HOW_MANY_CELL_OF_ONE_LINE + 20);
        ctx.stroke();
        ctx.moveTo(20, 20 + i * CELL_SIZE);
        ctx.lineTo(CELL_SIZE * HOW_MANY_CELL_OF_ONE_LINE + 20, 20 + i * CELL_SIZE);
        ctx.stroke();
      }
      ctx.closePath();
    }
  };

  useEffect(() => {
    draw();
    if (myCanvas.current) {
      setBoardCancas(myCanvas.current);
    }
  }, []);
  return (
    <Wrapper>
      <Canvas
        ref={myCanvas}
        width={CELL_SIZE * HOW_MANY_CELL_OF_ONE_LINE + CELL_SIZE}
        height={CELL_SIZE * HOW_MANY_CELL_OF_ONE_LINE + CELL_SIZE}
        onClick={onClik}
      >
        {children}
      </Canvas>
    </Wrapper>
  );
}
