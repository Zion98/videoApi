const replaceEnum = require("sequelize-replace-enum-postgres").default;

module.exports = (sequelize, Sequelize) => {
  const verifyemail = sequelize.define("verifyemail", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true,
    },
    userid: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "userid",
      },
      unique: true,
    },
    otp: {
      type: Sequelize.CHAR(6),
      allowNull: false,
    },
    expireat: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    isvalid: {
      type: Sequelize.BOOLEAN(),
      allowNull: false,
    },
    expiredat: {
      type: Sequelize.DATE(),
    },

    // isverified: {
    //   type: Sequelize.ENUM("verified", "unverified"),
    //   defaultValue: "unverified",
    // },
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

  verifyemail
    .sync({ alter: true })
    .then(() => console.log("Verify Email Table Sync complete"));

  return verifyemail;
};
