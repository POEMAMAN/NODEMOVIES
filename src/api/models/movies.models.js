const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    title: {type: String, required:true},
    director: {type:String, required: true},
    year: {type: Number, required:true},
    genre: {type:String, required: true},
},{
    timestamps: true
}
);

const Movie = mongoose.model('Movie',moviesSchema);

module.exports = Movie;