import React from 'react'
import SimilarHomesButton from './SimilarHomesButton.jsx'

//component with mousehover image
const SimilarHomesImage = (props) => {
  return (
    <div className="propertyMedia box">
      <img className="propertyImage" src={props.image} alt="House"></img>
      <SimilarHomesButton />
      <span className="propertyTagContainer">
        {props.new ? <span className="tagText"> <span> New</span></span> : ''}
      </span>
    </div>
  )
}

export default SimilarHomesImage