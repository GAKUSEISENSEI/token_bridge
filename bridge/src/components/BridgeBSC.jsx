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
    l643ContractBSC,
    l784ContractBSC,
    l840ContractBSC,
    l949ContractBSC,
    walletAddress,
  } = useGlobalContext();
  const [fromCurrency, setFromCurrency] = useState("USDT");
  const [toNetwork, setToNetwork] = useState("L643");
  const [nonce, setNonce] = useState(0);
  const [amount, setAmount] = useState(0);
  const [transactionData, setTransactionData] = useState("");
  const [balanceFrom, setBalanceFrom] = useState(0);
  const KEY = "0x6d6164654279566164696d47414b5553454953454e534549";
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
    if (l643ContractBSC) {
      handleFromBalanceChange();
    }
  }, [fromCurrency]);
  const handleFromBalanceChange = async () => {
    try {
      if (fromCurrency == "L643") {
        const response = await l643ContractBSC.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 6));
      }
      if (fromCurrency == "L949") {
        const response = await l949ContractBSC.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 6));
      }
      if (fromCurrency == "L840") {
        const response = await l840ContractBSC.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 6));
      }
      if (fromCurrency == "L784") {
        const response = await l784ContractBSC.balanceOf(walletAddress);
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
    if (toNetwork == "AVL") {
      try {
        await bridgeContractBSC.burn(
          fromCurrency,
          walletAddress,
          amount * 10 ** 6,
          nonce
        );
        await bridgeContractBSC.on(
          "Transfer",
          async (from, to, amount, _nonce, signature) => {
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
        await bridgeContractBSC.burn(
          fromCurrency,
          walletAddress,
          amount * 10 ** 6,
          nonce
        );
        await bridgeContractBSC.on(
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
    if (toNetwork == "POL") {
      try {
        await bridgeContractBSC.burn(
          fromCurrency,
          walletAddress,
          amount * 10 ** 6,
          nonce
        );
        await bridgeContractBSC.on(
          "Transfer",
          async (from, to, amount, _nonce, signature) => {
            await bridgeContractPOL.mint(
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
              <option value="POL">Polygon</option>
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
