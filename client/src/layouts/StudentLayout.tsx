import { ReactNode } from "react";
import { useLocation } from "wouter";
import { LogOut, Home, BookOpen, Trophy, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { authService } from "@/lib/auth-service";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/contexts/I18nContext";

interface StudentLayoutProps {
  children: ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useI18n();

  const handleLogout = async () => {
    await authService.logout();
    setLocation("/");
  };

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/student/dashboard" },
    { icon: BookOpen, label: "Archipelago", href: "/archipelago" },
    { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
    { icon: User, label: "Profile", href: "/student/profile" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 bg-gradient-to-r from-indigo-600 to-blue-600 border-b-4 border-yellow-400 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setLocation("/student/dashboard")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-indigo-600">
              🏝️
            </div>
            <span className="text-white font-bold text-lg">Dao-Yu</span>
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {sidebarOpen && (
          <nav className="bg-indigo-700 border-t-2 border-yellow-400 px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  setLocation(item.href);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-indigo-600 transition-colors font-semibold"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
            <div className="border-t border-indigo-600 pt-4 mt-4">
              <LanguageSwitcher />
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-red-600 transition-colors font-semibold mt-4"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </nav>
        )}
      </header>

      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:w-64 md:bg-gradient-to-b md:from-indigo-600 md:to-blue-600 md:border-r-4 md:border-yellow-400 md:shadow-xl md:z-30">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <button
            onClick={() => setLocation("/student/dashboard")}
            className="flex items-center gap-3 px-6 py-6 hover:opacity-80 transition-opacity border-b-2 border-yellow-400"
          >
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center font-bold text-2xl">
              🏝️
            </div>
            <div className="text-white">
              <div className="font-bold text-lg">Dao-Yu</div>
              <div className="text-xs text-indigo-200">Learning Quest</div>
            </div>
          </button>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => setLocation(item.href)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/20 transition-colors font-semibold group"
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t-2 border-yellow-400 px-4 py-6 space-y-3">
            <LanguageSwitcher />
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
