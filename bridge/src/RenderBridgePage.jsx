import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import BridgeETH from "./components/BridgeETH";
import BridgePOLYGON from "./components/BridgePOLYGON";
import BridgeAVL from "./components/BridgeAVL";
import BridgeBSC from "./components/BridgeBSC";
import Alert from "./components/Alert";
import { GlobalContextProvider } from "./context";
const RenderBridgePage = () => {
  const [chainId, setChainId] = useState(null);

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getNetwork().then((network) => {
      setChainId(network.chainId);
    });
  }
  if (chainId == 1) {
    return (
      <GlobalContextProvider>
        <BridgeETH />
      </GlobalContextProvider>
    );
  } else if (chainId == 80001) {
    return (
      <GlobalContextProvider>
        <BridgePOLYGON />
      </GlobalContextProvider>
    );
  } else if (chainId == 43113) {
    return (
      <GlobalContextProvider>
        <BridgeAVL />
      </GlobalContextProvider>
    );
  } else if (chainId == 56) {
    return (
      <GlobalContextProvider>
        <BridgeBSC />
      </GlobalContextProvider>
    );
  } else {
    return <Alert />;
  }
};
export default RenderBridgePage;
