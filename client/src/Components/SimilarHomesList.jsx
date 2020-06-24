import React from 'react'
import SimilarHomes from './SimilarHomes.jsx'

class SimilarHomesList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const listings = this.props.listings;
    return (
      <div id="similarCarousel" className="carousel slide" >
        <h2 className='listings'> Similar Homes You May Like</h2>
        <div className="carousel-indicator">
          <div data-target="#similarCarousel" data-slide-to="0" className="active"></div>
          <div data-target="#similarCarousel" data-slide-to="1" className="active"></div>
          <div data-target="#similarCarousel" data-slide-to="2" className="active"></div>
        </div>
        <div className="carousel-inner">{listings.map((listing) => (
          <SimilarHomes listing={listing} />
          ))
        }
        </div>
      </div>
    )
  }
}

export default SimilarHomesList

//  {/* <button className="prev">
//           <span className="offscreen">&#8249;</span>
//         </button>
//         <button className="next">
//         <span className="offscreen">&#8250;</span>
//         </button> */}
// {/* <div className="item">
// */}
//   {/* {/* {/* {/* {/* {/*
// {/* {/* {/* <img
// className="propertyImage"
//  src="https://
// static.trulia-cdn.com/
// pictures/thumbs_3/
// zillowstatic/
// IS3zbv7uhkutaw0000000000.
// jpg" alt="House One"></
// img> */} */} */} */} */}
// */} */} */} */}
// {/* {/* {/* <div
// className="carousel-capti
// on"> */} */} */}
//   {/* {/* {/* <div
// className="propertyPric
// e">$4,500,000</div> */}
// */} */}
//   {/* {/* {/* {/* <div
// className="propertyInfo
// ">4bd 5ba 2,785 sqft</
// div> */} */} */} */}
//   {/* {/* {/* {/* <div
// className="propertyStre
// et">781 Encina Grande
// Dr</div> */} */} */} */
// }
//   {/* {/* {/* {/* <div
// className="propertyRegi
// on">Palo Alto,CA
// 94306</div> */} */} */}
// */}
// {/* </div> */}
// {/* </div> */}
// {/* <div className="item">
// */}
// {/* {/* {/* {/* {/* {/*
// {/* {/* {/* <img
// className="propertyImage"
// src="https://
// static.trulia-cdn.com/
// pictures/thumbs_3/
// zillowstatic/
// IS3zrnkz9gui190000000000.
// jpg" alt="House Two"></
// img> */} */} */} */} */}
// */} */} */} */}
// {/* {/* {/* <div
// className="carousel-capti
// on"> */} */} */}
//   {/* {/* {/* <div
// className="propertyPric
// e">$4,600,000</div> */}
// */} */}
//   {/* {/* {/* {/* <div
// className="propertyInfo
// ">4bd 5ba 2,785 sqft</
// div> */} */} */} */}
//   {/* {/* {/* {/* <div
// className="propertyStre
// et">781 Encina Grande
// Dr</div> */} */} */} */
// }
//   {/* {/* {/* {/* <div
// className="propertyRegi
// on">Palo Alto,CA
// 94306</div> */} */} */}
// */}
// {/* </div> */}
// {/* </div> */}
// {/* <div className="item">
// */}
// {/* {/* {/* {/* {/* {/*
// {/* {/* {/* <img
// className="propertyImage"
// src="https://
// static.trulia-cdn.com/
// pictures/thumbs_3/
// zillowstatic/
// IS7it8u6srqox11000000000.
// jpg" alt="House Three"></
// img> */} */} */} */} */}
// */} */} */} */}
// {/* {/* {/* <div
// className="carousel-capti
// on"> */} */} */}
//   {/* {/* {/* <div
// className="propertyPric
// e">$4,800,000</div> */}
// */} */}
//   {/* {/* {/* {/* <div
// className="propertyInfo
// ">4bd 5ba 2,785 sqft</
// div> */} */} */} */}
//   {/* {/* {/* {/* <div
// className="propertyStre
// et">781 Encina Grande
// Dr</div> */} */} */} */
// }
//   {/* {/* {/* {/* <div
// className="propertyRegi
// on">Palo Alto,CA
// 94306</div> */} */} */}
// */}
// {/* </div> */}
// {/* </div> */}
// {/* <div className="item">
// */}
// {/* {/* {/* {/* {/* {/*
// {/* {/* {/* <img
// className="propertyImage"
// src="https://
// static.trulia-cdn.com/
// pictures/thumbs_3/
// zillowstatic/
// IS3zrnkz9gui190000000000.
// jpg" alt="House Two"></
// img> */} */} */} */} */}
// */} */} */} */}
// {/* {/* {/* <div
// className="carousel-capti
// on"> */} */} */}
//   {/* {/* {/* <div
// className="propertyPric
// e">$4,600,000</div> */}
// */} */}
//   {/* {/* {/* {/* <div
// className="propertyInfo
// ">4bd 5ba 2,785 sqft</
// div> */} */} */} */}
//   {/* {/* {/* {/* <div
// className="propertyStre
// et">781 Encina Grande
// Dr</div> */} */} */} */
// }
//   {/* {/* {/* {/* <div
// className="propertyRegi
// on">Palo Alto,CA
// 94306</div> */} */} */}
// */}
// {/* </div> */}
// {/* </div> */}
// {/* <div className="item">
// */}
// {/* {/* {/* {/* {/* {/*
// {/* {/* {/* <img
// className="propertyImage"
// src="https://
// static.trulia-cdn.com/
// pictures/thumbs_3/
// zillowstatic/
// IS7it8u6srqox11000000000.
// jpg" alt="House Three"></
// img> */} */} */} */} */}
// */} */} */} */}
// {/* {/* {/* <div
// className="carousel-capti
// on"> */} */} */}
//   {/* {/* {/* <div
// className="propertyPric
// e">$4,800,000</div> */}
// */} */}
//   {/* {/* {/* {/* <div
// className="propertyInfo
// ">4bd 5ba 2,785 sqft</
// div> */} */} */} */}
//   {/* {/* {/* {/* <div
// className="propertyStre
// et">781 Encina Grande
// Dr</div> */} */} */} */
// }
//   {/* {/* {/* {/* <div
// className="propertyRegi
// on">Palo Alto,CA
// 94306</div> */} */} */}
// */}
// {/* </div> */}
// {/* </div> */}