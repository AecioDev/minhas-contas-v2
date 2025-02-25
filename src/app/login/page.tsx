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
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-black opacity-90"
      style={{
        backgroundImage: "url('/bg_login.jpg')",
      }}
    >
      <div className="bg-transparent p-8 rounded-lg shadow-md w-96 border-2 border-border">
        <div className="flex items-center justify-center text-4xl text-secondary mb-4">
          <CircleDollarSign size={32} className="mr-2" />
          <h1 className="font-bold">Minhas Contas</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label className="text-muted" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-muted bg-gray-700 "
                required
              />
            </div>
            <div>
              <Label className="text-muted" htmlFor="password">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-muted bg-gray-700 "
                required
              />
            </div>
            <Button type="submit" className="w-full hover:bg-slate-700">
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
            <Label className="text-muted text-sm" htmlFor="rememberMe">
              Lembrar-me
            </Label>
          </div>
          <Link
            href="/signup"
            className="text-sm text-muted font-semibold hover:text-blue-600 hover:underline"
          >
            Criar uma conta
          </Link>
        </div>
      </div>
    </div>
  );
}
