const {Sequelize} = require('sequelize');
const config = require('./config.js');

// create Sequelize instance
const sequelize = new Sequelize(config.development);


// Test the database connection
async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
  // Call the function to test the connection
  testConnection();
  
  module.exports = sequelize;


