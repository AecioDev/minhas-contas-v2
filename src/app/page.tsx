import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-center items-center text-white">
      <h1 className="text-5xl font-bold mb-4">
        Controle suas Finanças Pessoais
      </h1>
      <p className="text-xl mb-8 max-w-2xl text-center">
        Tome o controle da sua vida financeira com nossa plataforma intuitiva e
        poderosa. Acompanhe suas receitas, despesas e alcance seus objetivos
        financeiros.
      </p>
      <div className="space-x-4">
        <Button asChild variant="secondary" size="lg">
          <Link href="/signup">Comece Agora - É Grátis!</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/login">Já tem uma conta? Faça Login</Link>
        </Button>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Fácil de Usar</h2>
          <p>
            Interface intuitiva que torna o gerenciamento financeiro simples e
            rápido.
          </p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Insights Poderosos</h2>
          <p>
            Visualize seus gastos e ganhos com gráficos e relatórios detalhados.
          </p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Seguro e Confiável</h2>
          <p>
            Seus dados são protegidos com a mais alta segurança e criptografia.
          </p>
        </div>
      </div>
    </div>
  );
}
