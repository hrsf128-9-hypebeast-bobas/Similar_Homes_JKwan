import React from 'react'
import styles from '../Styles/MoreHomes.css'

/* Component for additional listings */

const SimilarHomesMore = () => {
  return (
  <div className={styles.item}>
    <a href='https://www.trulia.com/CA/Palo_Alto/'>
    <div className={styles.propertyMedia}>
      <div className={styles.additionalContainer}>
      <div className={styles.additionalBox}>
        <div className={styles.additionalBox}>
          <svg className={styles.svgAdditional} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M9.75 9.766h17.985v9.03H9.749v-9.03zm-2.673-2.68v19.95h-2.66V4.427h23.318v2.66H7.077z" fill="#869099" fillRule="evenodd"></path></svg>
        </div>
      </div>
      <div className={styles.seeMore}>
        See more homes for sale in
        <div className={styles.cityText}>
          Palo Alto
        </div>
      </div>
        <div className={styles.button}>
          <button className={styles.buttonText}>
            Take a look
          </button>
        </div>
      </div>
    </div>
    </a>
  </div>

  )
}

export default SimilarHomesMore