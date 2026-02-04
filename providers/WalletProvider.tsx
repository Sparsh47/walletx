import { useState, type ReactNode } from "react";
import { walletContext, type Wallet } from "../contexts/walletContext";

export default function WalletProvider({ children }: { children: ReactNode }) {
  const [recoveryPhrase, setRecoveryPhrase] = useState<string>("");
  const [wallets, setWallets] = useState<Wallet[]>([]);

  return (
    <walletContext.Provider
      value={{ recoveryPhrase, setRecoveryPhrase, wallets, setWallets }}
    >
      {children}
    </walletContext.Provider>
  );
}
