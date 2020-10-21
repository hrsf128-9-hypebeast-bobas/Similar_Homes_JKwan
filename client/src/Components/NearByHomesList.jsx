import React from 'react'
import NearbyHomes from './NearbyHomes.jsx'
import NearbyHomesNext from './NearbyHomesNext.jsx'
import NearbyHomesPrevious from './NearbyHomesPrevious.jsx'
import NearbyHomesMore from './NearbyHomesMore.jsx'
import styles from '../Styles/HomesList.css'

class NearbyHomesList extends React.Component {
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
    }

  }

  nextSlide () {
    let slideLength = 2
    this.carouselRef.current.scrollLeft += (this.carouselRef.current.offsetWidth * .95);
    if (this.state.currentIndex < slideLength) {
      this.setState({
        currentIndex: this.state.currentIndex += 1
      })
    }

  }

  render() {
    let slideLength = 2
    let previousButton = this.state.currentIndex ? <NearbyHomesPrevious previous={this.previousSlide} /> : ''
    let nextButton;
    if (this.state.currentIndex === slideLength) {
      nextButton = ''
    } else {
      nextButton = <NearbyHomesNext next={this.nextSlide}/>
    }
    const listings = this.props.listings;
    return (
      <div id="nearbyCarousel" className={styles.carousel} >
        <h2 className={styles.listings}> New Listings near 2065 Park Blvd</h2>
        <div className={styles.sliderContainer}>
          <div className={styles.container}>
            <div ref={this.carouselRef} className={styles.carouselInner}>
              {listings.map((listing) => (
                <NearbyHomes listing={listing} />
                ))
              }
              <NearbyHomesMore />
            </div>
          </div>
          {previousButton}
          {nextButton}
        </div>


      </div>
    )
  }
}

export default NearbyHomesList