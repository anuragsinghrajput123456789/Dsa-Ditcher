import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Code, Sparkles, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        toast({ title: "Account Created! 🎉", description: "Successfully registered and authenticated." });
        navigate("/");
      } else {
        toast({ title: "Registration Failed", description: data.message || "Error creating account", variant: "destructive" });
      }
    } catch (error) {
       toast({ title: "Database Offline", description: "Could not establish connection to registration server.", variant: "destructive" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-background p-4 relative overflow-hidden">
      {/* Dynamic ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-pink-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="glass-card shadow-2xl border border-border/50 rounded-3xl overflow-hidden">
          {/* Top colored accent line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500"></div>

          <CardHeader className="space-y-3 pt-8 pb-6">
            <div className="flex justify-center mb-1">
              <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 animate-pulse">
                <Code className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-3xl font-black text-center tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground/80 bg-clip-text text-transparent">
                Get Started
              </CardTitle>
              <CardDescription className="text-center font-semibold text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Initialize your personalized learning parameters
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-6 sm:px-8">
            <form onSubmit={handleSignup} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  className="bg-background/50 border-2 border-border/40 focus:border-primary/50 focus:ring-0 rounded-xl h-11 font-semibold text-sm transition-all placeholder:text-muted-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="bg-background/50 border-2 border-border/40 focus:border-primary/50 focus:ring-0 rounded-xl h-11 font-semibold text-sm transition-all placeholder:text-muted-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="bg-background/50 border-2 border-border/40 focus:border-primary/50 focus:ring-0 rounded-xl h-11 font-semibold text-sm transition-all placeholder:text-muted-foreground/50"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold h-11 rounded-xl shadow-lg shadow-purple-500/10 hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                <UserPlus className="w-4 h-4" />
                <span>Create Account</span>
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center border-t border-border/40 bg-muted/20 py-5 mt-8 px-6 sm:px-8">
            <p className="text-xs sm:text-sm text-muted-foreground font-semibold">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:text-primary/95 hover:underline font-bold inline-flex items-center gap-0.5">
                Authenticate
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
