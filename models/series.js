module.exports = (sequelize, Sequelize) => {
  const Series = sequelize.define("series", {
    series_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    year: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    series_img: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    series_link: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },
    created: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  });

  Series.sync({ alter: true }).then(() =>
    console.log("----------Series's Table Sync complete-------------------")
  );

  Series.associate = function (models) {
    Series.belongsTo(models.bookmarkedseries, {
      as: "bookmarkedSeries",
      foreignKey: "series_id",
      constraints: false
    });
  };

  return Series;
};
