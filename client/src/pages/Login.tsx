import { Button } from "@/components/ui/button";
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { authService, DEMO_ACCOUNTS } from "@/lib/auth-service";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

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

  const quickLogin = async (role: string) => {
    const account = DEMO_ACCOUNTS[role];
    setLoading(true);
    setError("");

    const response = await authService.login(account.email, account.password);
    if (response.success) {
      setLocation("/dashboard");
    } else {
      setError(response.error || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-cyan-300 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fadeInUp">
          <div className="inline-flex items-center justify-center w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full mb-3 sm:mb-4 shadow-lg border-4 border-white transform hover:rotate-12 transition-transform">
            <span className="text-5xl sm:text-6xl">🎮</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg mb-2">Dao-Yu-101</h1>
          <p className="text-base sm:text-lg text-white font-bold drop-shadow-md">{t("login.welcomeBack")}</p>
        </div>

        {/* Language Switcher */}
        <div className="flex justify-end mb-4 sm:mb-6">
          <LanguageSwitcher />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-400 border-4 border-white rounded-xl sm:rounded-2xl flex items-start gap-3 animate-scaleIn shadow-lg">
            <AlertCircle className="w-5 sm:w-6 h-5 sm:h-6 text-white flex-shrink-0 mt-0.5 drop-shadow-lg" />
            <p className="text-white font-bold text-sm sm:text-base drop-shadow-md">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-4 sm:mb-6 animate-slideInRight border-6 sm:border-8 border-yellow-300 shadow-2xl">
          <div className="space-y-4 sm:space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-900 mb-2">{t("login.email")}</label>
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-5 sm:w-6 h-5 sm:h-6 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-base sm:text-lg rounded-xl sm:rounded-2xl border-3 sm:border-4 border-yellow-300 focus:border-green-400 focus:outline-none font-bold text-gray-900 placeholder-gray-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-900 mb-2">{t("login.password")}</label>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-5 sm:w-6 h-5 sm:h-6 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-3 sm:py-4 text-base sm:text-lg rounded-xl sm:rounded-2xl border-3 sm:border-4 border-yellow-300 focus:border-green-400 focus:outline-none font-bold text-gray-900 placeholder-gray-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 sm:w-6 h-5 sm:h-6" /> : <Eye className="w-5 sm:w-6 h-5 sm:h-6" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-0 text-xs sm:text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 sm:w-5 h-4 sm:h-5 rounded border-2 border-yellow-300 text-green-500 font-bold" />
                <span className="text-gray-700 font-bold">{t("login.rememberMe")}</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-bold">
                {t("login.forgotPassword")}
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-4 border-white shadow-lg transform hover:scale-105"
            >
              {loading ? (
                <>
                  <div className="w-5 sm:w-6 h-5 sm:h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="hidden xs:inline">{t("login.signingIn")}</span>
                </>
              ) : (
                <>
                  {t("login.signIn")}
                  <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6" />
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Demo Accounts */}
        <div className="mb-4 sm:mb-6">
          <div className="relative mb-4 sm:mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-4 border-white"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-3 sm:px-4 bg-cyan-300 text-gray-900 font-bold drop-shadow-md">{t("login.demoAccounts")}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {Object.entries(DEMO_ACCOUNTS).map(([role, account]) => (
              <button
                key={role}
                onClick={() => quickLogin(role)}
                disabled={loading}
                className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border-4 border-yellow-300 bg-gradient-to-br from-yellow-200 to-orange-200 hover:from-yellow-300 hover:to-orange-300 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm font-black text-gray-900 shadow-lg"
              >
                <div className="capitalize font-black text-gray-900">{role}</div>
                <div className="text-xs font-bold text-gray-800 mt-1 break-all">{account.email}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-900 font-bold text-sm sm:text-base drop-shadow-md">
            {t("login.noAccount")}{" "}
            <button
              onClick={() => setLocation("/register")}
              className="text-blue-600 hover:text-blue-700 font-black transition-colors"
            >
              {t("login.signUp")}
            </button>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4 sm:mt-6">
          <button
            onClick={() => setLocation("/")}
            className="text-white font-bold text-sm sm:text-base hover:underline drop-shadow-md"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
