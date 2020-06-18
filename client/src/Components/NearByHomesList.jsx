import React from 'react'

const NearByHomesList = (() => {
  return (
    <div id="nearByCarousel" className="carousel slide" data-ride="carousel">

    <h2 className='listings'> New Listings near 2065 Park Blvd </h2>
    <div className="carousel-indicator">
      <div data-target="#nearByCarousel" data-slide-to="0" className="active"></div>
      <div data-target="#nearByCarousel" data-slide-to="1" className="active"></div>
      <div data-target="#nearByCarousel" data-slide-to="2" className="active"></div>
    </div>
    <div className="carousel-inner">
      <div className="item active">
        <img src="https://static.trulia-cdn.com/pictures/thumbs_3/zillowstatic/IS3zbv7uhkutaw0000000000.jpg" alt="House One"></img>
        <div className="carousel-caption">
          <p>$4,500,000</p>
        </div>
      </div>
      <div className="item">
        <img src="https://static.trulia-cdn.com/pictures/thumbs_3/zillowstatic/IS3zrnkz9gui190000000000.jpg" alt="House Two"></img>
        <div className="carousel-caption">
          <p>$4,600,000</p>
        </div>
      </div>
      <div className="item">
        <img src="https://static.trulia-cdn.com/pictures/thumbs_3/zillowstatic/IS7it8u6srqox11000000000.jpg" alt="House Three"></img>
        <div className="carousel-caption">
          <p>$4,800,000</p>
        </div>
      </div>
      <div className="item">
        <img src="https://static.trulia-cdn.com/pictures/thumbs_3/zillowstatic/IS3zrnkz9gui190000000000.jpg" alt="House Two"></img>
        <div className="carousel-caption">
          <p>$4,600,000</p>
        </div>
      </div>
      <div className="item">
        <img src="https://static.trulia-cdn.com/pictures/thumbs_3/zillowstatic/IS7it8u6srqox11000000000.jpg" alt="House Three"></img>
        <div className="carousel-caption">
          <p>$4,800,000</p>
        </div>
      </div>
    </div>

  </div>
  )
})

export default NearByHomesList