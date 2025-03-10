"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserSection } from "@/components/UserSection";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between border-b border-solid border-muted-foreground px-8 py-4">
      {/* ESQUERDA */}
      <div className="flex items-center gap-10">
        <Image
          src="/logo_login_sf.png"
          width={173}
          height={39}
          alt="Finance AI"
        />
        <Link
          href="/"
          className={
            pathname === "/" ? "font-bold text-primary" : "text-primary"
          }
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className={
            pathname === "/transactions"
              ? "font-bold text-primary"
              : "text-primary"
          }
        >
          Transações
        </Link>
        <Link
          href="/subscription"
          className={
            pathname === "/subscription"
              ? "font-bold text-primary"
              : "text-primary"
          }
        >
          Assinatura
        </Link>
      </div>
      {/* DIREITA */}
      <UserSection />
    </nav>
  );
};

export default Navbar;
