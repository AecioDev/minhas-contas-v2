"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

type GraficosProps = {
  dadosPorCategoria: { categoria: string; ganhos: number; gastos: number }[]; // Dados para o gráfico de pizza
  dadosMensais: { mes: string; ganhos: number; gastos: number }[]; // Dados para o gráfico de barras
};

export default function Graficos({
  dadosPorCategoria,
  dadosMensais,
}: GraficosProps) {
  const [tipo, setTipo] = useState("");
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para gerar o relatório
    //console.log('Filtros:', { tipo, categoria, descricao })
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 ">
        <h1 className="font-bold text-primary">Filtros</h1>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo: </Label>
                <Select onValueChange={setTipo}>
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="R">Ganho</SelectItem>
                    <SelectItem value="D">Gasto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Gráfico de Pizza */}
        <Card>
          <CardHeader>
            <CardTitle>
              Gráfico de {tipo === "D" ? "Gastos" : "Ganhos"} por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dadosPorCategoria}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dadosPorCategoria.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Barras */}
        <Card>
          <CardHeader>
            <CardTitle>Ganhos e Gastos por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosMensais}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ganhos" fill="#82ca9d" name="Ganhos" />
                <Bar dataKey="gastos" fill="#8884d8" name="Gastos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
