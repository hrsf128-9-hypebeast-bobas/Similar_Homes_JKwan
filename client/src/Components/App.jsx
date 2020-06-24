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
  }
  /* Get listings after component mounts */
  componentDidMount() {
    axios.get('/api/listings')
      .then(res => {
        const listings = res.data; //response data is displayed
        console.log(res.data)
        this.setState({ listings })
      })
  }

  render() {
    return (
    <div className="App">
      <SimilarHomesList listings={this.state.listings} />
      <NearbyHomesList listings={this.state.listings}/>
    </div>
  )}

};

export default App