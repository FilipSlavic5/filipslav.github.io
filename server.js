// server.js
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.get('/', (req, res) => {
  res.send('Dobrodošli na FitBuddy backend!');
});
app.get('/users', (req, res) => {
  // Logika za dohvat korisnika
});

app.listen(5000, () => {
  console.log('Server je pokrenut na portu 5000');
});
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB Atlas using mongoose
mongoose.connect('mongodb+srv://fslavic:nutelica12345@cluster1.jpv09z7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));
