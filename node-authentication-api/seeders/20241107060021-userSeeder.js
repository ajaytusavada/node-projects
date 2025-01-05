"use strict";
var db = require("../models");
var User = db.user;

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    return await User.bulkCreate([
      {
        first_name: "Example",
        last_name: "example",
        email: "example@example.com",
        user_email_verified: 1,
        password: "Example@123",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return User.destroy({
      where: {
        email: "example@example.com",
      },
    });
  },
};
