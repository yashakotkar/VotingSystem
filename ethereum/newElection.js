const fs = require("fs-extra");
const path = require("path");
const deploy = require("./deploy");

const deployPath = path.join(__dirname, "deploy");
fs.removeSync(deployPath);

let res;

const DeployContract = async () => {
  res = await deploy();
  console.log(res);
};

async function example() {
  try {
    await DeployContract();
    await fs.ensureDir("deploy");
    await fs.writeJson("./deploy/Address.json", { address: res });
    console.log("success!");
  } catch (err) {
    console.error(err);
  }
}

example();
