module.exports = (sequelize, Sequelize) => {
  const Movies = sequelize.define("movies", {
    moviesid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
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
    movie_img: {
      type: Sequelize.STRING(256),
      allowNull: true,
    },
    movie_link: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
    created: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.fn("current_timestamp"),
    },
  });
  Movies.associate = function (models) {
    Movies.belongsTo(models.bookmarkedmovies, {
      as: "bookmarkedMovies",
      foreignKey: "moviesid",
    });

    // Movies.belongsToMany(models.users, {
    //   through:models.bookmarkedmovies,
    // //   onUpdate: 'CASCADE',
    // //   onDelete: 'CASCADE'
    //   foreignKey: "moviesid",
    // // //   sourceKey: "id",
    //   as: 'movies'
    // });
  };
  return Movies;
};
