const Client = require('./classes/Client');

async function main() {
  const client = new Client();
  require('./main-menu')(client);
}

main();