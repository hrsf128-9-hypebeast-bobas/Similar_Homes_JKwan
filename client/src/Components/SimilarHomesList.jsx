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
      currentIndex: 0
    }
    this.previousSlide = this.previousSlide.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
    this.carouselRef = React.createRef()
  }

  /* slider for carousel */
  previousSlide () {
    let slideLength = 2
    this.carouselRef.current.scrollLeft -= (this.carouselRef.current.offsetWidth * .95);
    if (this.state.currentIndex >= (slideLength - this.state.currentIndex)) {
      this.setState({
        currentIndex: this.state.currentIndex -= 1
      })
      console.log(this.carouselRef,this.state.currentIndex, 'clicked prev')
    }

  }

  nextSlide () {
    let slideLength = 2
    this.carouselRef.current.scrollLeft += (this.carouselRef.current.offsetWidth * .95);
    if (this.state.currentIndex < slideLength) {
      this.setState({
        currentIndex: this.state.currentIndex += 1
      })
      console.log(this.carouselRef, slideLength, this.state.currentIndex, 'clicked next')
    }

  }

  render() {
    let slideLength = 2
    let previousButton = this.state.currentIndex ? <SimilarHomesPrevious previous={this.previousSlide} /> : ''
    let nextButton;
    if (this.state.currentIndex === slideLength) {
      nextButton = ''
    } else {
      nextButton = <SimilarHomesNext next={this.nextSlide}/>
    }
    const listings = this.props.listings;
    return (
      <div id="similarCarousel" className={styles.carousel} >
        <h2 className={styles.listings}> Similar Homes You May Like</h2>
        <div className={styles.sliderContainer}>
          <div className={styles.container}>
            <div ref={this.carouselRef} className={styles.carouselInner}>
              {listings.map((listing) => (
                <SimilarHomes listing={listing} />
                ))
              }
              <SimilarHomesMore />
            </div>
          </div>
          {previousButton}
          {nextButton}
        </div>


      </div>
    )
  }
}

export default SimilarHomesList

