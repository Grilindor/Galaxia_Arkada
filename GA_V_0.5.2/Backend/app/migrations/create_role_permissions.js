module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Création des rôles
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
    });

    // Insérer des rôles
    await queryInterface.bulkInsert('roles', [
      { name: 'user' },
      { name: 'developer' },
      { name: 'administrator' },
    ]);

    // Création des permissions
    await queryInterface.createTable('permissions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
    });

    // Insérer des permissions
    await queryInterface.bulkInsert('permissions', [
      { name: 'create_game' },
      { name: 'delete_game' },
      { name: 'upload_game' },
      { name: 'view_dashboard' },
      { name: 'manage_users' },
    ]);

    // Création de la table de relation entre rôles et permissions
    await queryInterface.createTable('role_permissions', {
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      permission_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'permissions',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      primaryKey: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Supprimer les tables
    await queryInterface.dropTable('role_permissions');
    await queryInterface.dropTable('permissions');
    await queryInterface.dropTable('roles');
  },
};
