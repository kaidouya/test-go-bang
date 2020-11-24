import { useState, useRef, useCallback, useEffect, useContext } from "react";
import Head from "next/head";
import H1 from "../Components/H1";
import Board from "../Components/Board";
import Chess from "../Components/Chess";
import { TITLE_NAME } from "../config/setting";
import { getCellCoordinate, getCellCenterPosition } from "../utils/position";
import { Store } from "../Store";
import { updateGame } from "../Store/action";

export default function Home() {
  const board = useRef(null);
  const [boardInstance, setBoardInstance] = useState(null);
  const { state, dispatch } = useContext(Store);

  const onClick = useCallback((e) => {
    const { getBoardSize } = board.current;
    const boardSize = getBoardSize();
    const { girdX, girdY } = getCellCoordinate(e, boardSize);
    const { centerX, centerY } = getCellCenterPosition(girdX, girdY);
    const cell = [girdX, girdY];
    const currentRole = state.currentRole;

    const play = {
      centerX,
      centerY,
      cell,
      currentRole
    };
    dispatch(updateGame(play));
  }, []);

  useEffect(() => {
    setBoardInstance(board.current.getBoardInstance());
  }, []);

  return (
    <>
      <Head>
        <title>{TITLE_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <H1>{TITLE_NAME}</H1>
      <Board onClik={onClick} ref={board}>
        <Chess boardInstance={boardInstance}></Chess>
      </Board>
    </>
  );
}
