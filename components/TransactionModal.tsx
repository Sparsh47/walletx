import { sendSOL } from "@/lib/solana";
import { X, ArrowUpRight, Wallet } from "lucide-react";
import { useState } from "react";

interface TransactionModalProps {
  closeModal: () => void;
}

export default function TransactionModal({
  closeModal,
}: TransactionModalProps) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleConfirm = async () => {
    try {
      const wallets = JSON.parse(localStorage.getItem("wallets")!);
      const senderPrivateKey = wallets[0].privateKey;
      await sendSOL(senderPrivateKey, Number(amount), recipient);
      console.log("Transaction Completed");
    } catch (e: any) {
      console.log("Error: ", e);
      throw new Error("Error completing transaction: ", e.message);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md px-4">
      {/* Modal Container */}
      <div className="w-full max-w-125 overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0F0F0F] to-[#0A0A0A] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)]">
        {/* Header */}
        <div className="p-8 pb-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-white/10 to-white/5 border border-white/10 shadow-lg">
                <ArrowUpRight size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-[22px] font-semibold text-white tracking-tight">
                  Send SOL
                </h2>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="group cursor-pointer flex h-11 w-11 items-center justify-center rounded-full transition-all hover:bg-white/10 active:scale-95"
              aria-label="Close modal"
            >
              <X
                size={20}
                className="text-neutral-500 transition-colors group-hover:text-white"
              />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="px-8 py-8 flex flex-col gap-5">
          {/* Recipient Address */}
          <div className="mb-7 flex flex-col gap-1">
            <label
              htmlFor="recipient-address"
              className="block text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-3.5 ml-1"
            >
              Recipient Address
            </label>
            <div className="group relative flex items-center">
              <input
                id="recipient-address"
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter wallet address..."
                className="w-full rounded-xl border border-white/5 bg-white/4 py-4 pl-5 pr-12 text-sm text-white placeholder-neutral-600 transition-all focus:border-white/20 focus:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-white/5"
              />
              <Wallet
                size={18}
                className="absolute right-5 text-neutral-600 transition-colors group-focus-within:text-neutral-400"
              />
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-8 flex flex-col gap-1">
            <div className="flex justify-between items-end mb-3.5 ml-1">
              <label
                htmlFor="amount-input"
                className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500"
              >
                Amount to Send
              </label>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/4 p-6 transition-all focus-within:border-white/20 focus-within:bg-white/[0.07] focus-within:ring-2 focus-within:ring-white/5">
              <div className="flex items-center justify-between mb-2">
                <input
                  id="amount-input"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  max={10}
                  className="w-full bg-transparent text-[40px] font-light text-white outline-none placeholder-neutral-800 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <div className="flex items-center gap-3 ml-4">
                  <span className="text-lg font-semibold text-white whitespace-nowrap">
                    SOL
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-5">
            <button
              onClick={handleConfirm}
              disabled={!recipient || !amount || parseFloat(amount) <= 0}
              className="w-full rounded-xl cursor-pointer bg-linear-to-b from-white to-neutral-100 py-4 text-[15px] font-bold text-black shadow-[0_20px_40px_-12px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.01] hover:shadow-[0_24px_48px_-12px_rgba(255,255,255,0.25)] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Confirm Transaction
            </button>
            <button
              onClick={closeModal}
              className="w-full py-3 rounded-xl cursor-pointer text-sm font-semibold text-neutral-500 transition-all hover:text-white hover:bg-red-500/10 active:scale-98"
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
