import Express from 'express';
import Cors from 'cors';
import {ApolloServer} from 'apollo-server-express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import {conectarBD} from './db/db.js';
import {tipos} from './graphql/tipos.js'
import {resolvers } from './graphql/resolvers.js'
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import jwt_decode from 'jwt-decode';

dotenv.config();

const server= new ApolloServer({
    typeDefs:tipos,
    resolvers:resolvers,
})

const app= Express();

app.use(Express.json());
app.use(Cors());

const client = new MongoClient(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://innova-mintic.us.auth0.com/.well-known/jwks.json'
}),
audience: 'innova-mintic-api',
issuer: 'https://innova-mintic.us.auth0.com/',
algorithms: ['RS256']
});

let baseDeDatos;

client.connect((err, db) => {
  if (err) {
    console.error('Error conectando a la base de datos');
    return 'error';
  }
  baseDeDatos = db.db('myFirstDatabase');
  console.log('baseDeDatos exitosa');
  });

app.get('/inicio', jwtCheck, (req, res) => {
  res.send('Secured Resource');
});

app.get('/usuarios/self' , jwtCheck, (req, res, next) => {
  console.log('alguien hizo get en la ruta /self');
  const token = req.headers.authorization.split('Bearer')[1];
  const user =  jwt_decode(token)['http://localhost/userData'];
  console.log(user.email);
  const emailUser = user.email;
  const col = baseDeDatos.collection('usuarios');
  col.findOne({correo: emailUser}, async (err, response) => {
    if(response){
      console.log('response consulta base de datos', response);
      res.json(response);
    }
    else{
      next();
    }
  })
});


app.listen({port:process.env.PORT || 4000},async()=>{
    await conectarBD();
    await server.start();

    server.applyMiddleware({ app });
    console.log("servidor listo")
})