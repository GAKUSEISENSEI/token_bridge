import React from "react";
import { useState } from "react";

const Header = () => {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };
  return (
    <div>
      <div className="header">
        <button className="contactButton" onClick={connectWallet}>
          {walletAddress.length && walletAddress > 0
            ? `connected: ${walletAddress.substring(
                0,
                6
              )}...${walletAddress.substring(38)}`
            : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default Header;
