'use strict';

const Connection = require('tedious').Connection;
const config = {
  server: 'up885188.myvm.port.ac.uk',
  authentication: {
    type: 'default',
    options: {
      userName: 'up885188',
      password: 'recipeapp'
    }
  },
  options: {
    encrypt: true,
    database: 'recipeapp'
  }
};
const connection = new Connection(config);
connection.on('connect', function(err) {
  console.log("Connected");
});
