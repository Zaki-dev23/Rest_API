//first step
//  npm init
// npm install express mongoose dotenv

//create a folder config and in it file file.env
/* mkdir config
mv .env config */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');// Import the User model

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// middleware
app.use(express.json());


// routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


//create a folder models an in to it create a file User.js
/*mkdir models
touch models/User.js
*/

const User = require('./models/User');

// get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create a user
app.post('/users', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update a user by id
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
      },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete a user by id
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
