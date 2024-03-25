module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('Friends', {
        fk_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fk_friend: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })
}