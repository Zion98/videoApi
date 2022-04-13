module.exports = (sequelize, Sequelize) => {
  const bookmarkedMovies = sequelize.define("bookmarkedmovies", {
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
    moviesid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "movies",
        key: "moviesid",
      },
    },
    created: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.fn("current_timestamp"),
    },
  });
  // bookmarkedMovies.associate = function (models) {
  //   // bookmarkedMovies.belongsTo(models.users, {
  //   //   as: "Users",
  //   //   foreignKey: "userid",
  //   // });
  //   // bookmarkedMovies.belongsTo(models.movies, {
  //   //   as: "Movies",
  //   //   foreignKey: "moviesid",
  //   // });
  // };

  return bookmarkedMovies;
};
