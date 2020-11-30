import { useState, useRef, useCallback, useEffect, useContext } from "react";
import Head from "next/head";
import H1 from "../components/H1";
import Board from "../components/Board";
import Chess from "../components/Chess";
import ControllerPanel from "../components/ControllerPanel";
import { WEBSITE_TITLE_NAME, GAME_STATUS_FINISH, GAME_STATUS_START, GAME_STATUS_STOP, roleMaps } from "../config";
import { getCellCoordinate, getCellCenterPosition, check } from "../utils";
import { Store } from "../store";
import { updateGameAction, updateStatusAction, newGameAction, updateStepAction } from "../store/action";
import HomeWrapper from "../components/Wrapper";
import { Modal } from "antd";

function checkStatue(status) {
  return [GAME_STATUS_STOP, GAME_STATUS_FINISH].some((item) => item === status);
}

export default function Home() {
  const board = useRef(null);
  const currentStepRole = useRef(null);
  const [boardInstance, setBoardInstance] = useState(null);
  const {
    state: { boardArray, gameStatus, currentRole, stepCounter },
    dispatch
  } = useContext(Store);

  const onClick = (e) => {
    const notAllow = checkStatue(gameStatus);
    if (notAllow) return;

    const prevRole = currentStepRole.current;
    console.log(prevRole);
    if (prevRole === currentRole) return;

    console.log("123");
    const boardSize = board.current.getBoardSize();
    const { girdX, girdY } = getCellCoordinate(e, boardSize);
    const { centerX, centerY } = getCellCenterPosition(girdX, girdY);
    const cell = [girdX, girdY];

    const playInfo = {
      centerX,
      centerY,
      cell,
      currentRole
    };
    const testNum = stepCounter + 1;

    currentStepRole.current = currentRole;
    dispatch(updateGameAction(playInfo));
    dispatch(updateStepAction(testNum));

    if (checkGameOver(currentRole, cell)) {
      dispatch(updateStatusAction(GAME_STATUS_FINISH));
      showInfo(currentRole);
    }
  };

  const checkGameOver = useCallback(
    (currentRole, cell) => {
      const status = check(currentRole, ...cell)(boardArray);
      return status === GAME_STATUS_FINISH;
    },
    [boardArray]
  );

  const startGame = useCallback(() => {
    if (gameStatus === GAME_STATUS_STOP) {
      dispatch(updateStatusAction(GAME_STATUS_START));
    }
  }, [gameStatus]);

  const resetGame = useCallback(() => {
    dispatch(newGameAction());
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
    setBoardInstance(board.current.getBoardInstance(boardArray));
  }, []);

  return (
    <>
      <Head>
        <title>{WEBSITE_TITLE_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <H1 currentRole={currentRole} currentStatus={gameStatus} />
      <HomeWrapper>
        <Board onClik={onClick} ref={board}>
          <Chess boardInstance={boardInstance}></Chess>
        </Board>
        <ControllerPanel status={gameStatus} startGame={startGame} resetGame={resetGame} />
      </HomeWrapper>
    </>
  );
}
