const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../config/sequelize_db");
const bcrypt = require("bcrypt");

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DataTypes = DataTypes;
db.bcrypt = bcrypt;

db.user = require("./user")(sequelize, DataTypes , bcrypt);
db.task = require("./task")(sequelize, DataTypes, Model, Sequelize);
module.exports = db;
