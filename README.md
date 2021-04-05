# hardhat-mainnet-testbed

Clones the Ethereum mainnet starting at a specific block. Allows for Metamask to be used. Runs on [http://localhost:8545](http://localhost:8545).

## Get started

First, install dependencies.

```shell
npm install
```

Next, copy `.env.example` into a new file `.env`.

```shell
cp .env.example .env
vim .env
```

Edit the variable(s) to use your own parameters.

The following script runs the `accounts` task from `hardhat.config.js` and starts a local node that emulates Ethereum mainnet.

```shell
./run.sh
```

You can now make transactions as if you were on mainnet. If you would like to reset the chain (erase your changes), just stop the node (CTRL-C or Cmd-C) and re-run `./run.sh`.
