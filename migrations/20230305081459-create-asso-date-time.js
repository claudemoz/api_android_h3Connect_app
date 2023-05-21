'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('asso_date_time', {
      id_asso_date_time: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_date: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'date',
          key: 'id_date'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      id_time:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'time',
          key: 'id_time'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    await queryInterface.dropTable('asso_date_time');
  }
};