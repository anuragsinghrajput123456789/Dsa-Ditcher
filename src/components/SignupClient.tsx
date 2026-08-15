'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Code2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { IUser } from "@/types";
import FuturisticBackground from "@/components/backgrounds/FuturisticBackground";

export default function SignupClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const data = await api.post<IUser>('/api/auth/register', { name, email, password });
      login(data);
      toast.success("Account created successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FuturisticBackground>
      <div className="flex items-center justify-center min-h-screen p-4 relative">
        <div className="w-full max-w-md relative z-10 animate-fade-in">
          <div className="glass-panel rounded-3xl overflow-hidden border border-violet-500/30 shadow-2xl space-y-6">
            <div className="h-1.5 w-full bg-gradient-to-r from-violet-600 via-purple-600 to-magenta-600"></div>

            <div className="px-8 pt-4 pb-2 text-center space-y-3">
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-magenta-600 p-0.5 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                  <div className="w-full h-full bg-[#0E0A1F] rounded-[14px] flex items-center justify-center">
                    <Code2 className="w-7 h-7 text-violet-400" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white tracking-tight">
                  Create Laboratory Account
                </h1>
                <p className="text-xs text-[#B8B1CC] mt-1">
                  Track active streaks & master technical algorithms
                </p>
              </div>
            </div>

            <div className="px-8">
              <form onSubmit={handleSignup} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[#B8B1CC] uppercase tracking-wider text-[10px]">Full Name</label>
                  <input 
                    id="name" 
                    type="text" 
                    placeholder="Developer Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className="w-full h-10 px-3 rounded-xl bg-[#05030D] border border-violet-500/30 text-white focus:ring-1 focus:ring-violet-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#B8B1CC] uppercase tracking-wider text-[10px]">Email Address</label>
                  <input 
                    id="email" 
                    type="email" 
                    placeholder="developer@algospark.local" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="w-full h-10 px-3 rounded-xl bg-[#05030D] border border-violet-500/30 text-white focus:ring-1 focus:ring-violet-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#B8B1CC] uppercase tracking-wider text-[10px]">Password</label>
                  <input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="w-full h-10 px-3 rounded-xl bg-[#05030D] border border-violet-500/30 text-white focus:ring-1 focus:ring-violet-500 outline-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-10 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(139,92,246,0.3)] gap-2 mt-2"
                >
                  <span>{loading ? "Creating Account..." : "Create Account"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>

            <div className="p-5 bg-[#05030D]/80 border-t border-violet-500/15 text-center text-xs text-[#B8B1CC]">
              Already have an account?{" "}
              <Link href="/login" className="text-violet-300 font-bold hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </FuturisticBackground>
  );
}
