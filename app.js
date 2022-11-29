const Client = require('./classes/Client');
const { main_window, updateTabs } = require('./main-menu');

async function main() {
  let token;
  const client = new Client();
  try { token = require('./token.json'); }
  catch(err) { console.log('No token saved, launching with no user login'); }
  try { await client.login(token); }
  catch(err) {
    if(err === 401)
      console.log('Invalid token, launching with no user login');
  }
  updateTabs(client)
  main_window.show();
}

main();