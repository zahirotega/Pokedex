
# Documentación de la API

Esta documentación detalla todas las rutas disponibles en la API, junto con sus parámetros y métodos HTTP correspondientes.

## Obtener Todos los Pokémon y Guardarlos en la Base de Datos

**Descripción:** Esta ruta obtiene todos los Pokémon de la PokeAPI y los guarda en la base de datos MongoDB.

- **Ruta:** `/pokemon/all`
- **Método HTTP:** GET
- **Parámetros:** Ninguno
- **Respuesta Exitosa:** 200 OK - Retorna un mensaje indicando que todos los Pokémon han sido guardados en la base de datos.
- **Respuesta de Error:** 500 Internal Server Error - Si ocurre algún error interno en el servidor.

## Borrar Todos los Pokémon de la Base de Datos

**Descripción:** Esta ruta borra todos los Pokémon almacenados en la base de datos.

- **Ruta:** `/pokemon/all`
- **Método HTTP:** DELETE
- **Parámetros:** Ninguno
- **Respuesta Exitosa:** 200 OK - Retorna un mensaje indicando que todos los Pokémon han sido eliminados de la base de datos.
- **Respuesta de Error:** 500 Internal Server Error - Si ocurre algún error interno en el servidor.

## Borrar un Pokémon Específico de la Base de Datos

**Descripción:** Esta ruta borra un Pokémon específico de la base de datos por su nombre.

- **Ruta:** `/pokemon/:name`
- **Método HTTP:** DELETE
- **Parámetros:** 
  - `name`: El nombre del Pokémon a borrar.
- **Respuesta Exitosa:** 200 OK - Retorna un mensaje indicando que el Pokémon ha sido eliminado de la base de datos.
- **Respuesta de Error:** 
  - 404 Not Found - Si el Pokémon no es encontrado en la base de datos.
  - 500 Internal Server Error - Si ocurre algún error interno en el servidor.

## Listar Pokémon Almacenados en la Base de Datos

**Descripción:** Esta ruta lista los Pokémon almacenados en la base de datos, con opciones de filtrado y ordenamiento.

- **Ruta:** `/pokemon/list`
- **Método HTTP:** GET
- **Parámetros Opcionales:**
  - `limit`: Limita el número de Pokémon a mostrar (por defecto 0).
  - `type`: Filtra los Pokémon por tipo.
  - `order`: Ordena los Pokémon por nombre en orden ascendente (`asc`) o descendente (`desc`).
  - `id`: Filtra un Pokémon por su ID.
- **Respuesta Exitosa:** 200 OK - Retorna una lista de Pokémon según los parámetros proporcionados en los encabezados de respuesta.
- **Respuesta de Error:** 500 Internal Server Error - Si ocurre algún error interno en el servidor.

## Obtener un Pokémon por su Nombre

**Descripción:** Esta ruta obtiene un Pokémon específico por su nombre.

- **Ruta:** `/pokemon/:name`
- **Método HTTP:** GET
- **Parámetros:**
  - `name`: El nombre del Pokémon a obtener.
- **Respuesta Exitosa:** 200 OK - Retorna los datos del Pokémon solicitado.
- **Respuesta de Error:** 404 Not Found - Si el Pokémon no es encontrado en la base de datos. 500 Internal Server Error - Si ocurre algún error interno en el servidor.

## Realizar Pruebas de Carga

**Descripción:** Esta ruta genera consultas aleatorias utilizando los IDs de los Pokémon almacenados en la base de datos.

- **Ruta:** `/test/load`
- **Método HTTP:** GET
- **Parámetros:** Ninguno
- **Respuesta Exitosa:** 200 OK - Retorna una lista de consultas generadas aleatoriamente.
- **Respuesta de Error:** 500 Internal Server Error - Si ocurre algún error interno en el servidor.

---
