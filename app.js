const Client = require('./classes/Client');

async function main() {
  const client = new Client();
  try {
    const token = require('./token.json');
    await client.login(token);
  } catch(err) { void err; }
  require('./main-menu')(client);
}

main();