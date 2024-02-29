module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('Publication_commentaire', {
        fk_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fk_publication: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        commentaire_text: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}