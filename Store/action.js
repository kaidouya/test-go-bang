import { UPDATE_GAME, UPDATE_STATUS, NEW_GAME, UPDATE_STEP } from "./constants";

export const updateGame = (play) => ({
  type: UPDATE_GAME,
  payload: play
});

export const updateStatus = (status) => ({
  type: UPDATE_STATUS,
  payload: status
});

export const newGame = () => ({
  type: NEW_GAME
});

export const updateStep = (step) => ({
  type: UPDATE_STEP,
  payload: step,
});

