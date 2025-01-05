const {DataTypes ,Model }  = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

const db = {};
db.sequelize = sequelize;
db.DataTypes = DataTypes;

db.user = require("./user")(sequelize, DataTypes, bcrypt);
db.employee = require("./employee")(sequelize, DataTypes ,Model);

// db.sequelize.sync({ force: true });

module.exports = db;