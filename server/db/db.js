const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    'tooka',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

sequelize.authenticate()
    .then(_=> console.log('La connexion'))
    .catch(error => console.error(`Impossible d'établir uine connexion avec ${error}`))

sequelize.sync()
    .then(_=> console.log('La base de données a bien été synchornisée'))

module.exports = sequelize