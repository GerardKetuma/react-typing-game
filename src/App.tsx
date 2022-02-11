import React, { useRef } from 'react'
import GameArea from './components/GameArea'
import ResultsArea from './components/ResultsArea'
import { useGameLogic } from './hooks/useGameLogic'
import { keyboardChars } from './utilites'
import styles from './App.module.css'

function App() {
  const {
    gameState: {
      started,
      timeLeft,
      error,
      wordCount,
      successIndex,
      failIndex,
      accuracy,
      moveAhead,
      stats,
      beginningBlob,
      remainingBlob,
      completedBlob,
      charState,
    },
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
  } = useGameLogic()
  const areaRef = useRef<HTMLDivElement | null>(null)
  const countDownRef = useRef<number | null>(null)

  const handleReset = () => {
    dispatchReset()
    setTimeout(() => handleStartTyping(), 0)
  }

  const handleStartTyping = () => {
    if (areaRef.current) areaRef.current.focus()
    dispatchStart()

    const epochSeconds = Date.now() + 60 * 1000
    countDownRef.current = window.setInterval(() => {
      const timeLeft = Math.round((epochSeconds - Date.now()) / 1000)
      if (timeLeft <= 0) {
        dispatchEnd()
        if (countDownRef.current) window.clearInterval(countDownRef.current)
      }
      dispatchTimeleft(timeLeft)
    }, 1000)
  }

  const handleKeyDown = (evt: React.KeyboardEvent<Element>) => {
    if (!started || timeLeft === 0 || stats) return

    evt.preventDefault()
    const { key } = evt

    if (keyboardChars.includes(key) && key !== 'Shift') {
      if (key === beginningBlob.charAt(moveAhead)) {
        dispatchSuccess()
      } else {
        dispatchFail()
      }

      if (successIndex > 4) {
        dispatchAccuracy(
          Math.floor(((successIndex - failIndex) / successIndex) * 100)
        )
      }

      if (moveAhead + 1 === beginningBlob.length) {
        dispatchEnd()
      }

      if (key === ' ') {
        dispatchWordcount()
      }
    }
  }

  return (
    <div className={styles.layoutWrapper}>
      <h1 className={styles.heading}>Typing Test</h1>
      {stats ? (
        <ResultsArea
          {...{
            wordCount,
            accuracy,
            beginningBlob,
            completedBlob,
            moveAhead,
            stats,
            failIndex,
            charState,
            handleReset,
          }}
        />
      ) : (
        <GameArea
          {...{
            started,
            areaRef,
            completedBlob,
            remainingBlob,
            beginningBlob,
            failIndex,
            timeLeft,
            error,
            accuracy,
            handleStartTyping,
            handleKeyDown,
          }}
        />
      )}
    </div>
  )
}

export default App
