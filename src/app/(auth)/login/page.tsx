"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import galloLogo from "@/media/avatar/gallo-logo.png";
import galloAdventurer from "@/media/avatar/gallo-adventurer.png";
import galloHacker from "@/media/avatar/gallo-hacker.png";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email ou senha incorretos.");
    } else {
      router.push("/playground");
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-center gap-8">
      {/* Mascot left — Aventureiro */}
      <div className="hidden lg:flex items-end">
        <div className="relative h-72 w-56">
          <Image
            src={galloAdventurer}
            alt="Aventureiro"
            fill
            className="object-contain"
            sizes="224px"
          />
        </div>
      </div>

      {/* Login form */}
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Image
            src={galloLogo}
            alt="GalloGo"
            className="mx-auto mb-4"
            width={200}
            height={60}
            priority
          />
          <h1 className="text-2xl font-bold text-content">Entrar no GalloGo</h1>
          <p className="mt-1 text-sm text-content-muted">
            Digite seu email e senha para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-content-secondary"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              className="w-full rounded-[var(--radius-md)] border border-border bg-surface-secondary px-4 py-3 text-content outline-none focus:border-primary transition-colors"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-content-secondary"
            >
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-[var(--radius-md)] border border-border bg-surface-secondary px-4 py-3 pr-12 text-content outline-none focus:border-primary transition-colors"
                placeholder="Sua senha"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content transition-colors"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2}>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-error">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[var(--radius-md)] bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50 transition-colors"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-surface px-2 text-content-muted">ou continue com</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/playground" })}
            className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-border py-2.5 text-sm font-medium text-content-secondary hover:bg-surface-secondary transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button
            type="button"
            onClick={() => signIn("microsoft-entra-id", { callbackUrl: "/playground" })}
            className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-border py-2.5 text-sm font-medium text-content-secondary hover:bg-surface-secondary transition-colors"
          >
            <svg viewBox="0 0 23 23" className="h-5 w-5">
              <rect x="1" y="1" width="10" height="10" fill="#f25022"/>
              <rect x="12" y="1" width="10" height="10" fill="#7fba00"/>
              <rect x="1" y="12" width="10" height="10" fill="#00a4ef"/>
              <rect x="12" y="12" width="10" height="10" fill="#ffb900"/>
            </svg>
            Microsoft
          </button>
        </div>

        <p className="text-center text-sm text-content-muted">
          Não tem conta?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Cadastre-se
          </Link>
        </p>
      </div>

      {/* Mascot right — Hacker */}
      <div className="hidden lg:flex items-end">
        <div className="relative h-72 w-52">
          <Image
            src={galloHacker}
            alt="Hacker"
            fill
            className="object-contain"
            sizes="208px"
          />
        </div>
      </div>
    </div>
  );
}
