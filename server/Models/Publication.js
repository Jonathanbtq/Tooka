module.exports = (Sequelize, DataTypes) => {
    const Publication = Sequelize.define('Publication', {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fk_author: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })
    
    Publication.associate = (models) => {
        Publication.belongsTo(models.User, { foreignKey: 'fk_author', as: 'author' })
    }

    return Publication
}