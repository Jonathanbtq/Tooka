module.exports = (Sequelize, DataTypes) => {
    Sequelize.define('Publication_like', {
        fk_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fk_publication: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        liked: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })
}