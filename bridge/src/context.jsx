import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import BridgeContractPOL from "./abis/Polygon/POLBridgeABI";
import BridgeContractAVL from "./abis/Avalanche/AVLBridgeABI";
import BridgeContractETH from "./abis/Ethereum/ETHBridgeABI";
import BridgeContractBSC from "./abis/BSC/BSCBridgeABI";
import L643ContractAVL from "./abis/Avalanche/L643ABI";
import L784ContractAVL from "./abis/Avalanche/L784ABI";
import L840ContractAVL from "./abis/Avalanche/L840ABI";
import L949ContractAVL from "./abis/Avalanche/L949ABI";
import L643ContractBSC from "./abis/BSC/L643ABI";
import L784ContractBSC from "./abis/BSC/L784ABI";
import L840ContractBSC from "./abis/BSC/L840ABI";
import L949ContractBSC from "./abis/BSC/L949ABI";
import L643ContractETH from "./abis/Ethereum/L643ABI";
import L784ContractETH from "./abis/Ethereum/L784ABI";
import L840ContractETH from "./abis/Ethereum/L840ABI";
import L949ContractETH from "./abis/Ethereum/L949ABI";
import L643ContractPOL from "./abis/Polygon/L643ABI";
import L784ContractPOL from "./abis/Polygon/L784ABI";
import L840ContractPOL from "./abis/Polygon/L840ABI";
import L949ContractPOL from "./abis/Polygon/L949ABI";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [bridgeContractPOL, setBridgeContractPOL] = useState();
  const [bridgeContractAVL, setBridgeContractAVL] = useState();
  const [bridgeContractETH, setBridgeContractETH] = useState();
  const [bridgeContractBSC, setBridgeContractBSC] = useState();
  const [l643ContractAVL, setL643ContractAVL] = useState();
  const [l784ContractAVL, setL784ContractAVL] = useState();
  const [l840ContractAVL, setL840ContractAVL] = useState();
  const [l949ContractAVL, setL949ContractAVL] = useState();
  const [l643ContractBSC, setL643ContractBSC] = useState();
  const [l784ContractBSC, setL784ContractBSC] = useState();
  const [l840ContractBSC, setL840ContractBSC] = useState();
  const [l949ContractBSC, setL949ContractBSC] = useState();
  const [l643ContractETH, setL643ContractETH] = useState();
  const [l784ContractETH, setL784ContractETH] = useState();
  const [l840ContractETH, setL840ContractETH] = useState();
  const [l949ContractETH, setL949ContractETH] = useState();
  const [l643ContractPOL, setL643ContractPOL] = useState();
  const [l784ContractPOL, setL784ContractPOL] = useState();
  const [l840ContractPOL, setL840ContractPOL] = useState();
  const [l949ContractPOL, setL949ContractPOL] = useState();

  useEffect(() => {
    setSmartContractAndProvider();
    updateCurrentWalletAddress();
  }, []);

  const updateCurrentWalletAddress = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_accounts", []);
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const setSmartContractAndProvider = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    setBridgeContractPOL(BridgeContractPOL(signer));
    setBridgeContractAVL(BridgeContractAVL(signer));
    setBridgeContractETH(BridgeContractETH(signer));
    setBridgeContractBSC(BridgeContractBSC(signer));
    setL643ContractAVL(L643ContractAVL(signer));
    setL784ContractAVL(L784ContractAVL(signer));
    setL840ContractAVL(L840ContractAVL(signer));
    setL949ContractAVL(L949ContractAVL(signer));
    setL643ContractBSC(L643ContractBSC(signer));
    setL784ContractBSC(L784ContractBSC(signer));
    setL840ContractBSC(L840ContractBSC(signer));
    setL949ContractBSC(L949ContractBSC(signer));
    setL643ContractETH(L643ContractETH(signer));
    setL784ContractETH(L784ContractETH(signer));
    setL840ContractETH(L840ContractETH(signer));
    setL949ContractETH(L949ContractETH(signer));
    setL643ContractPOL(L643ContractPOL(signer));
    setL784ContractPOL(L784ContractPOL(signer));
    setL840ContractPOL(L840ContractPOL(signer));
    setL949ContractPOL(L949ContractPOL(signer));
  };

  return (
    <GlobalContext.Provider
      value={{
        bridgeContractPOL,
        bridgeContractAVL,
        bridgeContractETH,
        bridgeContractBSC,
        l643ContractAVL,
        l784ContractAVL,
        l840ContractAVL,
        l949ContractAVL,
        l643ContractBSC,
        l784ContractBSC,
        l840ContractBSC,
        l949ContractBSC,
        l643ContractETH,
        l784ContractETH,
        l840ContractETH,
        l949ContractETH,
        l643ContractPOL,
        l784ContractPOL,
        l840ContractPOL,
        l949ContractPOL,
        walletAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);
