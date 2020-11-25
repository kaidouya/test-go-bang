import React from "react";
import styled from "styled-components";
import { Button } from "antd";

const ButtonWrapper = styled(Button)`
  width: 130px;
  height: 40px;
  border-radius: 20px;
  margin: 20px 0;
  font-size: 20px;
`;

export const StartButton = ({ disable, onClick }) => (
  <ButtonWrapper type="primary" disable={`${disable}`} onClick={onClick} danger>
    Start Game
  </ButtonWrapper>
);

export const ResetButton = ({ onClick }) => (
  <ButtonWrapper type="primary" size="lg" onClick={onClick}>
    New Game
  </ButtonWrapper>
);
