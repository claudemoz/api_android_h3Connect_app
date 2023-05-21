'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('actor', {
      id_actor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate:{
          isEmail: true,  
        }
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar:{
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "https://firebasestorage.googleapis.com/v0/b/androidapph3connect.appspot.com/o/images%2Fdefault_profil.jpg?alt=media&token=fc4d9bf2-ace0-4471-8595-a6991912f20d"
      },
      address:{
        type:Sequelize.STRING,
        allowNull: true,
        default: null
      }, 
      tel:{
        type:Sequelize.STRING,
        allowNull: true,
        default: null
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
    await queryInterface.dropTable('actor');
  }
};