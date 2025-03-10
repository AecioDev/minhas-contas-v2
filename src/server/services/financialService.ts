import { prisma } from "@/lib/prisma";

interface LancamentosTotal {
  totalDespesas: number;
  totalReceitas: number;
  totalPago: number;
  totalPagar: number;
}

//export async function getLancamentos(userId: number, data: Date)  {
export async function getLancamentos(
  userId: number,
  data: Date
): Promise<LancamentosTotal> {
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

type MesLancamento = {
  mes: string;
  ganhos: number;
  gastos: number;
};

export async function getLancamentosPorMes(
  userId: number,
  data: Date
): Promise<MesLancamento[]> {
  // Busca os Lançamentos
  const lancamentos = await getLancamentosDoMes(userId, data);

  // Agrupar os lançamentos por mês
  const lancamentosPorMes: MesLancamento[] = [];

  // Vamos agrupar os lançamentos por mês
  for (let i = 1; i <= 12; i++) {
    const mesLancamentos = lancamentos.filter((lancamento) => {
      const mesLanca = new Date(lancamento.data).getMonth() + 1; // Mês do lançamento
      return mesLanca === i;
    });

    // Calcular ganhos e gastos para esse mês
    const ganhos = mesLancamentos
      .filter((lancamento) => lancamento.evento.category.tipo === "Receita")
      .reduce((acc, lancamento) => acc + lancamento.valor, 0);

    const gastos = mesLancamentos
      .filter((lancamento) => lancamento.evento.category.tipo === "Despesa")
      .reduce((acc, lancamento) => acc + lancamento.valor, 0);

    lancamentosPorMes.push({
      mes: getMesNome(i), // Função para pegar o nome do mês
      ganhos,
      gastos,
    });
  }

  return lancamentosPorMes;
}

type CategoriaLancamento = {
  categoria: string;
  ganhos: number;
  gastos: number;
};

export async function getLancamentosPorCategoria(
  userId: number,
  data: Date
): Promise<CategoriaLancamento[]> {
  // Busca os Lançamentos
  const lancamentos = await getLancamentosDoMes(userId, data);

  // Agrupar os lançamentos por categoria
  const lancamentosPorCategoria: CategoriaLancamento[] = [];

  // Obter categorias únicas
  const categorias = Array.from(
    new Set(
      lancamentos.map((lancamento) => lancamento.evento.category.descricao)
    ) // Extrai os nomes das categorias
  );

  // Vamos agrupar os lançamentos por categoria
  categorias.forEach((categoria) => {
    const lancamentosCategoria = lancamentos.filter(
      (lancamento) => lancamento.evento.category.descricao === categoria
    );

    // Calcular ganhos e gastos para essa categoria
    const ganhos = lancamentosCategoria
      .filter((lancamento) => lancamento.evento.category.tipo === "Receita")
      .reduce((acc, lancamento) => acc + lancamento.valor, 0);

    const gastos = lancamentosCategoria
      .filter((lancamento) => lancamento.evento.category.tipo === "Despesa")
      .reduce((acc, lancamento) => acc + lancamento.valor, 0);

    lancamentosPorCategoria.push({
      categoria,
      ganhos,
      gastos,
    });
  });

  return lancamentosPorCategoria;
}

async function getLancamentosDoMes(userId: number, data: Date) {
  const ano = data.getFullYear();
  const mes = data.getMonth() + 1; // getMonth() retorna de 0 a 11, por isso somamos 1

  // Buscar os lançamentos para o mês e ano fornecido
  const lancamentos = await prisma.lancamentos.findMany({
    where: {
      userId: userId, // Filtra pelo userId
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

  return lancamentos;
}

// Função para retornar o nome do mês
function getMesNome(mes: number): string {
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return meses[mes - 1];
}
