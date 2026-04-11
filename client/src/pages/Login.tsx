import { useState } from "react";
import { useLocation } from "wouter";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader } from "lucide-react";
import { authService, DEMO_ACCOUNTS } from "@/lib/auth-service";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LoginCard } from "@/components/LoginCard";
import { DemoAccountCard } from "@/components/DemoAccountCard";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await authService.login(email, password);
    if (response.success) {
      setLocation("/dashboard");
    } else {
      setError(response.error || "Login failed");
      setLoading(false);
    }
  };

  const quickLogin = async (accountEmail: string, accountPassword: string) => {
    setEmail(accountEmail);
    setPassword(accountPassword);
    setLoading(true);
    setError("");

    const response = await authService.login(accountEmail, accountPassword);
    if (response.success) {
      setLocation("/dashboard");
    } else {
      setError(response.error || "Login failed");
      setLoading(false);
    }
  };

  const demoAccountsList = Object.entries(DEMO_ACCOUNTS).map(([role, account]) => ({
    role,
    email: account.email,
    password: account.password,
    icon: role === "student" ? "🎓" : role === "teacher" ? "👨‍🏫" : role === "parent" ? "👨‍👩‍👧" : "🔑",
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold text-white">D</span>
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent hidden xs:inline">
              Dao-Yu-101
            </span>
          </button>
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setLocation("/")}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Desktop: 2-Column Layout */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Branding & Welcome (Hidden on Mobile) */}
          <div className="hidden lg:flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 w-fit">
                <span className="text-2xl">🏝️</span>
                <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                  Learning Platform
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Welcome Back
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
                  Sign in to your account and continue your learning journey through the Coding Archipelago.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 pt-8">
                {[
                  { icon: "🎮", text: "Gamified learning experience" },
                  { icon: "📊", text: "Track your progress in real-time" },
                  { icon: "🏆", text: "Earn badges and climb the leaderboard" },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full space-y-8">
            {/* Login Form Card */}
            <LoginCard title="Sign In" subtitle="Enter your credentials to access your account">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3 animate-scaleIn">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 dark:text-red-300 text-sm font-medium">{error}</p>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3 md:py-3.5 text-base rounded-lg border border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 dark:focus:ring-indigo-400/10 font-medium text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 md:py-3.5 text-base rounded-lg border border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 dark:focus:ring-indigo-400/10 font-medium text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-0 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600"
                    />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 md:py-3.5 rounded-lg font-semibold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span className="hidden xs:inline">Signing in...</span>
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Sign Up Link */}
                <div className="text-center pt-2">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Don't have an account?{" "}
                    <button
                      onClick={() => setLocation("/register")}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-colors"
                    >
                      Create one
                    </button>
                  </p>
                </div>
              </form>
            </LoginCard>

            {/* Demo Accounts Section */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-400 font-semibold">
                    Try Demo Accounts
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {demoAccountsList.map((account) => (
                  <DemoAccountCard
                    key={account.role}
                    account={account}
                    onSelect={quickLogin}
                    loading={loading}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-900/50 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2026 Dao-Yu-101. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
