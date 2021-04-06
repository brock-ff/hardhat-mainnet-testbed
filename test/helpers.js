const DEFAULT_ADDRESS = "0x5F5e20d8Ef0A2Aa8e40BEb55cE54467c77ad49E0";

const getDefaultImpersonationAddress = () => {
    return DEFAULT_ADDRESS;
}

const startImpersonatingAccount = (address = DEFAULT_ADDRESS) => {
    console.log("impersonating", address);
    return hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [address]
      });
}

const stopImpersonatingAccount = (address = DEFAULT_ADDRESS) => {
    console.log("stopping impersonation of", address);
    return hre.network.provider.request({
        method: "hardhat_stopImpersonatingAccount",
        params: [address]
    });
}

module.exports = {
    getDefaultImpersonationAddress,
    startImpersonatingAccount,
    stopImpersonatingAccount,
}
