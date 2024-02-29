module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birth_day: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        certified: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profile_img: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    })

    User.associate = (models) => {
        User.hasMany(models.Publication, { foreignKey: 'fk_author', as: 'publications' });
    };

    return User
}