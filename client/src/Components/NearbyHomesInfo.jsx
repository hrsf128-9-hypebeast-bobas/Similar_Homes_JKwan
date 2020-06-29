import React from 'react'
import styles from '../Styles/HomesInfo.css'

/* SVG components */
const squareFootage = <svg className={styles.svg} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.748 21.276l-3.093-3.097v3.097h3.093zm12.852 5.32H10.655v.004h-5.32v-.004H5.32v-5.32h.015V5.32L26.6 26.596z" fill="#869099"></path>
</svg>

const bedroomSVG = <svg className={styles.svg} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.196 14.603h15.523v.027h1.995v10.64h-3.99v-4.017H9.196v4.017h-3.99V6.65h3.99v7.953zm2.109-1.968v-2.66h4.655v2.66h-4.655z" fill="#869099"></path>
</svg>


const bathroomSVG = <svg className={styles.svg} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.981 15.947H26.6v1.33a9.31 9.31 0 0 1-9.31 9.31h-2.66a9.31 9.31 0 0 1-9.31-9.31v-1.33h16.001V9.995a2.015 2.015 0 0 0-2.016-2.015h-.67c-.61 0-1.126.407-1.29.965a2.698 2.698 0 0 1 1.356 2.342H13.3a2.7 2.7 0 0 1 1.347-2.337 4.006 4.006 0 0 1 3.989-3.63h.67a4.675 4.675 0 0 1 4.675 4.675v5.952z" fill="#869099"></path>
</svg>


/* Add commas to prices */
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const NearbyHomesInfo = (props) => {
  return (
    <a className='fill-div' href='https://www.trulia.com/p/ca/palo-alto/569-maybell-ave-palo-alto-ca-94306--2472139085'>
    <div className={styles.carouselCaption}>
      <div className={styles.container}>
        <div className={styles.propertyPrice}>${numberWithCommas(props.price).replace(/\.00$/,'')}</div>
        <div className={styles.priceChange}>
          {props.priceChange}
        </div>
      </div>
      <div className={styles.propertyInfo}>
        <div className={styles.container}>
          {bedroomSVG} {props.bedroomNum}bd
        </div>
        <div className={styles.container}>
          {bathroomSVG} {props.bathroomNum}ba
        </div>
        <div className={styles.container}>
          {squareFootage}{props.squareFt} sqft</div>
        </div>
      <div className={styles.propertyStreet}>{props.address}</div>
      <div className={styles.propertyRegion}>{props.region}</div>
    </div>
    </a>
  )
}
export default NearbyHomesInfo