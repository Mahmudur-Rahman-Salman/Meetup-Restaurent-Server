const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());


const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cf70q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const meetupMenuCollection = client.db("MeetupDB").collection("Menu"); 
    const meetupReviewsCollection = client.db("MeetupDB").collection("Reviews"); 

    app.get('/menu', async(req, res)=>{
      const result = await meetupMenuCollection.find().toArray(); 
      res.send(result); 
    })
    app.get('/reviews', async(req, res)=>{
      const result = await meetupReviewsCollection.find().toArray(); 
      res.send(result); 
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
  res.send("Meetup Server running ");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
