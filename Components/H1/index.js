import React from "react";
import styled from "styled-components";
import { roleMaps, GAME_STATUS_STOP } from "../../config";

const H1 = styled.h1`
  margin-bottom: 0.25em;
  font-size: 2em;
  text-align: center;
`;

const Title = React.memo(({ currentRole, currentStatus }) => {
  const notStart = currentStatus === GAME_STATUS_STOP;
  return <H1>{notStart ? "請先按開始鈕之後才能遊戲" : `當前玩家：${roleMaps[currentRole]}`}</H1>;
});

export default Title;
