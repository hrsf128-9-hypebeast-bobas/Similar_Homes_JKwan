const express = require('express')
const app = express()
const port = 3003
const path = require('path')
const bodyParser = require('body-parser')
const Listings = require('../database/Listings.js')
const axios = require('axios')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, '/../client/dist')))
// app.post('/api/listings', (req, res) => {

// })
/* Get listings for similar homes */
app.get('/api/similarListings', (req, res) => {
  const getData = ((callback) => {
    Listings.find((err, listings) => {
      if(err) {
        console.log('error finding data')
      } else {
        res.send(listings)
      }
    })
  })
  getData((err, data) => {
    if (err) {
      console.log('error getting listing data')
    } else {
      console.log('got the listings')
    }
  })
})

/* Get listings for nearby homes */
// app.get('/api/nearbyListings', (req, res) => {
//   const getData = ((callback) => {
//     Listings.find((err, listings) => {
//       if(err) {
//         console.log('error finding data')
//       } else {
//         res.send(listings)
//       }
//     })
//   })
//   getData((err, data) => {
//     if (err) {
//       console.log('error getting listing data')
//     } else {
//       console.log('got the listings')
//     }
//   })
// })

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

module.exports = app;