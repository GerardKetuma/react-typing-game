export enum ActionType {
  START = 'START',
  END = 'END',
  RESET = 'RESET',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  TIMELEFT = 'TIMELEFT',
  ACCURACY = 'ACCURACY',
  WORDCOUNT = 'WORDCOUNT',
}

export type ActionItemType =
  | { type: ActionType.START }
  | { type: ActionType.END }
  | { type: ActionType.RESET }
  | { type: ActionType.SUCCESS }
  | { type: ActionType.FAIL }
  | { type: ActionType.TIMELEFT; data: number }
  | { type: ActionType.ACCURACY; data: number }
  | { type: ActionType.WORDCOUNT }

export interface GameActionType {
  dispatchStart: () => void
  dispatchEnd: () => void
  dispatchReset: () => void
  dispatchSuccess: () => void
  dispatchFail: () => void
  dispatchTimeleft: (num: number) => void
  dispatchAccuracy: (num: number) => void
  dispatchWordcount: () => void
}
