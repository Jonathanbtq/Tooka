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
        
    })
    
    Publication.associate = (models) => {
        Publication.belongsTo(models.User, { foreignKey: 'fk_author', as: 'author' });
    };

    return Publication
}