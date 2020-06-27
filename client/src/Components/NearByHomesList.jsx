import React from 'react'
import NearbyHomes from './NearbyHomes.jsx'

class NearbyHomesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fill: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  // handle click
  handleClick() {
    this.setState({
      fill: true
    })
  }
  render() {
    const listings = this.props.listings;
    return (
      <div id="similarCarousel" className="carousel slide" >
        <h2 className='listings'> New Listings near 2065 Park Blvd </h2>
        <div className="carousel-inner">

          {listings.map((listing) => (
          <NearbyHomes listing={listing} onClick={this.handleClick} />
          ))
          }
          <div className="next control slider ">
            <button className="sliderController">
              <div className="SVGContainer">
                <svg className="svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.65 16.513l-7.147-7.055 1.868-1.893 9.068 8.951-9.069 8.927-1.866-1.896z" fill="#869099"></path>
                </svg>
              </div>
            </button>
          </div>
          <div className="previous control slider ">
            <button className="sliderController">
              <div className="SVGContainer">
              <svg className="svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M14.292 16.494l7.147 7.056-1.869 1.893-9.067-8.951 9.069-8.927 1.866 1.896z" fill="#869099"></path></svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default NearbyHomesList