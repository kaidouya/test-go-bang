import { useRef, useCallback, useState } from "react";
import Head from "next/head";
import H1 from "../Components/H1";
import Board from "../Components/Board";
import { TITLE_NAME } from "../config/setting";
import { getCellCoordinate, getCellCenterPosition } from "../utils/position";

export default function Home() {
  const boardRef = useRef(null);

  const onClick = useCallback((e) => {
    const boardSize = boardRef.current.getBoardSize();
    const { coordinateX, coordinateY } = getCellCoordinate(e, boardSize);
    const { CellX, CellY } = getCellCenterPosition(coordinateX, coordinateY);
    console.log(CellX, CellY);
  }, []);

  return (
    <>
      <Head>
        <title>{TITLE_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <H1>{TITLE_NAME}</H1>
      <Board onClik={onClick} ref={boardRef} />
    </>
  );
}
