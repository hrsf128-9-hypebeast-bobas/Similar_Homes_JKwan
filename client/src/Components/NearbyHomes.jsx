import React from 'react';

const squareFootage = <svg className="svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
</svg>
const bedroomSVG = <svg className="svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
</svg>
const bathroomSVG = <svg className="svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
</svg>

const NearbyHomes = (props) => (
  <div className="item">
    <img className="propertyImage" src={props.listing.Image_url} alt="House"></img>
    <button className="like-button"></button>
    <div className="carousel-caption">
      <div className="propertyPrice">${props.listing.Price}</div>
      <div className="propertyInfo">
        <div className="bedroom container">
          {bedroomSVG} {props.listing.Bedroom_num}bd
        </div>
        <div className="bathroom container">
          {bathroomSVG} {props.listing.Bathroom_num}ba
        </div>
        <div className="squareFootage container">
          {squareFootage}{props.listing.Square_footage} sqft</div>
        </div>
      <div className="propertyStreet">{props.listing.Address}</div>
      <div className="propertyRegion">{props.listing.Region}</div>
    </div>
  </div>
)

export default NearbyHomes;