require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());//express ne peut pas lire les corps de requête par défaut donc on utilise un middleware express intégré express.json()

const port = 5000;

const welcome = (req, res) => {
  res.send('Welcome to my favorite movie list');
};





app.get('/', welcome);

const movieHandlers = require('./movieHandlers');
const { validateMovie } = require('./validators');


app.get('/api/movies', movieHandlers.getMovies);
app.get('/api/movies/:id', movieHandlers.getMovieById);
app.post('/api/movies',validateMovie, movieHandlers.postMovie);
app.put('/api/movies/:id',validateMovie, movieHandlers.updateMovie);
app.delete('/api/movies/:id', movieHandlers.deleteMovie);


const userHandlers = require('./userHandlers');
const { validateUser } = require('./validators');

app.get('/api/users', userHandlers.getUsers);
app.get('/api/users/:id', userHandlers.getUsersById);
app.post('/api/users',validateUser, userHandlers.postUser);
app.put('/api/users/:id',validateUser, userHandlers.updateUser);
app.delete('/api/users/:id', userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened');
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
