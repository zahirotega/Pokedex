
---

# Pokedex

Pokedex es una aplicación que te permite almacenar y acceder a información sobre diferentes Pokémon.

## Instrucciones para correr la aplicación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias utilizando el comando `npm install`.
3. Ejecuta la aplicación utilizando el comando `node api.js`.
4. La aplicación estará disponible en `http://localhost:3001`.

## Base de Datos

Pokedex utiliza MongoDB como base de datos. Cada ruta establece automáticamente la conexión con MongoDB Atlas, por lo que no es necesario modificar nada. La aplicación está configurada para que se pueda acceder desde cualquier dirección IP.

## Dependencias

Pokedex utiliza las siguientes dependencias:

- **Express**: Utilizado para el manejo de rutas y el servidor.
- **Axios**: Utilizado para realizar solicitudes HTTP.
- **MongoDB**: Utilizado para interactuar con la base de datos MongoDB.

Estas dependencias se seleccionaron por su eficacia y facilidad de uso en el desarrollo de la aplicación.

## Arquitectura y Patrones de Diseño

La aplicación sigue una arquitectura de servidor simple utilizando Express.js. Los patrones de diseño utilizados incluyen:

- **Patrón de Middleware**: Utilizado para el manejo de las solicitudes HTTP.
- **Patrón de Controlador**: Utilizado para manejar las operaciones CRUD en la base de datos.

Estos patrones se seleccionaron para mantener la aplicación organizada y fácil de mantener a medida que crece en complejidad.

## Seguridad

Pokedex implementa los siguientes controles de seguridad:

- **Validación de entrada**: Se verifica la validez de los datos recibidos en las solicitudes.
- **Autenticación y autorización**: Se pueden implementar estrategias de autenticación y autorización según sea necesario.

Estas medidas se implementaron para proteger la integridad de los datos y garantizar la seguridad de la aplicación.

## Documentación de la API

Puedes encontrar la documentación de la API en el archivo `API_Documentation.md`, que detalla todas las rutas disponibles y sus parámetros.

## Manejo de Errores

El código maneja de manera eficiente los posibles errores en las solicitudes a la API y en el procesamiento de la respuesta. Se utilizan códigos de estado HTTP adecuados para indicar el resultado de la operación.

## Pruebas

Pokedex cuenta con pruebas unitarias para verificar el funcionamiento de las funciones principales. Las pruebas están escritas utilizando Jest y puedes ejecutarlas con el comando `npm test`.

## Ejecutar Pruebas de Carga

Para realizar pruebas de carga, puedes utilizar la ruta `/test/load`. Asegúrate de tener la base de datos en ejecución y de que la aplicación esté disponible antes de ejecutar las pruebas.



---

