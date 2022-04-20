module.exports = (sequelize, Sequelize) => {
  const Movies = sequelize.define("movies", {
    moviesid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    year: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    movie_img: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    movie_link: {
      type: Sequelize.STRING,
      allowNull: true,
      unique:true
    },
    created: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  });

  Movies.sync({ alter: true }).then(
    () => console.log("Movies's Table Sync complete")
  );

  Movies.associate = function (models) {
    Movies.hasMany(models.bookmarkedmovies, {
      as: "bookmarkedMovies",
      foreignKey: "moviesid",
      constraints: false
    });

  }

    
  return Movies;
};
