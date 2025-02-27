import { prisma } from "@/lib/prisma";

interface LancamentosData {
  totalDespesas: number;
  totalReceitas: number;
  totalPago: number;
  totalPagar: number;
}

//export async function getLancamentos(userId: number, data: Date)  {
export async function getLancamentos(
  userId: number,
  data: Date
): Promise<LancamentosData> {
  const ano = data.getFullYear();
  const mes = data.getMonth() + 1; // getMonth() retorna um índice de 0 a 11, então somamos 1

  const lancamentos = await prisma.lancamentos.findMany({
    where: {
      userId: userId, // Convertendo para número, caso necessário
      data: {
        gte: new Date(ano, mes - 1, 1), // Primeiro dia do mês
        lt: new Date(ano, mes, 1), // Primeiro dia do próximo mês
      },
    },
    include: {
      evento: {
        include: {
          category: true, // Inclui a categoria do evento, se necessário
        },
      },
    },
  });

  const despesas = lancamentos.filter(
    (lancamento) => lancamento.evento.category.tipo === "Despesa"
  );

  const receitas = lancamentos.filter(
    (lancamento) => lancamento.evento.category.tipo === "Receita"
  );

  const totalDespesas = despesas.reduce(
    (acc, despesa) => acc + despesa.valor,
    0
  );
  const totalReceitas = receitas.reduce(
    (acc, receita) => acc + receita.valor,
    0
  );
  const totalPago = despesas
    .filter((despesa) => despesa.status)
    .reduce((acc, despesa) => acc + despesa.valor, 0);
  const totalPagar = totalDespesas - totalPago;

  return {
    totalDespesas,
    totalReceitas,
    totalPago,
    totalPagar,
  };
}
