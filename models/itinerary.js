module.exports = (sequelize, DataTypes) => {
    const itinerary = sequelize.define(
        'itinerary',
        {
            name: DataTypes.STRING,
        },
        { timestamps: true }
    )

    // create associate with itineraryItem
    itinerary.associate = (models) => {
        // associations can be defined here
        itinerary.hasMany(models.itineraryItem, { foreignKey: 'itineraryId' });
    }

    return itinerary;
}