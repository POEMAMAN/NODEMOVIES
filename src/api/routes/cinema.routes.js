const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Cinemas = require('../models/cinemas.models');
const {isAuthenticated} = require('../middleware/auth.middleware');


router.get('/cinemas', [isAuthenticated],async (req, res, next) => {
    return Cinemas.find()
    .then(cinemas => {
        return res.status(200).json(cinemas);
    })
    .catch(err => {
        next(err);
    });
});

router.get('/cinemas/:id', [isAuthenticated],async (req, res, next) => {
	const id = req.params.id;
	try {
		const cinema = await Cinemas.findById(id);
		if (cinema) {
			return res.status(200).json(cinema);
		} else {
			return res.status(404).json('No cinema found by this id');
		}
	} catch (err) {
		next(err);
	}
});

router.post('/create', [isAuthenticated],async (req, res, next) => {
    try {
        const newCinema = new Cinemas({
            cinemaName: req.body.name,
            location: req.body.location,
            cinemas: []
        });
        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema);
    } catch (err) {
        next(err);
    }
});

router.put('/add-movie', [isAuthenticated], async (req, res, next) => {
    try {
        const cinemaId = req.body.cinemaId;
        const movieId = req.body.movieId;
        const updatedCinema = await Cinemas.findByIdAndUpdate(cinemaId, {
            $push: { movies: movieId}
        })
        return res.status(200).json("Se ha enviado correctamente")
    }
    catch (err) {
        next(err)
    }
})

module.exports = router;