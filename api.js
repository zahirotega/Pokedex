// Importar Express
const express = require('express');
// Importar axios para realizar solicitudes HTTP
const axios = require('axios');
// Importar MongoClient para interactuar con MongoDB
const { MongoClient } = require('mongodb');

// Crear una instancia de la aplicación Express
const app = express();
// Configurar el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3001; // Puerto 3000 por defecto

// Ruta para obtener todos los Pokémon y guardarlos en MongoDB
app.get('/pokemon/all', async (req, res) => {
    let client;

    try {
        // Realizar la solicitud GET a la API de PokeAPI para obtener todos los Pokémon
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        const allPokemonData = response.data.results;

        // Conexión a MongoDB Atlas
        const uri = "mongodb+srv://zahircontacto:vnBnP4zab1khcsKe@cluster0.dtrgppr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        client = new MongoClient(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

        // Conectar a la base de datos
        await client.connect();
        const db = client.db();
        const collection = db.collection('pokemons');

        // Iterar sobre cada Pokémon y guardar solo las primeras 4 habilidades en MongoDB
        for (let pokemon of allPokemonData) {
            const pokemonName = pokemon.name;
            const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const pokemonData = pokemonResponse.data;
            pokemonData.moves = pokemonData.moves.slice(0, 4); // Obtener solo las primeras 4 habilidades
            await collection.insertOne(pokemonData);
            console.log(`Se ha insertado el Pokémon ${pokemonName} en la base de datos`);
        }

        res.send('Todos los Pokémon han sido guardados en la base de datos');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    } finally {
        // Cerrar la conexión con la base de datos al finalizar
        if (client) {
            await client.close();
        }
    }
});

// Ruta para borrar todos los Pokémon de la base de datos
app.delete('/pokemon/all', async (req, res) => {
    let client;

    try {
        // Conexión a MongoDB Atlas
        const uri = "mongodb+srv://zahircontacto:vnBnP4zab1khcsKe@cluster0.dtrgppr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        client = new MongoClient(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

        // Conectar a la base de datos
        await client.connect();
        const db = client.db();
        const collection = db.collection('pokemons');

        // Borrar todos los documentos de la colección de pokemons
        const deleteResult = await collection.deleteMany({});
        console.log(`Se han eliminado ${deleteResult.deletedCount} Pokémon de la base de datos`);

        res.send('Todos los Pokémon han sido eliminados de la base de datos');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    } finally {
        // Cerrar la conexión con la base de datos al finalizar
        if (client) {
            await client.close();
        }
    }
});

// Ruta para borrar un Pokémon específico de la base de datos
app.delete('/pokemon/:name', async (req, res) => {
    let client;

    try {
        const pokemonName = req.params.name;

        // Conexión a MongoDB Atlas
        const uri = "mongodb+srv://zahircontacto:vnBnP4zab1khcsKe@cluster0.dtrgppr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        client = new MongoClient(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

        // Conectar a la base de datos
        await client.connect();
        const db = client.db();
        const collection = db.collection('pokemons');

        // Borrar el Pokémon de la base de datos según su nombre
        const deleteResult = await collection.deleteOne({ name: pokemonName });
        console.log(`Se ha eliminado el Pokémon ${pokemonName} de la base de datos`);

        if (deleteResult.deletedCount === 0) {
            res.status(404).send('El Pokémon no fue encontrado en la base de datos');
        } else {
            res.send(`El Pokémon ${pokemonName} ha sido eliminado de la base de datos`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    } finally {
        // Cerrar la conexión con la base de datos al finalizar
        if (client) {
            await client.close();
        }
    }
});

// Ruta para borrar un Pokémon específico de la base de datos por su ID
app.delete('/pokemon/id/:id', async (req, res) => {
    let client;

    try {
        const pokemonId = req.params.id;

        // Conexión a MongoDB Atlas
        const uri = "mongodb+srv://zahircontacto:vnBnP4zab1khcsKe@cluster0.dtrgppr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        client = new MongoClient(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

        // Conectar a la base de datos
        await client.connect();
        const db = client.db();
        const collection = db.collection('pokemons');

        // Borrar el Pokémon de la base de datos según su ID
        const deleteResult = await collection.deleteOne({ _id: new ObjectId(pokemonId) });
        console.log(`Se ha eliminado el Pokémon con ID ${pokemonId} de la base de datos`);

        if (deleteResult.deletedCount === 0) {
            res.status(404).send('El Pokémon no fue encontrado en la base de datos');
        } else {
            res.send(`El Pokémon con ID ${pokemonId} ha sido eliminado de la base de datos`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    } finally {
        // Cerrar la conexión con la base de datos al finalizar
        if (client) {
            await client.close();
        }
    }
});


// Ruta para listar los Pokémon almacenados en la base de datos
app.get('/pokemon/list', async (req, res) => {
    let client; // Declarar la variable client en un ámbito más amplio

    try {
        // Obtener parámetros de la solicitud
        const limit = parseInt(req.query.limit) || 0;
        const typeName = req.query.type || '';
        const order = req.query.order || '';
        const id = req.query.id || '';

        // Conexión a MongoDB Atlas
        const uri = "mongodb+srv://zahircontacto:vnBnP4zab1khcsKe@cluster0.dtrgppr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        client = new MongoClient(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

        // Conectar a la base de datos
        await client.connect();
        const db = client.db();
        const collection = db.collection('pokemons');

        // Construir la consulta de búsqueda
        const query = {};
        if (typeName) {
            query['types.type.name'] = typeName;
        }
        if (id) {
            query._id = id;
        }

        // Ordenar los resultados si se proporciona el parámetro de orden
        const sort = {};
        if (order === 'asc') {
            sort.name = 1;
        } else if (order === 'desc') {
            sort.name = -1;
        }

        // Ejecutar la consulta de búsqueda
        let pokemons = await collection.find(query, { projection: { _id: 1, name: 1, moves: { $slice: 4 }, types: 1 } }).limit(limit).sort(sort).toArray();

        // Obtener el número total de pokemones en la base de datos
        const totalPokemons = await collection.countDocuments(query);

        // Calcular el número de pokemones que no se obtuvieron debido al límite
        const skippedPokemons = Math.max(totalPokemons - pokemons.length, 0);

        // Configurar los encabezados de respuesta
        res.set('X-Total-Count', totalPokemons.toString());
        res.set('X-Skipped-Pokemons', skippedPokemons.toString());

        // Responder con los resultados
        res.send(pokemons);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    } finally {
        // Cerrar la conexión con la base de datos al finalizar
        if (client) {
            await client.close();
        }
    }
});


// Ruta para obtener un Pokémon por nombre
app.get('/pokemon/:name', async (req, res) => {
    let client;

    try {
        // Obtener parámetros de la solicitud
        const pokemonName = req.params.name;
        
        // Conexión a MongoDB Atlas
        const uri = "mongodb+srv://zahircontacto:vnBnP4zab1khcsKe@cluster0.dtrgppr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        client = new MongoClient(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

        // Conectar a la base de datos
        await client.connect();
        const db = client.db();
        const collection = db.collection('pokemons');

        // Construir la consulta de búsqueda por nombre
        const query = { name: pokemonName };

        // Ejecutar la consulta de búsqueda
        const pokemon = await collection.findOne(query, { projection: { _id: 1, name: 1, moves: { $slice: 4 }, types: 1 } });

        if (!pokemon) {
            return res.status(404).send('Pokémon no encontrado');
        }

        // Responder con el resultado
        res.send(pokemon);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    } finally {
        // Cerrar la conexión con la base de datos al finalizar
        if (client) {
            await client.close();
        }
    }
});

// Ruta para realizar pruebas de carga
app.get('/test/load', async (req, res) => {
    try {
        const PORT = process.env.PORT || 3001;

        // Conexión a MongoDB Atlas
        const uri = "mongodb+srv://zahircontacto:vnBnP4zab1khcsKe@cluster0.dtrgppr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        const client = new MongoClient(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

        // Conectar a la base de datos
        await client.connect();
        const db = client.db();
        const collection = db.collection('pokemons');

        // Obtener una lista de 200 pokemones
        const pokemons = await collection.aggregate([{ $sample: { size: 200 } }]).toArray();
        
        // Generar consultas aleatorias utilizando los IDs de los pokemones obtenidos
        const queries = [];
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * pokemons.length);
            const randomPokemonId = pokemons[randomIndex]._id; // ID de Pokémon aleatorio de la lista obtenida
            queries.push(`http://localhost:${PORT}/pokemon/id/${randomPokemonId}`);
        }

        res.send(queries);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    } finally {
        // Cerrar la conexión con la base de datos al finalizar
        if (client) {
            await client.close();
        }
    }
});

// Ruta para realizar pruebas unitarias con nombres aleatorios de Pokémon
app.get('/test/unit', async (req, res) => {
    try {
        const pokemonNames = ['bulbasaur', 'charmander', 'squirtle', 'pikachu']; // Nombres de Pokémon de ejemplo
        const randomPokemonName = pokemonNames[Math.floor(Math.random() * pokemonNames.length)];

        // Realizar la solicitud GET a la ruta correspondiente
        const response = await axios.get(`http://localhost:${PORT}/pokemon/${randomPokemonName}`);

        // Verificar si la respuesta fue exitosa
        if (response.status === 200) {
            res.send('Prueba unitaria exitosa');
        } else {
            res.status(500).send('Prueba unitaria fallida');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

// Iniciar el servidor Express
app.listen(PORT, () => {
    console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
