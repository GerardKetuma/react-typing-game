import React, { memo } from 'react'
import styles from './ResultsArea.module.css'

interface ResultsAreaProps {
  wordCount: number
  accuracy: number
  beginningBlob: string
  completedBlob: string
  moveAhead: number
  stats: boolean
  failIndex: number
  charState: number[]
  handleReset: () => void
}

const ResultsArea = ({
  wordCount = 0,
  accuracy = 0,
  beginningBlob = '',
  completedBlob = '',
  moveAhead = 0,
  stats = false,
  failIndex = 0,
  charState = [0],
  handleReset,
}: ResultsAreaProps) => {
  // Map through original blob and highlight chars that were typed wrong
  const highlightedText = beginningBlob.split('').map((char, index) => {
    let styling = 'slate300'
    if (index <= completedBlob.length - 1) {
      if (charState[index + 1] !== 0) {
        styling = 'red400'
      } else {
        styling = 'slate700'
      }
    }
    return (
      <span key={char + index} className={styles[styling]}>
        {char}
      </span>
    )
  })

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Results</h2>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.title}>Words Per Minute</div>
          <div className={styles.content}>{wordCount}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>Progress(%)</div>
          <div className={styles.content}>
            {((completedBlob.length / beginningBlob.length) * 100).toFixed(0)}
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>Accuracy(%)</div>
          <div className={styles.content}>{accuracy}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>Errors(Total)</div>
          <div className={styles.content}>{failIndex}</div>
        </div>
      </div>
      <div className={styles.showErrors}>
        <h4 className={styles.heading}>Completion and Error Matrix</h4>
        <p>{highlightedText}</p>
      </div>
      <div className={styles.ctaContent}>
        <button
          className={styles.ctaBtn}
          type="button"
          disabled={!stats}
          onClick={handleReset}
        >
          Restart Test
        </button>
      </div>
    </div>
  )
}

export default memo(ResultsArea)
