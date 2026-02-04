import Link from "next/link";

export default function Home() {
  return (
    <section className="section">
      <div>
        <h1 className="section-heading">
          WalletX supports only Solana for now
        </h1>
        <p className="section-subheading">More coming soon...</p>
      </div>
      <div>
        <Link href="/solana" className="btn">
          Solana
        </Link>
      </div>
    </section>
  );
}
