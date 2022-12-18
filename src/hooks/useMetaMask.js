import React, { useState, useEffect, useMemo, useCallback } from "react";
import { injected } from "../component/wallets/connectors";
import { useWeb3React } from "@web3-react/core";

export const MetaMaskContext = React.createContext(null);

export const MetaMaskProvider = ({ children }) => {
  const { activate, account, library, connector, active, deactivate } =
    useWeb3React();

  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    connect().then(() => {
      setIsLoading(false);
    });
  }, []);

  const handleActive = useCallback(() => {
    setIsActive(active);
  }, [active]);

  useEffect(() => {
    handleActive();
  }, [handleActive]);

  //Connect to MetaMask Wallet
  const connect = async () => {
    console.log("Connectionig to MetaMask Wallet");
    try {
      await activate(injected);
    } catch (error) {
      console.log("Error on connecting:", error);
    }
  };

  // Disconnect from MetaMask Wallet
  const disconnect = async () => {
    console.log("Deactivating...");
    try {
      await deactivate;
    } catch (error) {
      console.log("Error on disconnecting:", error);
    }
  };

  const values = useMemo(
    () => ({
      isActive,
      account,
      isLoading,
      connect,
      disconnect
    }),
    [isActive, isLoading]
  );

  return (
    <MetaMaskContext.Provider value={values}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export default function useMetaMask() {
  const context = React.useContext(MetaMaskContext);

  if (context === undefined) {
    throw new Error(
      "useMetaMask hook must be used with a MetaMaskProvider component"
    );
  }
  return context;
}
