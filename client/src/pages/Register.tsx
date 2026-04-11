import { useState } from "react";
import { useLocation } from "wouter";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle, Loader } from "lucide-react";
import { authService } from "@/lib/auth-service";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LoginCard } from "@/components/LoginCard";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { t } = useI18n();

  const passwordStrength = (password: string) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return Math.min(strength, 4);
  };

  const strength = passwordStrength(formData.password);
  const strengthLabels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-emerald-500"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!formData.agreeTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setLoading(true);

    // Simulate registration
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        setLocation("/login");
      }, 2000);
    }, 1500);
  };

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
        <div className="w-full max-w-md">
          <LoginCard title="Create Account" subtitle="Join the Coding Archipelago learning community">
            {success ? (
              <div className="text-center py-8 space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome!</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your account has been created successfully. Redirecting to login...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3 animate-scaleIn">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 dark:text-red-300 text-sm font-medium">{error}</p>
                  </div>
                )}

                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 md:py-3.5 text-base rounded-lg border border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 dark:focus:ring-indigo-400/10 font-medium text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3 md:py-3.5 text-base rounded-lg border border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 dark:focus:ring-indigo-400/10 font-medium text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    I am a...
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 md:py-3.5 text-base rounded-lg border border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 dark:focus:ring-indigo-400/10 font-medium text-gray-900 dark:text-white bg-white dark:bg-slate-700 transition-colors"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="parent">Parent</option>
                  </select>
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
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
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
                  {formData.password && (
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${strengthColors[strength]}`}
                            style={{ width: `${(strength + 1) * 20}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                          {strengthLabels[strength]}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 md:py-3.5 text-base rounded-lg border border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 dark:focus:ring-indigo-400/10 font-medium text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    I agree to the{" "}
                    <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                      Privacy Policy
                    </a>
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 md:py-3.5 rounded-lg font-semibold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span className="hidden xs:inline">Creating account...</span>
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Sign In Link */}
                <div className="text-center pt-2">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Already have an account?{" "}
                    <button
                      onClick={() => setLocation("/login")}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-colors"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </form>
            )}
          </LoginCard>
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
