import React, { useState, useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, TextField, Button } from "@mui/material";
import { ethers } from "ethers";
// import { useEthers, useEtherBalance } from "@usedapp/core";
// import { formatEther } from "@ethersproject/units";
// import useMetaMask from "../hooks/useMetaMask";

export default function Fund() {
  const [walletAccount, setWalletAccount] = useState("");
  const [currentChain, setCurrentChain] = useState("");
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState(0);
  const [userAddress, setUserAddress] = useState("");

  const detailsOn = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const addr = await signer.getAddress();

    setUserAddress(addr.toString());
  };

  // Initialize the application and MetaMask Event Handlers
  useEffect(() => {
    // Setup Listen Handlers on MetaMask change events
    if (typeof window.ethereum == "undefined") {
      // Add Listener when accounts switch
      // window.ethereum.on("accountsChanged", (accounts) => {
      //   console.log("Account changed: ", accounts[0]);
      //   setWalletAccount(accounts[0]);
      // });

      // Do something here when Chain changes
      // window.ethereum.on("chainChanged", (chaindId) => {
      //   console.log("Chain ID changed: ", chaindId);
      //   setCurrentChain(chaindId);
      // });
      // } else {
      alert("Please install MetaMask to use this service!");
    }
  }, []);

  // Used to see if the wallet is currently connected to the application
  // If an account has been accessed with MetaMask, then the wallet is connected to the application.
  useEffect(() => {
    setIsConnected(walletAccount ? true : false);
  }, [walletAccount]);

  useEffect(() => {
    setEthBalance(ethBalance);
    setUserAddress(userAddress);
  }, [ethBalance, userAddress]);

  // Connect the Wallet to the current selected account in MetaMask.
  // Will generate a login request for user if no account is currently connected to the application
  const handleConnectWallet = async () => {
    console.log("Connecting MetaMask...");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    const account = accounts[0];

    console.log("Account: ", account);
    setWalletAccount(account);
  };

  // Handle Disconnected. Removing the state of the account connected
  // to your app should be enough to handle Disconnect with your application.
  const handleDisconnect = async () => {
    console.log("Disconnecting MetaMask...");
    setIsConnected(false);
    setWalletAccount("");
    setEthBalance(0);
    setUserAddress("");
    // ethereum.on('disconnect', handler: (error: ProviderRpcError) => void);
  };

  // Connect Once and set the account.
  // Can be used to trigger a new account request each time,
  // unlike 'eth_requestAccounts'
  const handleConnectOnce = async () => {
    const accounts = await window.ethereum
      .request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {}
          }
        ]
      })
      .then(() => window.ethereum.request({ method: "eth_requestAccounts" }));

    setWalletAccount(accounts[0]);
    handleGetBalance();
    detailsOn();
    console.log("wallet address=>", userAddress);
  };

  const handleGetBalance = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    const account = accounts[0];

    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [account, "latest"]
    });

    // // Returns a hex value of Wei
    const wei = parseInt(balance, 16);
    // const gwei = wei / Math.pow(10, 9); // parse to Gwei
    const eth = wei / Math.pow(10, 18); // parse to ETH

    // setEthBalance({ wei, gwei, eth });
    setEthBalance(eth);
  };

  const ethValue = ethBalance === 0 ? 0 : ethBalance.toFixed(5);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <TextField
        style={{ width: "100%" }}
        label="Token Amount"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        InputProps={{
          endAdornment: <InputAdornment position="start">ETH</InputAdornment>
        }}
        helperText={"Wallet balance: " + ethValue + " MAX"}
      />
      <TextField
        style={{ width: "100%" }}
        label="Recipient address"
        id="outlined-start-adornment"
        placeholder="Place recipient address here"
        sx={{ m: 1, width: "25ch" }}
        value={userAddress}
      />
      {isConnected ? (
        <Button
          variant="outlined"
          color="secondary"
          style={{ marginTop: "20px" }}
          onClick={handleDisconnect}
        >
          Disconnect Wallet
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="secondary"
          style={{ marginTop: "20px" }}
          onClick={handleConnectOnce}
        >
          Connect Wallet
        </Button>
      )}
    </Box>
  );
}
