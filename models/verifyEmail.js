module.exports = (sequelize, Sequelize) => {
  const verifyemail = sequelize.define("verifyemail", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      autoIncrement: true,
    },
    userid: {
      type: Sequelize.CHAR(9),
      allowNull: false,
      references: {
        model: "users",
        key: "userId",
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
    isverified: {
      type: Sequelize.ENUM("verified", "unverified"),
      allowNull: false,
      defaultValue: "unverified",
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
  return verifyemail;
};
