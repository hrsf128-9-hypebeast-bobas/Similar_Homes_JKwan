import React from 'react'

const SimilarHomesMore = () => {
  return (
  <div className="item">
    <a href='https://www.trulia.com/CA/Palo_Alto/'>
    <div className="propertyMedia box">
      <div className="additionalContainer">
      <div className="additional-box">
        <div className="svg additional-box">
          <svg className="svg-additional " viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M9.75 9.766h17.985v9.03H9.749v-9.03zm-2.673-2.68v19.95h-2.66V4.427h23.318v2.66H7.077z" fill="#869099" fillRule="evenodd"></path></svg>
        </div>
      </div>
      <div className="additional contain seeMore">
        See more homes for sale in
        <div className="additional city text">
          Palo Alto
        </div>
      </div>
      <div className="search contain">
        <div className="button">
          <button className="search buttonText">
            Take a look
          </button>
        </div>
      </div>
      </div>
    </div>
    </a>
  </div>

  )
}

export default SimilarHomesMore