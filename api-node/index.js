const express = require('express');
// const bodyParser = require('body-parser')

// Load datas
const users = require('./data/users.json');

// Init node Server
const app = express();

// Init Middleware
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Api Method definition
app.get('/users', (req,res) => {
    res.status(200).json(users)
});
app.put('/users/:id/habilitation', (req,res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(userElement => userElement.id === id);
    if (userIndex !== -1) {
        users[userIndex].habilitation = req.body.habilitation;
    }
    res.status(200).json(users)
});
app.post('/user', (req, res) => {
    users.push(req.body);
    res.status(200).json(users);
});
app.post('/login', (req, res) => {
    users.push(req.body);
    res.status(200).json(users);
});

// Launch server listening on port :8080
app.listen(8080, () => {  
    console.log("Server is listening")       
});



/*
const express = require('express')
const app = express()
const parkings = require('./parkings.json')
// Middlewareapp.use(express.json())
app.get('/parkings', (req,res) => {    res.status(200).json(parkings)})
app.get('/parkings/:id', (req,res) => {    const id = parseInt(req.params.id)    const parking = parkings.find(parking => parking.id === id)    res.status(200).json(parking)})
app.post('/parkings', (req,res) => {    parkings.push(req.body)    res.status(200).json(parkings)})
app.listen(8080, () => {    console.log("Serveur à l'écoute")})
*/