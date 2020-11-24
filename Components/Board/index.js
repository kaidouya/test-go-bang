import { useEffect, useState, useRef, useCallback, useImperativeHandle, forwardRef } from "react";
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

function Board({ children, onClik }, ref) {
  const _innerCanvas = useRef(null);
  const [boardSize, setBoardSize] = useState(null);

  const draw = () => {
    const ctx = _innerCanvas.current?.getContext("2d");
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

  const getBoardSize = useCallback(() => boardSize, [boardSize]);

  useEffect(() => {
    draw();
    setBoardSize(_innerCanvas.current.getBoundingClientRect());
  }, []);

  useImperativeHandle(ref, () => ({
    getBoardSize
  }));

  return (
    <Wrapper>
      <Canvas
        ref={_innerCanvas}
        width={CELL_SIZE * HOW_MANY_CELL_OF_ONE_LINE + CELL_SIZE}
        height={CELL_SIZE * HOW_MANY_CELL_OF_ONE_LINE + CELL_SIZE}
        onClick={onClik}
      >
        {children}
      </Canvas>
    </Wrapper>
  );
}

export default forwardRef(Board);
