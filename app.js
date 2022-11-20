const Client = require('./classes/Client');

async function main() {
  const client = new Client();
  try { await client.login(require('./token.json')); }
  catch(err) { require('./login-form')(client); }
  
}

main();