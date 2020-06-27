import React from 'react'
import SimilarHomesList from './SimilarHomesList.jsx'
import NearbyHomesList from './NearbyHomesList.jsx'
const axios = require('axios');


//class app
//handle slide
//import nearby listing and similar home listings
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      listings: []
    }
    this.carouselRef = React.createRef();
    this.previousSlide = this.previousSlide.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
  }
  /* Get listings after component mounts */
  componentDidMount() {
    axios.get('/api/similarListings')
      .then(res => {
        const listings = res.data; //response data is displayed
        this.setState({ listings })
      })
    .catch(err => console.log(err))
  }
  previousSlide () {
    // e.preventDefault();
    console.log('clicked previous')
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
    this.carouselRef.current ? (this.carouselRef.current.scrollLeft -= 200) : null
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
    // this.carouselRef.current ? (this.carouselRef.current.scrollRight += 200) : null
    console.log(document.getElementById('app'), 'click');
  }

  render() {
    console.log(this.carouselRef, 'ref')
    return (
    <div className="App">
      <SimilarHomesList ref={this.carouselRef} next={this.nextSlide} previous={this.previousSlide} listings={this.state.listings} />
      <NearbyHomesList listings={this.state.listings}/>
    </div>
  )}

};

export default App