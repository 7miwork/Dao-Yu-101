import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { authService, DEMO_ACCOUNTS } from "@/lib/auth-service";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted with:", email, password);
    setLoading(true);
    setError("");

    const response = await authService.login(email, password);
    console.log("Login response:", response);
    if (response.success) {
      console.log("Login successful, navigating to dashboard");
      setLocation("/dashboard");
    } else {
      setError(response.error || "Login failed");
      setLoading(false);
    }
  };

  const quickLogin = async (role: string) => {
    console.log("Quick login for role:", role);
    const account = DEMO_ACCOUNTS[role];
    setLoading(true);
    setError("");

    const response = await authService.login(account.email, account.password);
    console.log("Quick login response:", response);
    if (response.success) {
      console.log("Quick login successful, navigating to dashboard");
      setLocation("/dashboard");
    } else {
      setError(response.error || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{t("common.appName")}</span>
        </div>

        {/* Card */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-xl">
          <h1 className="text-2xl font-bold text-white mb-2">{t("login.welcomeBack")}</h1>
          <p className="text-purple-300 mb-8">{t("login.signInContinue")}</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span className="text-red-200 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">{t("login.emailAddress")}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-purple-400 pointer-events-none" />
                <Input
                  type="email"
                  placeholder={t("login.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-purple-400/50 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">{t("login.password")}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-purple-400 pointer-events-none" />
                <Input
                  type="password"
                  placeholder={t("login.passwordPlaceholder")}
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
                <span className="text-purple-300">{t("login.rememberMe")}</span>
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition">{t("login.forgotPassword")}</a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 py-6 text-lg font-semibold disabled:opacity-50"
            >
              {loading ? t("login.signingIn") : t("login.signInButton")}
              {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
            </Button>
          </form>

          {/* Demo Accounts Section - Fixed overlay issue */}
          <div className="my-8 text-center">
            <div className="relative">
              <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
              <div className="relative inline-block bg-slate-900/50 px-4">
                <span className="text-purple-400 text-sm font-medium">{t("login.demoAccounts")}</span>
              </div>
            </div>
          </div>

          {/* Quick Login Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <Button
              type="button"
              disabled={loading}
              onClick={() => quickLogin("student")}
              className="bg-gradient-to-r from-blue-500/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-700 text-white border-0 text-sm disabled:opacity-50"
            >
              {loading ? "..." : t("login.student")}
            </Button>
            <Button
              type="button"
              disabled={loading}
              onClick={() => quickLogin("teacher")}
              className="bg-gradient-to-r from-green-500/80 to-emerald-600/80 hover:from-green-600 hover:to-emerald-700 text-white border-0 text-sm disabled:opacity-50"
            >
              {loading ? "..." : t("login.teacher")}
            </Button>
            <Button
              type="button"
              disabled={loading}
              onClick={() => quickLogin("parent")}
              className="bg-gradient-to-r from-orange-500/80 to-amber-600/80 hover:from-orange-600 hover:to-amber-700 text-white border-0 text-sm disabled:opacity-50"
            >
              {loading ? "..." : t("login.parent")}
            </Button>
            <Button
              type="button"
              disabled={loading}
              onClick={() => quickLogin("admin")}
              className="bg-gradient-to-r from-red-500/80 to-pink-600/80 hover:from-red-600 hover:to-pink-700 text-white border-0 text-sm disabled:opacity-50"
            >
              {loading ? "..." : t("login.admin")}
            </Button>
          </div>

          {/* Demo Credentials Info */}
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-200">
            <p className="font-semibold mb-2">{t("login.demoCredentials")}:</p>
            <p>{t("login.demoPassword")}: <span className="font-mono">demo1234</span></p>
            <p className="mt-2 text-blue-300">{t("login.clickAnyRole")}</p>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-purple-300 mt-8">
            {t("login.noAccount")} <a href="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition">{t("login.signUp")}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
