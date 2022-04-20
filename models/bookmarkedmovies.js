module.exports = (sequelize, Sequelize) => {
  const bookmarkedMovies = sequelize.define("bookmarkedmovies", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userid: {
      type: Sequelize.UUID,
      references: {
        model: "users",
        key: "userid",
      },
    },
    moviesid: {
      type: Sequelize.UUID,
      references: {
        
        model: "movies",
        key: "moviesid",
      },
    },
    created: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  });


  bookmarkedMovies.associate = function (models) {
    bookmarkedMovies.belongsTo(models.movies, {
      foreignKey: "moviesid",
      constraints: false
    });

  }
  bookmarkedMovies
    .sync({ alter: true })
    .then(() => console.log("Bookmarked Movies's Table Sync complete"));

  return bookmarkedMovies;
};
