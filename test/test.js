const { expect } = require("chai");
const { ethers } = require("hardhat");
const { getDefaultImpersonationAddress, startImpersonatingAccount, stopImpersonatingAccount } = require("./helpers.js");

describe("Greeter", function() {
  it("Should return the new greeting once it's changed", async () => {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    
    await greeter.deployed();
    expect(await greeter.greet()).to.equal("Hello, world!");

    await greeter.setGreeting("Hola, mundo!");
    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("hardhat impersonation", function() {
  it("impersonates an unowned account", async () => {
    const res = await startImpersonatingAccount();
    expect(res).to.equal(true);
  });

  it("conducts an impersonated transaction", async () => {
    const toAddress = "0xdD7DEA7944da1b4c68faA807A9B5a65AC2A4C792";
    await startImpersonatingAccount();
    const signer = await ethers.provider.getSigner(getDefaultImpersonationAddress());
    
    // send `0x1000` wei to `toAddress`
    const tx = {
      to: toAddress,
      value: "0x1000",
    };

    // conduct two transactions to show nonce iteration and per-test-run state reset
    let res = await signer.sendTransaction(tx);
    expect(res).to.haveOwnProperty("to", toAddress);
    let firstNonce = res.nonce;
    res = await signer.sendTransaction(tx);
    expect(res).to.haveOwnProperty("nonce", firstNonce + 1);
  });
  
  it("fails to conduct impersonated transaction when not impersonating", async () => {
    const toAddress = "0xdD7DEA7944da1b4c68faA807A9B5a65AC2A4C792";
    await stopImpersonatingAccount();
    const signer = await ethers.provider.getSigner(getDefaultImpersonationAddress());

    // send `0x1000` wei to `toAddress`
    const tx = {
      to: toAddress,
      value: "0x1000",
    };

    try {
      await signer.sendTransaction(tx);
      expect(true).to.equal(false);
    } catch {
      expect(true).to.equal(true);
    }
  })

  it("stops impersonating an account", async () => {
    await startImpersonatingAccount();
    const res = await stopImpersonatingAccount();
    expect(res).to.equal(true);
  });
});
