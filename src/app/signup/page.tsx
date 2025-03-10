"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleDollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setRole("admin");

    if (password !== confPassword) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "As senhas não coincidem!",
      });
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          role,
        }),
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Erro no cadastro",
          description: "Erro ao cadastrar usuário.",
        });
      }

      toast({
        title: "Cadastro realizado com sucesso!",
        description:
          "Você será redirecionado para a página de login em 3 segundos.",
      });

      // Redirecionar após 3 segundos
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: "Ocorreu um erro. Tente novamente.",
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
          <h2 className="font-bold">Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-800" htmlFor="name">
                Nome
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label className="text-gray-800" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                />
              </div>
              <div>
                <Label className="text-gray-800" htmlFor="password">
                  Confirmar Senha
                </Label>
                <Input
                  id="confPassword"
                  type="password"
                  placeholder="********"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label className="text-gray-800" htmlFor="phone">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-blue-500 to-purple-600 border border-violet-700 hover:bg-violet-500"
            >
              Cadastrar
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link href="/login" className="text-blue-600 hover:underline">
            Já tem uma conta? Faça login
          </Link>
        </div>
      </div>
    </div>
  );
}
