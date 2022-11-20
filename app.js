const Client = require('./classes/Client');

const client = new Client();

require('./login-form')(client);
console.log('login form was shown');

