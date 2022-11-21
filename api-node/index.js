const express = require('express');
// const bodyParser = require('body-parser')

// Load datas
const users = require('./data/users.json');
const teams = require('./data/teams.json');
const matchs = require('./data/matchs.json');
const pronostics = require('./data/pronostics.json');

// Init node Server
const app = express();

// Init Middleware
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Api Method definition
app.get('/users', (req, res) => {
    res.status(200).json(users)
});

/**
 * User's routes
 */
app.put('/users/:id/habilitation', (req, res) => {
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

/**
 * Login's routes
 */
app.post('/login', (req, res) => {
    const loggedUser = users.find((user) => user.login === req.body.login && user.password === req.body.password);
    if (loggedUser) {
        res.status(200).json(users);
    } else {
        res.status(204).json();
    }
});

/**
 * Team's routes
 */
app.get('/teams', (req, res) => {
    res.status(200).json(teams)
});

app.post('/teams', (req, res) => {
    teams.push(req.body);
    res.status(200).json(req.body);
});

app.put('/teams', (req, res) => {
    const updatedTeamIndex = teams.findIndex((team) => team.id === req.body.id);
    if (updatedTeamIndex !== -1) {
        teams[updatedTeamIndex] = req.body;
        res.status(200).json(req.body);
    } else {
        res.status(204).json();
    }
});

app.delete('/teams/:id', (req, res) => {
    const deletedTeamIndex = teams.findIndex((team) => team.id === parseInt(req.params.id, 10));
    if (deletedTeamIndex !== -1) {
        teams.splice(deletedTeamIndex, 1);
        res.status(200).json();
    } else {
        res.status(204).json();
    }
});

/**
 * Match's routes
 */
app.get('/matchs', (req, res) => {
    res.status(200).json(matchs)
});

app.post('/matchs', (req, res) => {
    matchs.push(req.body);
    res.status(200).json(req.body);
});

app.put('/matchs', (req, res) => {
    const updatedMatchIndex = matchs.findIndex((match) => match.id === req.body.id);
    if (updatedMatchIndex !== -1) {
        matchs[updatedMatchIndex] = req.body;
        res.status(200).json(req.body);
    } else {
        res.status(204).json();
    }
});

app.delete('/matchs/:id', (req, res) => {
    const deletedMatchIndex = matchs.findIndex((match) => match.id === parseInt(req.params.id, 10));
    if (deletedMatchIndex !== -1) {
        matchs.splice(deletedMatchIndex, 1);
        res.status(200).json();
    } else {
        res.status(204).json();
    }
});

/**
 * Pronostic's routes
 */
app.get('/pronostics', (req, res) => {
    res.status(200).json(pronostics)
});

app.get('/pronostics/:userId', (req, res) => {
    let usersPronostics = pronostics.filter((prono) => prono.userId === parseInt(req.params.userId, 10));
    usersPronostics.map((prono) => {
        prono.match = matchs.find((match) => match.id === prono.matchId);
        if (prono.match) {
            prono.match.teamA = teams.find((team) => team.id === prono.match.teamAId);
            prono.match.teamB = teams.find((team) => team.id === prono.match.teamBId);
        }
    });
    res.status(200).json(usersPronostics)
});

app.post('/pronostics', (req, res) => {
    pronostics.push(req.body);
    res.status(200).json(req.body);
});

app.put('/pronostics', (req, res) => {
    const updatedPronosticIndex = pronostics.findIndex((pronostic) => pronostic.id === req.body.id);
    if (updatedPronosticIndex !== -1) {
        pronostics[updatedPronosticIndex] = req.body;
        res.status(200).json(req.body);
    } else {
        res.status(204).json();
    }
});

app.delete('/pronostics/:id', (req, res) => {
    const deletedPronosticIndex = pronostics.findIndex((pronostic) => pronostic.id === parseInt(req.params.id, 10));
    if (deletedPronosticIndex !== -1) {
        pronostics.splice(deletedPronosticIndex, 1);
        res.status(200).json();
    } else {
        res.status(204).json();
    }
});

// Launch server listening on port :8080
app.listen(8080, () => {  
    console.log("Server is listening")       
});
