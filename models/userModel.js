const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the User model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,   // Enable timestamps
    createdAt: 'created_at', // Customize the 'createdAt' field to 'created_at'
    updatedAt: 'updated_at'  // Customize the 'updatedAt' field to 'updated_at'
});

// Sync the model with the database (use { force: true } during development to drop and recreate the table)
User.sync()
    .then(() => {
        console.log('User table created');
    })
    .catch(err => {
        console.log('Error syncing the User model:', err);
    });

module.exports = User;
