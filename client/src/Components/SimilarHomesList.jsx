import React from 'react'
import SimilarHomes from './SimilarHomes.jsx'
import SimilarHomesNext from './SimilarHomesNext.jsx'
import SimilarHomesPrevious from './SimilarHomesPrevious.jsx'
import SimilarHomesMore from './SimilarHomesMore.jsx'
import styles from '../Styles/HomesList.css'

class SimilarHomesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      width: 0
    }
    this.previousSlide = this.previousSlide.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
    this.goToSlide = this.goToSlide.bind(this)
    this.carouselRef = this.props.getWidth()
  }
  /* slider for carousel */

  goToSlide(index) {
    this.setState({currentIndex: index})
  }
  componentDidMount() {
    console.log(this.carouselRef, 'current div')
    this.setState({ width: this.carouselRef.current.offsetWidth});
  }
  previousSlide () {
    // e.preventDefault();
    console.log('clicked previous', this.carouselRef)
    // let index = this.state.currentIndex;
    // let listingLength = this.props.listings.length;
    // // const { currentIndex } = this.state;
    // // const shouldResetIndex = currentIndex === 0;
    // // const index =  shouldResetIndex ? lastIndex : currentIndex - 1;
    // if (index < 1) {
    //   index = listingLength;
    // }
    // index --
    // this.setState({
    //   currentIndex: index
    // });
    this.carouselRef.current.scrollLeft -= this.state.width;
  }

  nextSlide () {
    // e.preventDefault();
    console.log('clicked next')
    // const lastIndex = this.props.listings.length - 1;
    // const { currentImageIndex } = this.state;
    // const shouldResetIndex = currentIndex === lastIndex;
    // const index =  shouldResetIndex ? 0 : currentIndex + 1;
    // let index = this.state.currentIndex;
    // let listingLength = this.props.listings.length - 1;
    // if(index === listingLength) {
    //   index = -1;
    // }
    // index++
    // this.setState({
    //   currentIndex: index
    // });
    this.carouselRef.current.scrollLeft += this.state.width;
  }

  render() {

    const listings = this.props.listings;
    return (
      <div id="similarCarousel" className={styles.carousel} >
        <h2 className={styles.listings}> Similar Homes You May Like</h2>
        <div className={styles.container}>
          <SimilarHomesPrevious previous={this.previousSlide} />
          <SimilarHomesNext next={this.nextSlide}/>
          <div ref={this.carouselRef} className={styles.carouselInner}>
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

