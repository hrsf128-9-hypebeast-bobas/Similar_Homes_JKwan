import React from 'react'
import NearbyHomesButton from './NearbyHomesButton.jsx'
import styles from '../Styles/HomesImage.css'

//component with mousehover image
const NearbyHomesImage = (props) => {
  return (
    <div className={styles.propertyMedia}>
      <img className={styles.propertyImage} src={props.image} alt="House"></img>
      <NearbyHomesButton />
      <span className={styles.propertyTagContainer}>
        {props.new ? <span className={styles.tagText}> <span> New</span></span> : ''}
      </span>
    </div>
  )
}

export default NearbyHomesImage