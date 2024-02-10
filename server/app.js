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

app.post('/addutilisateurs', async (req, res) => {
    try {
        const user = req.body.user
        console.log(user)
        if (user == null) {
            return res.status(400).json({ error: 'La propriété user est requise et ne peut pas être nulle.' });
        }

        const existingUser = await User.findOne({ where: { email: user.email}})
        if (existingUser){
            return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
        }

        const newUser = await User.create({
            ...user,
            certified: false,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        res.json({user: newUser})
    } catch(error) {
        console.error('Erreur lors de l\'ajout de la tâche :', error);
        res.status(500).json({ error: 'Erreur serveur lors de l\'ajout de la tâche' });
    }
})

// Synchronisez le modèle avec la base de données
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Le serveur est lancé sur le port http://localhost:${port}`)
    })
});