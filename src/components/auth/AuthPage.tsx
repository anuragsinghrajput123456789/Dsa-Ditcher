import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Github, Twitter, Mail, LogIn, UserPlus, Zap } from "lucide-react"; // Replacing Google icon with Zap
import { useNavigate } from "react-router-dom";

type AuthView = "signIn" | "signUp";

export default function AuthPage() {
  const [authView, setAuthView] = useState<AuthView>("signUp");
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const { user, loading: userLoading } = useSupabaseAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user && !userLoading) {
    navigate("/");
    return null;
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
    if (err) setErr(null);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    if (authView === "signIn") {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) setErr(error.message);
    } else {
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { emailRedirectTo: redirectUrl },
      });
      if (error) setErr(error.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      <div className="bg-white rounded-xl shadow-2xl p-7 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {authView === "signIn" ? "Sign In to DSA Pathfinder" : "Sign Up for DSA Pathfinder"}
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInput}
            required
            autoComplete="email"
            disabled={loading}
            className="bg-muted"
          />
          <Input
            type="password"
            name="password"
            placeholder="Set your password"
            value={form.password}
            onChange={handleInput}
            required
            autoComplete={authView === "signIn" ? "current-password" : "new-password"}
            disabled={loading}
            className="bg-muted"
          />
          {err && <div className="text-destructive text-sm">{err}</div>}
          <Button className="w-full flex justify-center" type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 animate-spin" />}
            {authView === "signIn" ? <LogIn className="mr-2" /> : <UserPlus className="mr-2" />}
            {authView === "signIn" ? "Sign In" : "Sign Up"}
          </Button>
        </form>

        <div className="pt-5 text-center">
          {authView === "signIn" ? (
            <>
              <span>New here?</span>
              <Button
                variant="link"
                size="sm"
                type="button"
                className="pl-2"
                onClick={() => setAuthView("signUp")}
                disabled={loading}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <span>Already have an account?</span>
              <Button
                variant="link"
                size="sm"
                type="button"
                className="pl-2"
                onClick={() => setAuthView("signIn")}
                disabled={loading}
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
