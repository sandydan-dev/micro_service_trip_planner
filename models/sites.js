module.exports = (sequelize, DataTypes) => {
    const site = sequelize.define(
        'site',
        {
            name: DataTypes.STRING,
            location: DataTypes.STRING,
            description: DataTypes.TEXT
        },
        { timestamps: true }
    );

    return site;
}