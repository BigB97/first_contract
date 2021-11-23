const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
console.log(inboxPath);
const source = fs.readFileSync(inboxPath, 'utf8');
var input = {
  language: 'Solidity',
  sources: {
    'Lottery.sol': {
      content: source,
    },
  },
  settings: {
    optimizer: {
      enabled: true,
    },
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};
let output = JSON.parse(solc.compile(JSON.stringify(input)));
module.exports = output.contracts['Lottery.sol'][':Lottery'];
