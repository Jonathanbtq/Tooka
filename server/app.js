const express = require('express')
let user = require('./Models/User')
const cors = require ('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const sequelize = require('./db/db')
require('dotenv').config()

const app = express()
const port = process.env.port || 3500

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const User = user(sequelize, Sequelize)
app.use(express.json())

// Autoriser toutes les origines pour les débuts de développement, à ajuster en production
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/utilisateurs', (req, res) => {
    User.findAll()
        .then((utilisateurs) => res.json(utilisateurs))
        .catch((err) => res.json(err))
})