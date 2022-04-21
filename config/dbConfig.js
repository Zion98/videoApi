const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  // process.env.DB,
  // process.env.DB_NAME,
  // process.env.DB_PASSWORD,
  process.env.DATABASE_URL,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    port: process.env.DB_PORT,
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  }
);

module.exports = sequelize;
