"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotAuthorized() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      router.push("/login");
    }, 5000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-xl font-bold">Não autorizado</p>
      <p>Redirecionando para o login em {countdown} segundos...</p>
      <button
        onClick={() => router.push("/login")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Ir para Login agora
      </button>
    </div>
  );
}
