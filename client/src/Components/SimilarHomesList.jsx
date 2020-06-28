import React from 'react'
import SimilarHomes from './SimilarHomes.jsx'
import SimilarHomesArrow from './SimilarHomesArrow.jsx'
import SimilarHomesMore from './SimilarHomesMore.jsx'
import styles from '../Styles/HomesList.css'

class SimilarHomesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    }
    // this.previousSlide = this.previousSlide.bind(this)
    // this.nextSlide = this.nextSlide.bind(this)
    this.goToSlide = this.goToSlide.bind(this)
  }
  /* slider for carousel */

  goToSlide(index) {
    this.setState({currentIndex: index})
  }

  // previousSlide () {
  //   // e.preventDefault();
  //   console.log('clicked previous', this.ref.current)
  //   // let index = this.state.currentIndex;
  //   // let listingLength = this.props.listings.length;
  //   // // const { currentIndex } = this.state;
  //   // // const shouldResetIndex = currentIndex === 0;
  //   // // const index =  shouldResetIndex ? lastIndex : currentIndex - 1;
  //   // if (index < 1) {
  //   //   index = listingLength;
  //   // }
  //   // index --
  //   // this.setState({
  //   //   currentIndex: index
  //   // });
  //   // this.carouselRef.scrollLeft += 200;
  // }

  // nextSlide () {
  //   // e.preventDefault();
  //   console.log('clicked next')
  //   // const lastIndex = this.props.listings.length - 1;
  //   // const { currentImageIndex } = this.state;
  //   // const shouldResetIndex = currentIndex === lastIndex;
  //   // const index =  shouldResetIndex ? 0 : currentIndex + 1;
  //   // let index = this.state.currentIndex;
  //   // let listingLength = this.props.listings.length - 1;
  //   // if(index === listingLength) {
  //   //   index = -1;
  //   // }
  //   // index++
  //   // this.setState({
  //   //   currentIndex: index
  //   // });
  //   // this.carouselRef.scrollRight += 200;
  // }

  render() {
    const listings = this.props.listings;
    return (
      <div id="similarCarousel" className={styles.carousel} >
        <h2 className={styles.listings} Similar Homes You May Like> </h2>
        <div className={styles.container}>
        <SimilarHomesArrow previous={this.props.previous} next={this.props.next}/>
          <div className={styles.carouselInner}>
            {listings.map((listing) => (
              <SimilarHomes listing={listing} />
              ))
            }
            <SimilarHomesMore />
          </div>
        </div>


      </div>
    )
  }
}

export default SimilarHomesList

