import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLocation("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dao-Yu</span>
        </div>

        {/* Card */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-xl">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-purple-300 mb-8">Sign in to continue your learning journey</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-purple-400/50 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-purple-400/50 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-purple-500/30 bg-slate-700/50" />
                <span className="text-purple-300">Remember me</span>
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition">Forgot password?</a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 py-6 text-lg font-semibold"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-500/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900/50 text-purple-400">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-3 gap-4">
            <Button variant="outline" className="border-purple-500/30 text-purple-200 hover:bg-purple-500/10">Google</Button>
            <Button variant="outline" className="border-purple-500/30 text-purple-200 hover:bg-purple-500/10">GitHub</Button>
            <Button variant="outline" className="border-purple-500/30 text-purple-200 hover:bg-purple-500/10">Apple</Button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-purple-300 mt-8">
            Don't have an account? <a href="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
