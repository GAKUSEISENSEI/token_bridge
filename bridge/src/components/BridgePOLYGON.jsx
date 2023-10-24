import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./Bridge.css";
import { useGlobalContext } from "../context";
const BridgePOLYGON = () => {
  const {
    bridgeContractPOL,
    bridgeContractAVL,
    bridgeContractETH,
    bridgeContractBSC,
    l643ContractPOL,
    l784ContractPOL,
    l840ContractPOL,
    l949ContractPOL,
    walletAddress,
  } = useGlobalContext();
  const [fromCurrency, setFromCurrency] = useState("L643");
  const [toNetwork, setToNetwork] = useState("AVL");
  const [nonce, setNonce] = useState(17);
  const [amount, setAmount] = useState(0);
  const [transactionData, setTransactionData] = useState("");
  const [balanceFrom, setBalanceFrom] = useState(0);
  const PRIV_KEY =
    "d380408c3c266419c56adf69e577806fd84083ebf4942cbcecbd080a50a91947";
  const handleBridge = (e) => {
    e.preventDefault();
    _bridgeToken();
  };
  const nonceInc = () => {
    setNonce(nonce + 1);
  };
  const handleFromCurrencyChange = async (e) => {
    setFromCurrency(e.target.value);
    setTransactionData("");
  };

  useEffect(() => {
    if (l643ContractPOL) {
      handleFromBalanceChange();
    }
  }, [fromCurrency]);
  const handleFromBalanceChange = async () => {
    try {
      if (fromCurrency == "L643") {
        const response = await l643ContractPOL.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 6));
      }
      if (fromCurrency == "L949") {
        const response = await l949ContractPOL.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 6));
      }
      if (fromCurrency == "L840") {
        const response = await l840ContractPOL.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 6));
      }
      if (fromCurrency == "L784") {
        const response = await l784ContractPOL.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 6));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleToNetworkChange = (e) => {
    setToNetwork(e.target.value);
    setTransactionData("");
  };

  const countDecimals = (value) => {
    if (Math.floor(value) !== value)
      return value.toString().split(".")[1].length || 0;
    return 0;
  };

  const findValue = (obj, key) => {
    for (var k in obj) {
      if (k === key) {
        return obj[k];
      }
      if (typeof obj[k] === "object") {
        var val = findValue(obj[k], key);
        if (val !== undefined) {
          return val;
        }
      }
    }
  };

  const _bridgeToken = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = new ethers.Wallet(PRIV_KEY, provider);
    const message = ethers.utils.solidityKeccak256(
      ["address", "address", "uint256", "uint256"],
      [walletAddress, walletAddress, amount, nonce]
    );
    const signature = signer.signMessage(message);
    if (toNetwork == "AVL") {
      try {
        await bridgeContractPOL.burn(
          fromCurrency,
          walletAddress,
          amount * 10 ** 6,
          nonce,
          signature
        );

        await bridgeContractPOL.on(
          "Transfer",
          async (from, to, amount, _nonce, signature) => {
            console.log("111111111");
            await ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0xa869" }], // Binance Smart Chain testnet ID
            });
            await bridgeContractAVL.mint(
              fromCurrency,
              from,
              to,
              amount,
              _nonce,
              signature
            );
          }
        );
        nonceInc();
      } catch (err) {
        console.log(err);
      }
    }
    if (toNetwork == "ETH") {
      try {
        await bridgeContractPOL.burn(
          fromCurrency,
          walletAddress,
          amount * 10 ** 6,
          nonce,
          signature
        );
        await bridgeContractPOL.on(
          "Transfer",
          async (from, to, amount, _nonce, signature) => {
            await bridgeContractETH.mint(
              fromCurrency,
              from,
              to,
              amount,
              _nonce,
              signature
            );
          }
        );
        nonceInc();
      } catch (err) {
        console.log(err);
      }
    }
    if (toNetwork == "BSC") {
      try {
        await bridgeContractPOL.burn(
          fromCurrency,
          walletAddress,
          amount * 10 ** 6,
          nonce.toFixed,
          signature
        );
        await bridgeContractPOL.on(
          "Transfer",
          async (from, to, amount, _nonce, signature) => {
            await bridgeContractBSC.mint(
              fromCurrency,
              from,
              to,
              amount,
              _nonce,
              signature
            );
          }
        );
        nonceInc();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div>
      <h1>Bridge</h1>
      <div className="container">
        <div className="buy">
          <form onSubmit={handleBridge}>
            <label>
              From: Balance:{" "}
              {countDecimals(balanceFrom) > 2
                ? Number(balanceFrom).toFixed(2)
                : balanceFrom}
            </label>
            <select
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              onClick={handleFromBalanceChange}
            >
              <option value="L643">L643</option>
              <option value="L949">L949</option>
              <option value="L840">L840</option>
              <option value="L784">L784</option>
            </select>
            <br />
            <label>Network to:</label>
            <select value={toNetwork} onChange={handleToNetworkChange}>
              <option value="AVL">Avalanche</option>
              <option value="ETH">Ethereum</option>
              <option value="BSC">Binance Smart Chain</option>
            </select>
            <br />
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={handleAmountChange}
            />
            <p>
              {transactionData ? `Transaction hash: ${transactionData}` : ""}
            </p>

            <button type="submit">BRIDGE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BridgePOLYGON;
