import { UPDATE_GAME, UPDATE_STATUS, NEW_GAME, UPDATE_STEP } from "./constants";

export const updateGameAction = (play) => ({
  type: UPDATE_GAME,
  payload: play
});

export const updateStatusAction = (status) => ({
  type: UPDATE_STATUS,
  payload: status
});

export const newGameAction = () => ({
  type: NEW_GAME
});

export const updateStepAction = (step) => {
  return {
    type: UPDATE_STEP,
    payload: step
  };
};
