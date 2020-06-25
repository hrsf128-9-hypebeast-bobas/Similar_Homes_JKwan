import React from 'react';

/* SVG components */
const squareFootage = <svg className="svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.748 21.276l-3.093-3.097v3.097h3.093zm12.852 5.32H10.655v.004h-5.32v-.004H5.32v-5.32h.015V5.32L26.6 26.596z" fill="#869099"></path>
</svg>

const bedroomSVG = <svg className="svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.196 14.603h15.523v.027h1.995v10.64h-3.99v-4.017H9.196v4.017h-3.99V6.65h3.99v7.953zm2.109-1.968v-2.66h4.655v2.66h-4.655z" fill="#869099"></path>
</svg>

const bathroomSVG = <svg className="svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.981 15.947H26.6v1.33a9.31 9.31 0 0 1-9.31 9.31h-2.66a9.31 9.31 0 0 1-9.31-9.31v-1.33h16.001V9.995a2.015 2.015 0 0 0-2.016-2.015h-.67c-.61 0-1.126.407-1.29.965a2.698 2.698 0 0 1 1.356 2.342H13.3a2.7 2.7 0 0 1 1.347-2.337 4.006 4.006 0 0 1 3.989-3.63h.67a4.675 4.675 0 0 1 4.675 4.675v5.952z" fill="#869099"></path>
</svg>

const saveHomeSVG = <svg width="30" height="30" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
<g fill="none">
  <path d="M26.95 11.863a5.193 5.193 0 0 1-1.53 3.69l-1.913 1.912-7.373 7.373-7.371-7.373-1.912-1.912a5.214 5.214 0 1 1 7.377-7.366l1.906 1.907 1.908-1.908a5.214 5.214 0 0 1 8.908 3.677z" fillOpacity=".4" fill="#000"></path>
  <path d="M26.95 11.863a5.214 5.214 0 0 0-8.908-3.677l-1.908 1.908-1.906-1.908a5.214 5.214 0 1 0-7.377 7.366l1.912 1.913 7.371 7.373 7.373-7.373 1.912-1.912a5.193 5.193 0 0 0 1.53-3.69zM16.157 6.31A7.874 7.874 0 1 1 27.3 17.433l-1.913 1.913-9.254 9.254-1.88-1.88-7.373-7.374-1.91-1.91a7.874 7.874 0 1 1 11.137-11.13l.027.025.022-.022z" fill="#FFF">
  </path>
</g>
</svg>

const priceIncreaseSVG = <svg className="svg increase" data-testid="property-trend-up" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M14.742 9.373l-5.775 5.11-1.763-1.992 8.73-7.725 9.006 7.692-1.728 2.023-5.81-4.964v17.03h-2.66V9.373z" fill="#869099"></path></svg>

const priceDecreaseSVG = <svg class="svg decrease" data-testid="property-trend-down" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M17.161 22.414l5.776-5.11 1.762 1.992-8.73 7.725-9.005-7.692 1.727-2.023 5.81 4.963V5.863h2.66v16.55z" fill="#869099"></path></svg>

/* Add commas to prices */
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

let newListing;

const SimilarHomes = (props) => (
  <div className="item">
    <div className="propertyMedia box">
      <img className="propertyImage" src={props.listing.Image_url} alt="House"></img>
      <div className="saveHomeButton box">
        <div role="button" className="heartButton">
          {saveHomeSVG}
        </div>
      </div>
      <div className="propertyTagContainer">
        {props.listing.New ? <span className="tagText"> <span> New</span></span> : ''}
      </div>
    </div>
    <div className="carousel-caption">
      <div className="price container">
        <div className="propertyPrice">${numberWithCommas(props.listing.Price).replace(/\.00$/,'')}</div>
        <div className="priceChange">
          {props.listing.Price_change ? priceDecreaseSVG : priceIncreaseSVG}
        </div>
      </div>
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

export default SimilarHomes;