const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');

// Definir el esquema GraphQL
const schema = buildSchema(`
  type Query {
    movies: [Movie]
    movie(title: String!): Movie
  }

  type Movie {
    title: String
    director: String
    year: Int
  }
`);

// Cargar datos de db.json
const loadData = () => {
  const data = fs.readFileSync('db.json', 'utf8');
  return JSON.parse(data).movies;
};

// Definir los resolvers
const root = {
  movies: () => {
    return loadData();
  },
  movie: ({ title }) => {
    const movies = loadData();
    return movies.find(movie => movie.title === title);
  },
};

const app = express();

// Configurar la ruta de GraphQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// Servir archivos estáticos (para la interfaz)
app.use(express.static('public'));

app.listen(4000, () => {
  console.log('Servidor GraphQL ejecutándose en http://localhost:4000');
});
