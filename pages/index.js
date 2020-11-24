import { useCallback, useState } from "react";
import Head from "next/head";
import H1 from "../Components/H1";
import Board from "../Components/Board";
import { TITLE_NAME } from "../config/setting";

export default function Home() {
  const [boardCanvas, setBoardCancas] = useState();
  const onClick = useCallback((e) => {}, []);

  return (
    <>
      <Head>
        <title>{TITLE_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <H1>{TITLE_NAME}</H1>
      <Board setBoardCancas={setBoardCancas} onClik={onClick} />
    </>
  );
}
