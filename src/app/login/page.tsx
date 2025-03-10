"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { CircleDollarSign } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: "Login bem-sucedido",
        description: "Você será redirecionado para o dashboard.",
      });
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Email ou senha inválidos.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-center items-center text-white">
      <div className="flex items-center justify-center text-4xl text-secondary mb-4">
        <CircleDollarSign size={34} className="mr-2 text-white " />
        <h1 className="text-white font-bold">Minhas Contas</h1>
      </div>
      <div className="bg-slate-200 p-8 rounded-lg shadow-md w-96 border-2 border-violet-700">
        <div className="flex items-center justify-center text-2xl text-secondary mb-4">
          <h2 className="text-gray-800 font-bold">Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-800" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="informe_seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-black"
              />
            </div>
            <div>
              <Label className="text-gray-800" htmlFor="password">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-black"
              />
            </div>
            <Button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-blue-500 to-purple-600 border border-violet-700 hover:bg-violet-500"
            >
              Entrar
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-between mt-4 text-center space-x-2">
          <div className="flex items-center gap-1">
            <Checkbox
              id="rememberMe"
              className="border-border"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label className="text-gray-800 text-sm" htmlFor="rememberMe">
              Lembrar-me
            </Label>
          </div>
          <Link
            href="/signup"
            className="text-sm text-gray-800 font-semibold hover:text-blue-600 hover:underline"
          >
            Criar uma conta
          </Link>
        </div>
      </div>
    </div>
  );
}
