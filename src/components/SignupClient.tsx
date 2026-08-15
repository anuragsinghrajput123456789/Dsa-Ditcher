'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Code, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { IUser } from "@/types";

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
    <div className="flex items-center justify-center min-h-screen bg-background p-4 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <Card className="glass-card shadow-2xl border border-border/50 rounded-3xl overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-indigo-600 to-purple-500"></div>

          <CardHeader className="space-y-3 pt-8 pb-6">
            <div className="flex justify-center mb-1">
              <div className="w-14 h-14 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/20">
                <Code className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-3xl font-black text-center tracking-tight">
                Create Account
              </CardTitle>
              <CardDescription className="text-center font-semibold text-xs sm:text-sm text-muted-foreground">
                Join AlgoSpark to track streaks and master DSA algorithms
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-6 sm:px-8">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  className="rounded-xl border-border/80 h-10 focus:border-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="rounded-xl border-border/80 h-10 focus:border-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="rounded-xl border-border/80 h-10 focus:border-violet-500"
                />
              </div>

              <Button 
                type="submit" 
                variant="gradient"
                disabled={loading}
                className="w-full h-11 rounded-xl font-bold shadow-lg shadow-violet-500/20 text-sm gap-2 mt-2"
              >
                <span>{loading ? "Creating Account..." : "Create Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>

          <div className="p-6 bg-secondary/30 border-t border-border/40 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-violet-400 font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
