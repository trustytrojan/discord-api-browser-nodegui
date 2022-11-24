const { readFileSync, appendFileSync } = require('fs');

const current_file = process.argv[2];
const code = readFileSync(current_file).toString();
let functions = code.split('function ');
functions.shift();
functions = functions.map(v => v.substring(0, v.indexOf('('))).filter(v => v.length > 0);
let str = '\n\nmodule.exports = {';
for(const fn of functions) {
  str += `\n  get ${fn}() { return ${fn}; },`;
}
appendFileSync(current_file, (str += '\n};'));