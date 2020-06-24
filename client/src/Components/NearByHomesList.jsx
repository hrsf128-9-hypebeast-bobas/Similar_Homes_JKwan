import React from 'react'
import NearbyHomes from './NearbyHomes.jsx'

class NearbyHomesList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const listings = this.props.listings;
    return (
      <div id="similarCarousel" className="carousel slide" >
        <div className="carousel-indicator">
          <div data-target="#similarCarousel" data-slide-to="0" className="active"></div>
          <div data-target="#similarCarousel" data-slide-to="1" className="active"></div>
          <div data-target="#similarCarousel" data-slide-to="2" className="active"></div>
        </div>
        <div className="carousel-inner">{listings.map((listing) => (
          <NearbyHomes listing={listing} />
          ))
        }
        </div>
      </div>
    )
  }
}

export default NearbyHomesList