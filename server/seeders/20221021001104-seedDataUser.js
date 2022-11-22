'use strict';

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../db.json');
    data.users.forEach(x => {
      delete x.id
      x.createdAt = new Date()
      x.updatedAt = new Date()
      x.password = hashPassword(x.password)
    })
    await queryInterface.bulkInsert('Users', data.users)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
