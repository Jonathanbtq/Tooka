const express = require('express')
let user = require('./Models/Users')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const sequelize = require('./db/db')
const publication = require('./Models/Publications')
const publicationLike = require('./Models/PublicationLikes')
const publicationCommentaire = require('./Models/PublicationCommentaires')
const publicationTag = require('./Models/PublicationTags')
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
const Publication = publication(sequelize, Sequelize)
const PublicationLike = publicationLike(sequelize, Sequelize)
const PublicationCommentaire = publicationCommentaire(sequelize, Sequelize)
const PublicationTag = publicationTag(sequelize, Sequelize)

/**
 * Sécurité et login
 */
app.post('/login', (req, res) => {
    let login = req.body.email
    let password = req.body.password
    User.findOne({
        where:{
            [Sequelize.Op.or]: [
                {email: login},
                {username: login}
            ],
            password: password
            }
        })
        .then((user) => {
            if (user) {
                res.status(200).json({message: 'Connexion réussi', user: user})
            } else {
                res.status(401).json({error: 'Indentifiant invalides'})
            }
        })
        .catch((error) => {
            console.error('Erreur lors de la recherche de l\'utilisateur')
            res.status(500).json({error: 'Erreur serveur lors de la connexion'})
        })
})

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

app.get('/user/:id', (req, res) => {
    const id = req.params.id
    User.findOne({
        where:{ id: id }
        })
        .then((user) => res.json(user))
        .catch((err) => res.json(err))
})

app.post('/addutilisateurs', async (req, res) => {
    try {
        const user = req.body.user
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
            updatedAt: null
        })
        res.json({user: newUser})
    } catch(error) {
        console.error('Erreur lors de l\'ajout de la tâche :', error);
        res.status(500).json({ error: 'Erreur serveur lors de l\'ajout de la tâche' });
    }
})

/**
 * Publication
 */
app.post('/publicationcreate', (req, res) => {
    try {
        const publication = req.body
        if (publication === null) {
            return
        }
        const newPublication = Publication.create({
            ...publication,
            fk_author: 4,
            createdAt: new Date(),
            updatedAt: null
        })
        res.json({publication: newPublication})
    } catch(err) {
        console.error(err)
        res.status(500).json({error: 'Une erreur est survenue lors de la création de la publication'})
    }
})

app.get('/publicationget', async (req, res) => {
    try {
        const publications = await Publication.findAll({
            limit: 50,
        //     include: [{
        //         model: User,
        //         as: 'author'
        //     }]
        // });

        // const publicationsWithAuthors = await Promise.all(publications.map(async publication => {
        //     const author = await publication.getAuthor(); // Utilisez la méthode générée par Sequelize

        //     return {
        //         ...publications.toJSON(),
        //         author: author.username // Accédez au nom d'utilisateur de l'auteur
        //     };
        // }));
        })
        res.json(publications);
    } catch(err) {
        console.error('Erreur lors de la récupération des publications :', err);
        res.status(500).json({ message: 'Erreur lors de la récupération des publications.' });
    }
});

// Synchronisez le modèle avec la base de données
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Le serveur est lancé sur le port http://localhost:${port}`)
    })
});