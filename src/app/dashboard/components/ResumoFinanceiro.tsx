import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResumoFinanceiroProps {
  totalReceitas: number;
  totalDespesas: number;
  totalPago: number;
  totalPagar: number;
}

export default function ResumoFinanceiro({
  totalReceitas,
  totalDespesas,
  totalPago,
  totalPagar,
}: ResumoFinanceiroProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Receitas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            R$ {totalReceitas.toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Despesas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            R$ {totalDespesas.toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ {totalPago.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total a Pagar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ {totalPagar.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  );
}
