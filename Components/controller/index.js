import React from "react";
import styled from "styled-components";
import { StartButton, ResetButton } from "../Button";
import { GAME_STATUS_STOP } from "../../config";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 35px 35px 0 0;
  font-size: 40px;
  position: relative;
  align-items: center;
`;

const Aside = ({ status, startGame, resetGame }) => (
  <Wrapper>
    {/* <Elapsed status={status} /> */}
    <StartButton disable={status !== GAME_STATUS_STOP} onClick={startGame} />
    <ResetButton onClick={resetGame} />
  </Wrapper>
);

export default Aside;
