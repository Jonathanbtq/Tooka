const express = require('express')
let user = require('./Models/User')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const sequelize = require('./db/db')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3500

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.json())
app.use(cors({
    origin: "http://127.0.0.1:5173"
}))
// Pour origin vérifier l'url du serveur react

const User = user(sequelize, Sequelize)

app.get('/accueil', (req, res) => {
    res.send({
        msg: 'Bienvenue'
    })
})

app.get('/utilisateurs', (req, res) => {
    User.findAll()
        .then((utilisateurs) => res.json(utilisateurs))
        .catch((err) => res.json(err))
})

app.post('addUtilisateurs', async (req, res) => {
    try {
        const user = req.body.user

        if (user == null) {
            return res.status(400).json({ error: 'La propriété user est requise et ne peut pas être nulle.' });
        }
        const newUser = await User.create({
            ...user
        })
    } catch(error) {

    }
})

// Synchronisez le modèle avec la base de données
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Le serveur est lancé sur le port http://localhost:${port}`)
    })
});