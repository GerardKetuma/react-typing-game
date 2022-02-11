import { useReducer, Reducer, useCallback } from 'react'
import { ActionType, ActionItemType, GameActionType } from '../types'
import { wordList, shuffleArray } from '../utilites'

const initialText = `Click "Start Evaluation" and begin typing`

const initialState = {
  started: false,
  timeLeft: 60,
  error: false,
  wordCount: 0,
  successIndex: 0,
  failIndex: 0,
  accuracy: 0,
  moveAhead: 0,
  stats: false,
  beginningBlob: initialText,
  remainingBlob: initialText,
  completedBlob: '',
  charState: new Array<number>(initialText.length).fill(0),
}

export type GameState = typeof initialState

const reducer: Reducer<GameState, ActionItemType> = (state, action) => {
  switch (action.type) {
    case ActionType.START:
      const randomizedWords = shuffleArray(wordList).join(' ')
      return {
        ...state,
        started: true,
        stats: false,
        beginningBlob: randomizedWords,
        remainingBlob: randomizedWords,
        charState: new Array<number>(randomizedWords.length).fill(0),
      }
    case ActionType.END:
      return {
        ...state,
        started: false,
        stats: true,
        beginningBlob: state.beginningBlob,
        remainingBlob: state.remainingBlob,
        timeLeft: state.timeLeft,
      }
    case ActionType.RESET:
      return initialState
    case ActionType.SUCCESS:
      //Read the first string from the remainingBlob
      const char = state.remainingBlob.charAt(0)
      return {
        ...state,
        moveAhead: state.moveAhead + 1,
        successIndex: state.successIndex + 1,
        remainingBlob: state.remainingBlob.slice(1),
        completedBlob: state.completedBlob + char,
        error: false,
      }
    case ActionType.FAIL:
      let newCharState = [...state.charState]
      if (newCharState[state.moveAhead + 1] === 0) {
        newCharState[state.moveAhead + 1] = 1
      }
      return {
        ...state,
        error: true,
        failIndex: state.failIndex + 1,
        charState: newCharState,
      }
    case ActionType.TIMELEFT:
      return {
        ...state,
        timeLeft: action.data,
      }
    case ActionType.ACCURACY:
      return {
        ...state,
        accuracy: action.data,
      }
    case ActionType.WORDCOUNT:
      return {
        ...state,
        wordCount: state.wordCount + 1,
      }
    default:
      return state
  }
}

export const useGameLogic = (): {
  gameState: GameState
  actions: GameActionType
} => {
  const [state, dispatch] = useReducer<Reducer<GameState, ActionItemType>>(
    reducer,
    initialState
  )

  const dispatchStart = useCallback<GameActionType['dispatchStart']>(
    () => dispatch({ type: ActionType.START }),
    [dispatch]
  )

  const dispatchEnd = useCallback<GameActionType['dispatchEnd']>(
    () => dispatch({ type: ActionType.END }),
    [dispatch]
  )

  const dispatchReset = useCallback<GameActionType['dispatchReset']>(
    () => dispatch({ type: ActionType.RESET }),
    [dispatch]
  )

  const dispatchSuccess = useCallback<GameActionType['dispatchSuccess']>(
    () => dispatch({ type: ActionType.SUCCESS }),
    [dispatch]
  )

  const dispatchFail = useCallback<GameActionType['dispatchFail']>(
    () => dispatch({ type: ActionType.FAIL }),
    [dispatch]
  )

  const dispatchTimeleft = useCallback<GameActionType['dispatchTimeleft']>(
    (num: number) => dispatch({ type: ActionType.TIMELEFT, data: num }),
    [dispatch]
  )

  const dispatchAccuracy = useCallback<GameActionType['dispatchAccuracy']>(
    (num: number) => dispatch({ type: ActionType.ACCURACY, data: num }),
    [dispatch]
  )

  const dispatchWordcount = useCallback<GameActionType['dispatchWordcount']>(
    () => dispatch({ type: ActionType.WORDCOUNT }),
    [dispatch]
  )

  return {
    gameState: state,
    actions: {
      dispatchStart,
      dispatchEnd,
      dispatchReset,
      dispatchSuccess,
      dispatchFail,
      dispatchTimeleft,
      dispatchAccuracy,
      dispatchWordcount,
    },
  }
}
