import { createContext, type Dispatch, type SetStateAction } from "react";

export type Wallet = {
  mnemonic: string;
  path: string;
  publicKey: string;
  privateKey: string;
};

type WalletContextType = {
  recoveryPhrase: string;
  wallets: Wallet[];
  setRecoveryPhrase: Dispatch<SetStateAction<string>>;
  setWallets: Dispatch<SetStateAction<Wallet[]>>;
};

export const walletContext = createContext<WalletContextType | null>(null);
