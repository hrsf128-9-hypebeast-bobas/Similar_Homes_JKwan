import React from 'react'
import SimilarHomesList from './SimilarHomesList.jsx'
import NearByHomesList from './NearByHomesList.jsx'

//class app
//handle slide
//import nearby listing and similar home listings
class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
    <div>
      <SimilarHomesList />
      <NearByHomesList />
    </div>
  )}

};

export default App