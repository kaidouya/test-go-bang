import { useState, useRef, useCallback, useEffect, useContext } from "react";
import Head from "next/head";
import H1 from "../components/H1";
import Board from "../components/Board";
import Chess from "../components/Chess";
import ControllerPanel from "../components/ControllerPanel";
import {
  TITLE_NAME,
  GAME_STATUS_FINISH,
  GAME_STATUS_START,
  GAME_STATUS_STOP,
  roleMaps
} from "../config";
import { getCellCoordinate, getCellCenterPosition, check } from "../utils";
import { Store } from "../store";
import { updateGame, updateStatus, newGame, updateStep } from "../store/action";
import HomeWrapper from "../components/Wrapper";
import { Modal } from "antd";

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
      dispatch(updateStep(++state.stepCounter));

      if (checkGameOver(currentRole, cell)) {
        dispatch(updateStatus(GAME_STATUS_FINISH));
        showInfo(currentRole);
      }
    },
    [state.gameStatus, state.currentRole, state.stepCounter]
  );

  const checkGameOver = useCallback(
    (currentRole, cell) => {
      const status = check(currentRole, ...cell)(state.boardArray);
      return status === GAME_STATUS_FINISH;
    },
    [state.boardArray]
  );

  const startGame = useCallback(() => {
    if (state.gameStatus === GAME_STATUS_STOP) {
      dispatch(updateStatus(GAME_STATUS_START));
    }
  }, [state.gameStatus]);

  const resetGame = useCallback(() => {
    dispatch(newGame());
  }, []);

  const showInfo = useCallback((role) => {
    Modal.info({
      title: "這場遊戲已經結束了",
      content: (
        <div>
          <p>贏的玩家就是{roleMaps[role]}</p>
        </div>
      ),
      onOk() {}
    });
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
      <H1 currentRole={state.currentRole} currentStatus={state.gameStatus} />
      <HomeWrapper>
        <Board onClik={onClick} ref={board}>
          <Chess boardInstance={boardInstance}></Chess>
        </Board>
        <ControllerPanel status={state.gameStatus} startGame={startGame} resetGame={resetGame} />
      </HomeWrapper>
    </>
  );
}
