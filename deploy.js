const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiler = require('./compile');
const abi = compiler.abi;
const bytecode = compiler.evm.bytecode.object;
const mnemonicPhrase =
  'woman also canyon merry pen ketchup require magnet reopen guard render alter';

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase,
  },
  providerOrUrl:
    'https://rinkeby.infura.io/v3/fd7bd8f5a25c4e7498c95f86054e1286',
});

const web3 = new Web3(provider);

const deploy = async (data) => {
  const accounts = await web3.eth.getAccounts();
  console.log('deploying from', accounts[0]);
  const contract = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: data,
    })
    .send({
      from: accounts[0],
      gas: '1000000',
    });
//   provider.engine.stop();
  console.log('deployed to', contract.options.address);
};

deploy(['Hello World']);
// module.exports = {
// }
