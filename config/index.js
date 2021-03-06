/**
 * 基本設定
 */
export const WEBSITE_TITLE_NAME = "五子棋";

export const GRID_AMOUNT = 15;
export const CELL_SIZE = 40;
export const CHESS_SIZE = 34;

/**
 * 棋子顏色設定
 */
export const COLOR_BLACK = "#000000";
export const COLOR_WHITE = "#FFFFFF";
export const COLOR_GREY = "#C8C8C8";

/**
 * 遊戲角色
 */
export const EMPTY = 0;
export const BLACK = 1;
export const WHITE = 2;

export const roleMaps = {
  [BLACK]: "黑棋",
  [WHITE]: "白棋"
};

/**
 * 遊戲狀態
 */
export const GAME_STATUS_STOP = 0;
export const GAME_STATUS_START = 1;
export const GAME_STATUS_FINISH = 2;
export const GAME_STATUS_RESET = 4;
