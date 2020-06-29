import React from 'react'
import SimilarHomesList from './SimilarHomesList.jsx'
import NearbyHomesList from './NearbyHomesList.jsx'
import styles from '../Styles/App.css'
const axios = require('axios');


//class app
//handle slide
//import nearby listing and similar home listings
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      similarListings: [],
      nearbyListings: []
    }
  }

  /* Get listings after component mounts */
  componentDidMount() {
    axios.get('/api/similarListings')
      .then(res => {
        const similarListings = res.data; //response data is displayed
        this.setState({ similarListings })
      })
    .catch(err => console.log(err))
    //get nearby listings
    axios.get('/api/nearbyListings')
      .then(res => {
        const nearbyListings = res.data;
        this.setState({nearbyListings})
      })
  }

  render() {
    return (
    <div className={styles.appContainer}>
      <SimilarHomesList listings={this.state.similarListings} />
      <NearbyHomesList listings={this.state.nearbyListings}/>
    </div>
  )}

};

export default App