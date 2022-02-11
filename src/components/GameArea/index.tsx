import React, { memo } from 'react'
import cx from 'classnames'
import styles from './GameArea.module.css'

interface GameAreaProps {
  started: boolean
  areaRef: React.RefObject<HTMLDivElement> | null
  completedBlob: string
  remainingBlob: string
  beginningBlob: string
  failIndex: number
  timeLeft: number
  error: boolean
  accuracy: number
  handleStartTyping: () => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
}

const GameArea = ({
  started = false,
  areaRef = null,
  completedBlob = '',
  remainingBlob = '',
  beginningBlob = '',
  failIndex = 0,
  timeLeft = 0,
  error = false,
  accuracy = 0,
  handleStartTyping,
  handleKeyDown,
}: GameAreaProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.timer}>
        <div className={styles.timeLeft}>
          <span>Time Left: </span>
          <span>{timeLeft}s</span>
        </div>
      </div>
      <div className={styles.typingContent}>
        <div
          ref={areaRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="textbox"
          className={cx(styles.typingArea, {
            [styles.active]: started,
            [styles.error]: error,
          })}
        >
          <span className={styles.cursor}></span>
          <span className={styles.remainingBlob}>{remainingBlob}</span>
        </div>
      </div>
      <div className={styles.ctaContent}>
        <button
          disabled={started}
          onClick={started ? () => {} : handleStartTyping}
          className={styles.ctaBtn}
        >
          Start Evaluation
        </button>
        <div className={styles.stats}>
          <div className={styles.progress}>
            <span>Progress: </span>
            <span>
              {((completedBlob.length / beginningBlob.length) * 100).toFixed(0)}
              %
            </span>
          </div>
          <div className={styles.accuracy}>
            <span>Accuracy: </span>
            <span>{accuracy}%</span>
          </div>
          <div className={styles.errors}>
            <span>Errors: </span>
            <span>{failIndex}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(GameArea)
