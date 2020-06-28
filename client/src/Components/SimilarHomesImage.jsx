import React from 'react'
import SimilarHomesButton from './SimilarHomesButton.jsx'
import styles from '../Styles/HomesImage.css'

//component with mousehover image
const SimilarHomesImage = (props) => {
  return (
    <div className={styles.propertyMedia}>
      <img className={styles.propertyImage} src={props.image} alt="House"></img>
      <SimilarHomesButton />
      <span className={styles.propertyTagContainer}>
        {props.new ? <span className={styles.tagText}> <span> New</span></span> : ''}
      </span>
    </div>
  )
}

export default SimilarHomesImage