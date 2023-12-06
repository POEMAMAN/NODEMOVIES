require('./utils/db.js');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {connect} = require('./utils/db')

const Movies = require('./models/movies.models')
const Cinemas = require('./models/cinemas.models')

const cinemaRoutes = require('./routes/cinema.routes')
const moviesRoutes = require('./routes/movies.routes')
const userRoutes = require('./routes/user.routes');
const passport = require('passport');
const MongoStore = require('connect-mongo');
require('./authentication/passport');

connect();
const PORT = 3000;
const serverMovies = express();
const router = express.Router();

serverMovies.use(cors())
serverMovies.use(express.json());
serverMovies.use(express.urlencoded({ extended: false }));
serverMovies.use('/public', express.static('public'));
serverMovies.use(
  session({
    secret: 'upgradehub_node', // ¡Este secreto tendremos que cambiarlo en producción!
    resave: false, // Solo guardará la sesión si hay cambios en ella.
    saveUninitialized: false, // Lo usaremos como false debido a que gestionamos nuestra sesión con Passport
    cookie: {
      maxAge: 3600000 // Milisegundos de duración de nuestra cookie, en este caso será una hora.
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL
    })
  })
);
serverMovies.use(passport.initialize());
serverMovies.use(passport.session());
serverMovies.use('/movies', moviesRoutes);
serverMovies.use('/cinemas', cinemaRoutes);
serverMovies.use('/user', userRoutes);
serverMovies.use('/', router);

serverMovies.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || 'Error inesperado');
})

serverMovies.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
  });
  
serverMovies.use('*', (req, res, next) => {
  const error = new Error('Route not found'); 
  error.status = 404;
  next(error);
});