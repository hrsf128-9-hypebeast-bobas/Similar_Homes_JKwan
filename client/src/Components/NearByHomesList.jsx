import React from 'react'

const NearbyHomesList = (() => {
  return (
    <div id="nearByCarousel" className="carousel slide">

      <h2 className='listings'> New Listings near 2065 Park Blvd </h2>
      <button className="prev">
        <span className="offscreen">◀</span>
      </button>
      <button className="next">
        <span className="offscreen">▶</span>
      </button>
      <div className="carousel-indicator">
        <div data-target="#nearByCarousel" data-slide-to="0" className="active"></div>
        <div data-target="#nearByCarousel" data-slide-to="1" className="active"></div>
        <div data-target="#nearByCarousel" data-slide-to="2" className="active"></div>
      </div>
      <div className="carousel-inner">
        <div className="item active">
          <img className="propertyImage" src="https://static.trulia-cdn.com/pictures/thumbs_3/zillowstatic/IS3zbv7uhkutaw0000000000.jpg" alt="House One"></img>
          <div className="carousel-caption">
            <div className="propertyPrice">$4,500,000</div>
            <div className="propertyInfo">4bd 5ba 2,785 sqft</div>
            <div className="propertyStreet">781 Encina Grande Dr</div>
            <div className="propertyRegion">Palo Alto,CA 94306</div>
          </div>
        </div>
        <div className="item">
          <img className="propertyImage" src="https://static.trulia-cdn.com/pictures/thumbs_3/zillowstatic/IS3zrnkz9gui190000000000.jpg" alt="House Two"></img>
          <div className="carousel-caption">
            <div className="propertyPrice">$4,600,000</div>
            <div className="propertyInfo">4bd 5ba 2,785 sqft</div>
            <div className="propertyStreet">781 Encina Grande Dr</div>
            <div className="propertyRegion">Palo Alto,CA 94306</div>
          </div>
        </div>
        <div className="item">
          <img className="propertyImage" src="https://static.trulia-cdn.com/pictures/thumbs_3/zillowstatic/IS7it8u6srqox11000000000.jpg" alt="House Three"></img>
          <div className="carousel-caption">
            <div className="propertyPrice">$4,800,000</div>
            <div className="propertyInfo">4bd 5ba 2,785 sqft</div>
            <div className="propertyStreet">781 Encina Grande Dr</div>
            <div className="propertyRegion">Palo Alto,CA 94306</div>
          </div>
        </div>
        <div className="item">
          <img className="propertyImage" src="https://static.trulia-cdn.com/pictures/thumbs_3/zillowstatic/IS3zrnkz9gui190000000000.jpg" alt="House Two"></img>
          <div className="carousel-caption">
            <div className="propertyPrice">$4,600,000</div>
            <div className="propertyInfo">4bd 5ba 2,785 sqft</div>
            <div className="propertyStreet">781 Encina Grande Dr</div>
            <div className="propertyRegion">Palo Alto,CA 94306</div>
          </div>
        </div>
        <div className="item">
          <img className="propertyImage" src="https://static.trulia-cdn.com/pictures/thumbs_3/zillowstatic/IS7it8u6srqox11000000000.jpg" alt="House Three"></img>
          <div className="carousel-caption">
            <div className="propertyPrice">$4,800,000</div>
            <div className="propertyInfo">4bd 5ba 2,785 sqft</div>
            <div className="propertyStreet">781 Encina Grande Dr</div>
            <div className="propertyRegion">Palo Alto,CA 94306</div>
          </div>
        </div>
      </div>
    </div>


  )
})

export default NearbyHomesList