const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cinemasSchema = new Schema({
    cinemaName: {type: String, required:true},
    location: {type:String, required: true}
},{
    timestamps: true
}
);

const Cinemas = mongoose.model('cinemas',cinemasSchema);

module.exports = Cinemas;