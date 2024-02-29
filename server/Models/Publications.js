module.exports = (Sequelize, DataTypes) => {
    const Publication = Sequelize.define('Publications', {
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
            references: {
                model: 'User',
                key: 'id'
            }
        }
    }, {
        tableName: 'publications'
    })
    
    Publication.associate = (models) => {
        Publication.belongsTo(models.Users, { foreignKey: 'fk_author', as: 'author' })
    }

    return Publication
}