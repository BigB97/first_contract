const ganache = require('ganache-cli');
const assert = require('assert');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const compiler = require('../compile');
const interface = compiler.abi;
const bytecode = compiler.evm.bytecode.object;
let accounts;
let inbox;
let msg = 'Hello World';
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  console.log('deploying from', accounts[0]);
  inbox = await new web3.eth.Contract(interface)
    .deploy({ data: bytecode, arguments: [msg] })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('deploy contract', async () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, msg);
  });

  it('can change the message', async () => {
    await inbox.methods
      .setMessage('Bye World')
      .send({ from: accounts[0], gas: '1000000' });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Bye World');
  });
});
