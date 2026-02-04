"use client";

import { useContext } from "react";
import { walletContext } from "../contexts/walletContext";

export const useWallet = () => {
  const ctx = useContext(walletContext);

  if (!ctx) {
    throw new Error("useWallet must be used within a WalletProvider");
  }

  return ctx;
};
