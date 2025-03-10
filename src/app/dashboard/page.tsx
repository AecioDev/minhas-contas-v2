import { cookies } from "next/headers";
import { verifyToken } from "@/server/services/auth";
import {
  getLancamentos,
  getLancamentosPorCategoria,
  getLancamentosPorMes,
} from "@/server/services/financialService";
import NotAuthorized from "@/components/not-authorized";
import Navbar from "@/components/navbar";
import ResumoFinanceiro from "./components/ResumoFinanceiro";
import Graficos from "./components/Graficos";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userData = token ? verifyToken(token) : null;

  // Sempre adicionar este trecho em páginas que precisam de autenticação
  if (!userData) {
    return <NotAuthorized />;
  }

  // Buscar os dados
  const financialData = (await getLancamentos(userData.id, new Date())) ?? [];
  const lancamentosPorCategoria = await getLancamentosPorCategoria(
    userData.id,
    new Date()
  );
  const lancamentosMensais = await getLancamentosPorMes(
    userData.id,
    new Date()
  );

  return (
    <>
      <Navbar />
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard Financeiro</h1>
        </div>

        {/* Chamando o componente ResumoFinanceiro */}
        <ResumoFinanceiro
          totalReceitas={financialData.totalReceitas}
          totalDespesas={financialData.totalDespesas}
          totalPago={financialData.totalPago}
          totalPagar={financialData.totalPagar}
        />

        <Graficos
          dadosPorCategoria={lancamentosPorCategoria}
          dadosMensais={lancamentosMensais}
        />
      </div>
    </>
  );
}
