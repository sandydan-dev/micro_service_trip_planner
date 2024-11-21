module.exports = (sequelize, DataTypes) => {
    const itineraryItem = sequelize.define(
        'itineraryItem',
        {
            itineraryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'itinerary', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            itemId: {
                type: DataTypes.INTEGER,
            },
            type: {
                type: DataTypes.STRING, // 'Flight', 'Hotel', 'Site'
            }
        },
        { timestamps: true }
    );

    // association belongs to itinerary
    itineraryItem.associate = (models) => {
        itineraryItem.belongsTo(models.itinerary, { foreignKey: 'itineraryId' });
    }

    return itineraryItem;
}