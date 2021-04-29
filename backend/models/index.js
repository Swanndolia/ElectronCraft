const dbConfig = require("../config/db.config.js");
require("../middleware/secure-crypt.js")();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, secureCrypt(dbConfig.USER), secureCrypt(dbConfig.PASSWORD), {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    timezone: process.env.db_timezone
  },
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.js")(sequelize, Sequelize);
module.exports = db;