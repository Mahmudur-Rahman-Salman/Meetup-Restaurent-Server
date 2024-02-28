const express = require('express')
const app = express()
const cors = require("cors"); 
require('dotenv').config()
const port = process.env.PORT || 5000; 


// middlewares 
app.use(express.json()); 
app.use(cors()); 

app.get('/', (req, res) => {
  res.send('Meetup Server running ')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})