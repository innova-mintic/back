import express from 'express';
import cors from 'cors';
import {ApolloServer} from 'apollo-server-express';
import dotenv from 'dotenv';
import conectarBD from './db/db.js';
import {tipos} from './graphql/tipos.js'
import {resolvers } from './graphql/resolvers.js'
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

dotenv.config();

const server= new ApolloServer({
    typeDefs:tipos,
    resolvers:resolvers,
})

const app= express();

app.use(express.json());
app.use(cors());

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

app.get('/inicio', jwtCheck, (req, res) => {
  res.send('Secured Resource');
});

app.get('/usuarios/self' , jwtCheck, (req, res, next) => {
  console.log('alguien hizo get en la ruta /self');
  const token = req.headers.authorization.split('Bearer')[1];
  const user =  jwt_decode(token)['http://localhost/userData'];
  console.log(user);
  baseDeDatos.collection('usuario').findOne({email: user.email}, async (err, response) => {
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