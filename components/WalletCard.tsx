import { Eye, EyeClosed } from "lucide-react";
import { copyToClipBoard } from "../lib/utils";
import { useState } from "react";

type WalletCardProps = {
  walletNumber: number;
  privateKey: string;
  publicKey: string;
};

export default function WalletCard({
  walletNumber,
  privateKey,
  publicKey,
}: WalletCardProps) {
  const [showKey, setShowKey] = useState<boolean>(false);

  const toggleKey = () => {
    setShowKey((prev) => !prev);
  };

  return (
    <div className="w-full rounded-2xl border border-stone-400 bg-black">
      <h3 className="text-stone-100 font-semibold text-xl p-5">
        Wallet {walletNumber}
      </h3>
      <div className="w-full p-5 bg-stone-900 rounded-2xl">
        <div className="space-y-3">
          <p className="text-lg text-stone-100">Public Key</p>
          <p
            onClick={() => copyToClipBoard(publicKey)}
            className="text-stone-100 cursor-pointer"
          >
            {publicKey}
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-lg text-stone-100">Private Key</p>
          <div className="w-full flex items-center justify-between">
            <p
              onClick={() => copyToClipBoard(privateKey)}
              className="text-stone-100 cursor-pointer line-clamp-1"
            >
              {showKey ? privateKey : "••••••••••••••••••••••••••••••••••••••"}
            </p>
            {showKey ? (
              <EyeClosed
                onClick={toggleKey}
                className="text-stone-100 cursor-pointer"
              />
            ) : (
              <Eye
                onClick={toggleKey}
                className="text-stone-100 cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
