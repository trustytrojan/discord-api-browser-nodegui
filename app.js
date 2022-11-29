const Client = require('./classes/Client');
const { main_window, updateTabs } = require('./main-menu');

async function main() {
  const client = new Client();
  try {
    const token = require('./token.json');
    await client.login(token);
  } catch(err) {
    if(err.code === 'MODULE_NOT_FOUND')
      console.log('No token saved, launching with no user login');
    else if(err === 401)
      console.log('Invalid token, launching with no user login');
  }
  updateTabs(client);
  main_window.show();
}

main();