const { once } = require('events');
const { get } = require('https');
const token = require('./token.json');

async function main() {
  const req = get({
    host: 'discord.com',
    path: '/api/v9/users/@me',
    headers: {
      authorization: token
    }
  });
  const [res] = await once(req, 'response');
  let data = '';
  res.on('data', (chunk) => data += chunk);
  await once(res, 'end');
  return JSON.parse(data);
}

main().then(console.log);