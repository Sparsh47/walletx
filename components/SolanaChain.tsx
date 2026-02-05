"use client";

import { useEffect, useState } from "react";
import { useWallet } from "../hooks/useWallet";
import {
  addWallet,
  createWallet,
  retrieveWalletsFromPhrase,
} from "../lib/solana";
import WalletCard from "./WalletCard";
import type { Wallet } from "../contexts/walletContext";
import Mnemonic from "./Mnemonic";

export default function SolanaChain() {
  const [secretPhrase, setSecretPhrase] = useState<string>("");
  const [accountCount, setAccountCount] = useState<number>(1);

  const { recoveryPhrase, setRecoveryPhrase, wallets, setWallets } =
    useWallet();

  const handleWalletGeneration = async () => {
    if (secretPhrase.trim().length > 0) {
      const wallets = await retrieveWalletsFromPhrase(
        secretPhrase,
        accountCount,
      );

      setWallets(wallets);

      return;
    } else {
      const { mnemonic, path, publicKey, privateKey } = await createWallet();

      const wallets = JSON.parse(localStorage.getItem("wallets")!);

      if (!wallets) {
        const wallets = [
          {
            mnemonic: mnemonic,
            path: path,
            publicKey: publicKey,
            privateKey: privateKey,
          },
        ];

        setWallets(wallets);

        localStorage.setItem("wallets", JSON.stringify(wallets));
      } else {
        const newWallet = {
          mnemonic: mnemonic,
          path: path,
          publicKey: publicKey,
          privateKey: privateKey,
        };

        const updatedWallets = [...wallets, newWallet];

        setWallets(updatedWallets);
        localStorage.setItem("wallets", JSON.stringify(updatedWallets));
      }

      localStorage.setItem("mnemonics", mnemonic);
      setRecoveryPhrase(mnemonic);
      return;
    }
  };

  const handleWalletAddition = async () => {
    const { mnemonic, path, publicKey, privateKey } =
      await addWallet(recoveryPhrase);

    const wallets = JSON.parse(localStorage.getItem("wallets")!);

    console.log("Wallets: ", wallets);

    if (!wallets) {
      console.log("here");
      const wallets = [
        {
          mnemonic: mnemonic,
          path: path,
          publicKey: publicKey,
          privateKey: privateKey,
        },
      ];

      setWallets(wallets);

      localStorage.setItem("wallets", JSON.stringify(wallets));
    } else {
      console.log("here fool");
      const newWallet = {
        mnemonic: mnemonic,
        path: path,
        publicKey: publicKey,
        privateKey: privateKey,
      };

      console.log("New Wallet: ", newWallet);

      const updatedWallets = [...wallets, newWallet];

      setWallets(updatedWallets);
      localStorage.setItem("wallets", JSON.stringify(updatedWallets));
    }

    localStorage.setItem("mnemonics", mnemonic);
    setRecoveryPhrase(mnemonic);
  };

  useEffect(() => {
    const mnemonic = localStorage.getItem("mnemonics");
    const wallets = JSON.parse(localStorage.getItem("wallets")!);

    if (mnemonic) {
      setRecoveryPhrase(mnemonic);
    }

    if (wallets) {
      setWallets(wallets);
    }
  }, []);

  return (
    <section className="section">
      {recoveryPhrase && <Mnemonic phrase={recoveryPhrase} />}
      <div>
        <h1 className="section-heading">Secret Recovery Phrase</h1>
        <p className="section-subheading">Save these words in a safe place.</p>
      </div>
      {wallets && wallets.length === 0 && (
        <div className="flex flex-col gap-5">
          <div className="w-full flex items-center justify-between gap-5">
            <input
              type="password"
              value={secretPhrase}
              onChange={(e) => setSecretPhrase(e.target.value)}
              placeholder="Enter your secret phrase (or leave blank to generate)"
              className="phrase-input"
            />
            <button
              onClick={handleWalletGeneration}
              className="btn cursor-pointer"
            >
              Generate Wallet
            </button>
          </div>
          <div className="w-full flex items-center justify-between gap-5">
            <input
              type="number"
              value={accountCount}
              onChange={(e) => setAccountCount(Number(e.target.value))}
              placeholder="Enter number of accounts to retrieve"
              className="phrase-input"
            />
          </div>
        </div>
      )}
      {wallets && wallets.length > 0 && (
        <div className="w-full flex items-center justify-between">
          <h1 className="section-heading">Solana Wallets</h1>
          <button onClick={handleWalletAddition} className="btn cursor-pointer">
            Add More
          </button>
        </div>
      )}
      {wallets &&
        wallets.length > 0 &&
        wallets.map((wallet: Wallet, index: number) => (
          <WalletCard
            key={index}
            walletNumber={index + 1}
            privateKey={wallet.privateKey}
            publicKey={wallet.publicKey}
          />
        ))}
    </section>
  );
}
