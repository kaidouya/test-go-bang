/**
 * 基本設定
 */
export const TITLE_NAME = "五子棋訓練中心";

export const HOW_MANY_CELL_OF_ONE_LINE = 15;
export const CELL_SIZE = 40;
export const CHESS_SIZE = 34;

export const COLOR_BLACK = "#000000";
export const COLOR_WHITE = "#FFFFFF";
export const COLOR_GREY = "#C8C8C8";
export const COLOR_GREEN = "#75E675";
export const COLOR_BLUE = "#69AFF6";

/**
 * 遊戲角色
 */
export const BLACK = 1;
export const WHITE = 2;
export const EMPTY = 0;

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
