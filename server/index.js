const express = require('express')
const app = express()
const port = 3001
const path = require('path')
const bodyParser = require('body-parser')
const Listings = require('../database/Listings.js')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, '/../client/dist')))
app.get('/api/listings', (req, res) => {
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

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))