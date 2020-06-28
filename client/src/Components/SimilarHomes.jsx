import React from 'react';
import SimilarHomesImage from './SimilarHomesImage.jsx'
import SimilarHomesInfo from './SimilarHomesInfo.jsx'
import styles from '../Styles/Homes.css'
// /* SVG components */

const priceIncreaseSVG = <svg className={styles.increase} data-testid="property-trend-up" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M14.742 9.373l-5.775 5.11-1.763-1.992 8.73-7.725 9.006 7.692-1.728 2.023-5.81-4.964v17.03h-2.66V9.373z" fill="#869099"></path></svg>

const priceDecreaseSVG = <svg className={styles.decrease} data-testid="property-trend-down" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M17.161 22.414l5.776-5.11 1.762 1.992-8.73 7.725-9.005-7.692 1.727-2.023 5.81 4.963V5.863h2.66v16.55z" fill="#869099"></path></svg>

// /* Add commas to prices */
// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };

/* Handles price change condition */
function priceChangeElement(props) {
  if (!props.listing.Price_change) {
    return priceIncreaseSVG
  } else if (props.listing.Price_change === 1) {
    return priceDecreaseSVG
  } else {
    return '';
  }
}

const SimilarHomes = (props) => (
  <div className={styles.item}>
    <a className='fill-div' href='https://www.trulia.com/p/ca/palo-alto/569-maybell-ave-palo-alto-ca-94306--2472139085'>
    <SimilarHomesImage image={props.listing.Image_url} onClick={props.onClick} state={props.state} new={props.listing.New} />
    <SimilarHomesInfo price={props.listing.Price} bedroomNum={props.listing.Bedroom_num} bathroomNum={props.listing.Bathroom_num} squareFt={props.listing.Square_footage} address={props.listing.Address} region={props.listing.Region} priceChange={priceChangeElement(props)}/>
    </a>
  </div>
)

export default SimilarHomes;