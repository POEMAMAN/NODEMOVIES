const express = require('express');
const router = express.Router();
const Movies = require('../models/movies.models');
const Cinemas = require('../models/cinemas.models');
const {isAuthenticated} = require('../middleware/auth.middleware');
const {upload} = require('../middleware/file.middleware');
const {uploadToCloudinary} = require('../middleware/file.middleware');


router.get('/movies', (req, res, next) => {
    return Movies.find()
    .then(movies => {
        return res.status(200).json(movies);
    })
    .catch(err => {
        next(err);
    });
});

router.get('/:id', [isAuthenticated],async (req, res, next) => {
	const id = req.params.id;
	try {
		const movie = await Movies.findById(id);
		if (movie) {
			return res.status(200).json(movie);
		} else {
			return res.status(404).json('No movie found by this id');
		}
	} catch (err) {
	    next(err);
	}
});

router.get('/year/:year', [isAuthenticated],async (req, res, next) => {
	const year = req.params.year;
	try {
		const movie = await Movies.find(year);
		if (movie) {
			return res.status(200).json(movie);
		} else {
			return res.status(404).json('No movie found by this year');
		}
	} catch (err) {
	    next(err);
	}
});

router.get('/director/:director', [isAuthenticated],async (req, res, next) => {
	const director = req.params.director;
	try {
		const movie = await Movies.find(director);
		if (movie) {
			return res.status(200).json(movie);
		} else {
			return res.status(404).json('No movie found by this director');
		}
	} catch (err) {
		next(err);
	}
});

router.get('/genre/:genre', [isAuthenticated],async (req, res, next) => {
	const {genre} = req.params;

	try {
		const movieByGenre = await Movies.find({ genre: genre });
		return res.status(200).json(movieByGenre);
	} catch (err) {
	    next(err);
	}
});



router.post('/create', [isAuthenticated],async (req, res, next) => {
    try {
        const newMovie = new Movies({
            movieName: req.body.name,
            director: req.body.director,
            year: req.body.year,
            genre: req.body.genre,
            movies: []
        });
        const createdMovie = await newMovie.save();
        return res.status(201).json(createdMovie);
    } catch (error) {
        next(error);
    }
});

router.put('/edit/:id', [isAuthenticated],async (req, res, next) => {
    try {
        const { id } = req.params //
        const moviesModify = new Character(req.body) //instanciamos un nuevo Character con la información del body
        characterModify._id = id //añadimos la propiedad _id al personaje creado
        const characterUpdated = await Character.findByIdAndUpdate(id , characterModify)
        return res.status(200).json(characterUpdated)//Este personaje que devolvemos es el anterior a su modificación
    } catch (error) {
        return next(error)
    }
});

router.put('/add-movies', [isAuthenticated],async (req, res, next) => {
    try {
        const { cinemaId } = req.body;
        const updatedCinema = await Cinemas.findByIdAndUpdate(
            cinemaId,
            { $push: { cinemas: cinemaId } },
            { new: true }
        );
        return res.status(200).json(updatedCinema);
    } catch (error) {
        return next(error);
    }
});

router.post('/',[isAuthenticated], upload.single('picture'), async (req, res, next) => {
    try {
        const moviePicture = req.file ? req.file.filename : null; //req.file.path
        console.log(req.body)
        const newMovie = new Movies({
            title: req.body.title,
            director: req.body.director,
            year: req.body.year,
            genre: req.body.genre,
            picture: moviePicture
        });
        const createdMovie = await newMovie.save();

        console.log(newMovie);
        res.status(201).json(createdMovie)
    }
    catch (err) {
        next(err)
    }
})
router.delete('/:id', [isAuthenticated], async(req, res, next) => {
    try {
        const id = req.params.id;
        const deletedMovie = await Movie.findByIdAndDelete(id);
        console.log(eletedMovie);
        if (eletedMovie) {
            res.status(200).json(deletedMovie);
        } else {
            let error = new Error('Movie no encontrada');
            error.status = 404;
            throw error;
        }
    }
    catch (err) {
        next(err)
    }
})
router.put('/:id', [isAuthenticated], async(req, res, next) => {
    try {
        const id = req.params.id;
        const movieModify = new Movies(req.body);
        movieModify._id = id;
        const movieUpdate = await Movies.findByIdAndUpdate(id, movieModify);
        if (!movieUpdate) {
            let error = new Error('Movie no encontrada');
            error.status = 404;
            throw error;
        } else {

            res.status(200).json(movieUpdate);
        }
    } 
    catch (err) {
        next(err)
    }
})

module.exports = router;







