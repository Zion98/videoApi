module.exports = (sequelize, Sequelize) => {
    const bookmarkedSeries = sequelize.define("bookmarkedseries", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "userid",
        },
      },
      seriesid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "series",
          key: "seriesid",
        },
      },
      created: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.fn("current_timestamp"),
      },
    });
    bookmarkedSeries.associate = function (models) {
        bookmarkedSeries.belongsTo(models.users, {
        as: "Users",
        foreignKey: "userid",
      });
      bookmarkedSeries.belongsTo(models.series, {
        as: "Series",
        foreignKey: "seriesid",
      });
    };
  
    return bookmarkedSeries;
  };
  