const mongoose = require('mongoose');


const cinemas = [
{}
  ];

const Cinemas = require('../models/cinemas')

const cinemasDocuments = cinemas.map(cinemas => new Cinemas(cinemas))

console.log(cinemasDocuments)

// 1. Buscar si hay peliculas creados, si los hay los borramos.
// 2. Insertar las peliculas
// 3. Controlamos Errores.
// 4. Nos desconectamos.

mongoose.connect('mongodb+srv://poemaman:D497905224DAFAB34A5A8DC02C26ECBC@upgrade-hub.llxzuwb.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
  // Utilizando Cinema.find() obtendremos un array con todos los cinemas
   console.log('Conectado a mongoDB ATlas');
   const allCinemas = await Cinemas.find();
   // Si existen cinemas previamente, dropearemos la colección
    if (allCinemas.length) {
        await Cinemas.collection.drop(); //La función drop borra la colección
    }
})
.catch(err => console.log('Error al borrar los cinemas', err))
.then(async () => {
  		// Una vez vaciada la db de los cinemas, usaremos el array cinemasDocuments
		// para llenar nuestra base de datos con todas los cinemas.
    await Cinemas.insertMany(cinemasDocuments);
})
.catch((err) => console.log('Error creating Data',err))
.finally(() => 
	// Por último nos desconectaremos de la DB.
    mongoose
        .disconnect()
        .then(() => console.log('Desconectado de forma amistosa'))
);