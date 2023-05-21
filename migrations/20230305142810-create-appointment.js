'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointment', {
      id_appointment: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_actor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'actor',
          key: 'id_actor'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      id_date: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'date',
          key: 'id_date'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      id_time: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'time',
          key: 'id_time'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      id_doctor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'actor',
          key: 'id_actor'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('appointment');
  }
};