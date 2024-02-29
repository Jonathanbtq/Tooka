module.exports = (Sequelize, DataTypes) => {
    Sequelize.define('Publication_tag', {
        fk_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fk_publication: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}