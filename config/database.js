const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('api1802202501', 'root', 'pintu123', {
    host: 'localhost',
    dialect: 'mysql'
  });

  sequelize.authenticate()
  .then(() => {
    console.log('Database connection established.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports=sequelize;