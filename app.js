const Client = require('./classes/Client');

const client = new Client();

async function main() {
  try {
    const token = require('./token.json');
    await client.login(token);
  } catch(err) {
    console.error(err);
    if(err.code === 'MODULE_NOT_FOUND')
      console.error('No token saved, launching with no user login');
    else if(err === 401)
      console.error('Invalid token, launching with no user login');
  }

  global.mw = require('./main-window')(client);
}

main();