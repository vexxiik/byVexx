"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Neplatné údaje. Zkuste to znovu.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("Něco se pokazilo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#f9fafb] flex items-center justify-center p-4 font-sans selection:bg-blue-500/30">
      <m.div 
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[380px]"
      >
        <div className="flex justify-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#111]">
            Vexx<span className="text-[#3b82f6]">.</span> CRM
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-100 p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Přihlášení</h2>
            <p className="text-sm text-gray-500 mt-1">Vítejte zpět, zadejte své údaje.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vase@emailova.adresa"
                required
                className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:bg-white transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
                Heslo
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:bg-white transition-all"
              />
            </div>

            {error && (
              <m.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sm text-red-500 font-medium bg-red-50 p-3 rounded-lg"
              >
                {error}
              </m.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 mt-2 bg-[#111] hover:bg-[#222] text-white font-medium rounded-lg text-sm transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Přihlásit se"}
            </button>
          </form>
        </div>
      </m.div>
    </div>
  );
}
