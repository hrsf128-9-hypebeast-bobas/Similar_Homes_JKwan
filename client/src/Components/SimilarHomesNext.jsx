import React from 'react'
import styles from '../Styles/HomesArrow.css'

const SimilarHomesNext = (props) => {
  return (
    <div className={styles.nextSlider}>
      <button onClick={props.next} type="button" className={styles.sliderController}>
        <div className={styles.SVGContainer}>
          <svg className={styles.svg} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.65 16.513l-7.147-7.055 1.868-1.893 9.068 8.951-9.069 8.927-1.866-1.896z" fill="#869099"></path>
          </svg>
        </div>
      </button>
    </div>
  )
}
export default SimilarHomesNext