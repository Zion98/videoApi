module.exports = (sequelize, Sequelize) => {
  const Series = sequelize.define("series", {
    seriesID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
    year: {
      type: Sequelize.STRING(6),
      allowNull: false,
    },
    series_img: {
      type: Sequelize.STRING(256),
      allowNull: true,
    },
    series_link: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
    created: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.fn("curdate"),
    },
  });

  Series.associate = function (models) {
    Series.belongsTo(models.bookmarkedseries, {
      as: "bookmarkedSeries",
      foreignKey: "seriesid",
    });
  };

  return Series;
};
