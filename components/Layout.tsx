"use client";

import { ReactNode } from "react";
import Navbar from "./Navbar";
import WalletProvider from "@/providers/WalletProvider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <WalletProvider>
      <div>
        <Navbar />
        {children}
      </div>
    </WalletProvider>
  );
}
