import web3 from "./web3";
import Elections from "./build/Elections.json";
import Address from "./deploy/Address.json";

const instance = new web3.eth.Contract(
  JSON.parse(Elections.interface),
  Address.address
);

export default instance;
