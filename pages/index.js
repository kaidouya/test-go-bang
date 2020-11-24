import { useState, useRef, useCallback, useEffect, useContext } from "react";
import Head from "next/head";
import H1 from "../components/H1";
import Board from "../components/Board";
import Chess from "../components/Chess";
import { TITLE_NAME, GAME_STATUS_FINISH, roleMaps } from "../config";
import { getCellCoordinate, getCellCenterPosition, check } from "../utils";
import { Store } from "../store";
import { updateGame, updateStatus } from "../store/action";

export default function Home() {
  const board = useRef(null);
  const [boardInstance, setBoardInstance] = useState(null);
  const { state, dispatch } = useContext(Store);

  const onClick = useCallback(
    (e) => {
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

      if (checkGameOver(currentRole, cell)) {
        handleGameFinish(currentRole);
      }
    },
    [state.currentRole]
  );

  const checkGameOver = useCallback(
    (currentRole, cell) => {
      const status = check(currentRole, ...cell)(state.boardArray);
      return status === GAME_STATUS_FINISH;
    },
    [state.boardArray]
  );

  const handleGameFinish = useCallback((role) => {
    dispatch(updateStatus(GAME_STATUS_FINISH));
    setTimeout(() => alert(`${roleMaps[role]} win!`), 0);
  }, []);

  useEffect(() => {
    setBoardInstance(board.current.getBoardInstance(state.boardArray));
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
