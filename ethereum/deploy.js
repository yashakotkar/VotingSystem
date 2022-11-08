const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const election = require("./build/Elections.json");

const provider = new HDWalletProvider(
  "gentle monster weekend dolphin cake lottery shrimp rifle rubber crouch upper effort",
  "HTTP://127.0.0.1:7545"
);
const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(election.interface))
      .deploy({ data: election.bytecode })
      .send({ gas: "1000000", from: accounts[0] });

    console.log("Contract deployed to", result.options.address);

    return result.options.address;
  } catch (error) {
    console.error(error.message);
  }
};
module.exports = deploy;
