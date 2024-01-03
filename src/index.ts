import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const app = express();
// Use the cors middleware to enable cross-origin resource sharing
// Set the credentials option to true to allow cookies to be sent
app.use(cors({
    credentials: true,
}));
// Use the compression middleware to compress the response data
app.use(compression());
// Use the cookie-parser middleware to parse the cookies from the request
app.use(cookieParser());
// Use the body-parser middleware to parse the JSON data from the request
app.use(bodyParser.json());
// Create a server object using the http module and the app object
const server = http.createServer(app)

server.listen(8080, () => {
    console.log( 'listening on http://localhost:8080' );
})

const MONGO_URL = 'mongodb+srv://liveclass:Pavan%408096@cluster1.chs19ed.mongodb.net/code-restapi';
// Set the mongoose promise library to the native Promise object
// This is optional, but it helps to avoid deprecation warnings
mongoose.Promise = Promise;
//Connect to the MongoDB database using the connection string
// It returns a promise that resolves to a mongoose connection object
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));
// Use the router middleware to handle the routes for the API
// The router module defines the endpoints, methods, and controllers for each resource
app.use('/' ,router)