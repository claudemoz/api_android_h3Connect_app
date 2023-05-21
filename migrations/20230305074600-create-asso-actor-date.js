'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('asso_actor_date', {
      id_asso_actor_date: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_actor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'actor',
          key: 'id_actor'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      id_date:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'date',
          key: 'id_date'
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
    await queryInterface.dropTable('asso_actor_date');
  }
};