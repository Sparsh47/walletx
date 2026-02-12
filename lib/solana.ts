import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeed, validateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import bs58 from "bs58";
import nacl from "tweetnacl";
import { Wallet } from "@/contexts/walletContext";

type WalletCreationType = {
  mnemonic: string;
  path: string;
  publicKey: string;
  privateKey: string;
};

let CONNECTION: Connection;

if (process.env.NODE_ENV === "production") {
  console.log("PRODUCTION ENV");
  CONNECTION = new Connection(
    `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_RPC_NET_API_KEY}`,
    "confirmed",
  );
} else {
  console.log("DEV ENV");
  CONNECTION = new Connection("https://api.devnet.solana.com", "confirmed");
}

export const createWallet = async (): Promise<WalletCreationType> => {
  const mnemonic = generateMnemonic();

  if (!validateMnemonic(mnemonic)) {
    throw new Error("Invalid Mnemonic");
  }

  const seed = await mnemonicToSeed(mnemonic);

  const path = `m/44'/501'/0'/0'`;

  const derivedSeed = derivePath(path, seed.toString("hex")).key;

  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

  const keyPair = Keypair.fromSecretKey(secret);

  return {
    mnemonic: mnemonic,
    path: path,
    publicKey: keyPair.publicKey.toBase58(),
    privateKey: bs58.encode(keyPair.secretKey),
  };
};

export const addWallet = async (mnemonic: string) => {
  const wallets = localStorage.getItem("wallets");

  const walletNumber = wallets ? JSON.parse(wallets).length : 0;

  if (!validateMnemonic(mnemonic)) {
    throw new Error("Invalid Mnemonic");
  }

  const seed = await mnemonicToSeed(mnemonic);

  const path = `m/44'/501'/${walletNumber}'/0'`;

  const derivedSeed = derivePath(path, seed.toString("hex")).key;

  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

  const keyPair = Keypair.fromSecretKey(secret);

  return {
    mnemonic: mnemonic,
    path: path,
    publicKey: keyPair.publicKey.toBase58(),
    privateKey: bs58.encode(keyPair.secretKey),
  };
};

export const retrieveWalletsFromPhrase = async (
  phrase: string,
  accountCount: number,
): Promise<Wallet[]> => {
  if (!validateMnemonic(phrase)) {
    throw new Error("Invalid mnemonic");
  }

  const wallets: Wallet[] = [];

  const seed = await mnemonicToSeed(phrase);

  for (let i = 0; i < accountCount; i++) {
    const path = `m/44'/501'/${i}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keyPair = Keypair.fromSecretKey(secret);

    wallets.push({
      mnemonic: phrase,
      path: path,
      publicKey: keyPair.publicKey.toBase58(),
      privateKey: bs58.encode(keyPair.secretKey),
    });
  }

  return wallets;
};

export const getBalance = async (publicKey: string): Promise<number> => {
  const key = new PublicKey(publicKey);
  const balanceInLamports = await CONNECTION.getBalance(key);

  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

  return balanceInSOL;
};

export const sendSOL = async (
  privateKey: string,
  amount: number,
  receiverKey: string,
) => {
  const senderKeyPair = Keypair.fromSecretKey(bs58.decode(privateKey));

  const receiverPublicKey = new PublicKey(receiverKey);

  const transferInstruction = SystemProgram.transfer({
    fromPubkey: senderKeyPair.publicKey,
    toPubkey: receiverPublicKey,
    lamports: amount * LAMPORTS_PER_SOL,
  });

  const transaction = new Transaction().add(transferInstruction);

  const signature = await sendAndConfirmTransaction(CONNECTION, transaction, [
    senderKeyPair,
  ]);

  return signature;
};
