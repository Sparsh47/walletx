import { Wallet } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-3 flex items-center justify-start border-b border-stone-400">
      <Link href="/" className="flex items-center justify-center gap-3">
        <Wallet className="text-stone-100 size-10" />
        <p className="text-stone-100 text-4xl font-bold">WalletX</p>
      </Link>
    </nav>
  );
}
