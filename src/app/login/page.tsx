"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

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
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://sjc.microlink.io/CNdcXrd9XCCPPBC7kpU0AmaYbU-CNeRCK5HjQwWQEriHeZCmwMIcP_UXrNpajE66xZaXA4IJHyaIlAYjlBdRCg.jpeg')",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex justify-center mb-6">
          <Image
            src="/placeholder.svg?height=100&width=100"
            alt="Logo"
            width={100}
            height={100}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="rememberMe">Lembrar-me</Label>
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link href="/signup" className="text-blue-600 hover:underline">
            Criar uma conta
          </Link>
        </div>
      </div>
    </div>
  );
}
