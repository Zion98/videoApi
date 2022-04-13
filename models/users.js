module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    userid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    firstname: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    email: {
      type: Sequelize.STRING(225),
      allowNull: false,
      unique: true,
    },

    password: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    created: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.fn("current_timestamp"),
    },
    modified: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.fn("current_timestamp"),
    },
  });

  User.associate = function (models) {

    User.belongsTo(models.bookmarkedmovies, { as: "Users", foreignKey: "userid" });

    // User.belongsToMany(models.movies, {
    //   through: models.bookmarkedmovies,
    // //   onUpdate: 'CASCADE',
    // //   onDelete: 'CASCADE'
    // //   foreignKey: "userId",
    // //   sourceKey: "userid",
    //     // as: 'user1'
    // });
  };

  return User;
};
