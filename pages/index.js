import { useState, useRef, useCallback, useEffect, useContext } from "react";
import Head from "next/head";
import H1 from "../components/H1";
import Board from "../components/Board";
import Chess from "../components/Chess";
import Controller from "../components/controller";
import { TITLE_NAME, GAME_STATUS_FINISH, GAME_STATUS_START, GAME_STATUS_STOP, roleMaps } from "../config";
import { getCellCoordinate, getCellCenterPosition, check } from "../utils";
import { Store } from "../store";
import { updateGame, updateStatus, newGame, startGame } from "../store/action";

export default function Home() {
  const board = useRef(null);
  const [boardInstance, setBoardInstance] = useState(null);
  const { state, dispatch } = useContext(Store);

  const onClick = useCallback(
    (e) => {
      if (state.gameStatus === GAME_STATUS_STOP || state.gameStatus === GAME_STATUS_FINISH) {
        return;
      }

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
    [state.gameStatus, state.currentRole]
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

  const startGame = useCallback(() => {
    if (state.gameStatus === GAME_STATUS_STOP) {
      dispatch(updateStatus(GAME_STATUS_START));
    }
  }, [state.gameStatus]);

  const resetGame = useCallback(() => {
    dispatch(newGame());
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
      <Controller status={state.gameStatus} startGame={startGame} resetGame={resetGame} />
    </>
  );
}
