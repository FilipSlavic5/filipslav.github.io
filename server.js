const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Dodajte import za cors

const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Omogućite CORS za sve origin-e
app.use(cors());

// Definiranje osnovne rute za prikaz poruke dobrodošlice
app.get('/', (req, res) => {
  res.send('Dobrodošli na FitBuddy backend!');
});

// Povezivanje s MongoDB Atlas bazom
mongoose.connect('mongodb+srv://fslavic:nutelica12345@cluster1.jpv09z7.mongodb.net/myDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas');

  // Definiranje rute za registraciju korisnika
  app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    try {
      // Stvaranje novog dokumenta korisnika
      const newUser = new User({ username, password, email });

      // Spremanje korisnika u bazu
      const savedUser = await newUser.save();

      res.status(201).json(savedUser); // Vraćanje spremljenog korisnika kao odgovor
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  });

  // Pokretanje servera nakon uspješnog spajanja na MongoDB
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Definirajte rutu za pretragu korisnika
app.post('/api/users', async (req, res) => {
  const { location, interests, availability } = req.body;

  try {
    const users = await User.find({
      location: { $regex: new RegExp(location, 'i') },
      interests: { $regex: new RegExp(interests, 'i') },
      availability: { $regex: new RegExp(availability, 'i') },
    });

    if (!users || users.length === 0) {
      // Ako nema korisnika, vraćamo prazan niz kao odgovor
      res.status(200).json([]);
    } else {
      // Ako ima korisnika, vraćamo ih kao JSON odgovor
      res.status(200).json(users);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

