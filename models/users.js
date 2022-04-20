module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    userid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    image_url: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },

    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    isverified: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "unverified",
      validate: {
        customValidator: (value) => {
          const enums = ["verified", "unverified"];
          if (!enums.includes(value)) {
            throw new Error("not a valid option");
          }
        },
      },
    },

    created: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    modified: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  });

  User.sync({ alter: true }).then(() =>
    console.log("Users's Table Sync complete")
  );


  // User.hasMany(Post, {foreignKey: 'user_id'})

  return User;
};
