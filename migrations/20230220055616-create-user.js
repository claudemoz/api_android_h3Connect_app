'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id_user: {
        type: Sequelize. INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize. STRING,
        allowNull: false,
        unique: true,
        validate:{
          isEmail: true,  
        }
      },
      password:{
        type: Sequelize. STRING,
        allowNull: false,
      },
      profile_img:{
        type: Sequelize. STRING,
        allowNull: true,
        defaultValue: null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize. DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize. DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};