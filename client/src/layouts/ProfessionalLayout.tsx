import { ReactNode } from "react";
import { useLocation } from "wouter";
import { LogOut, LayoutDashboard, Users, Settings, Menu, X } from "lucide-react";
import { useState } from "react";
import { authService } from "@/lib/auth-service";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/contexts/I18nContext";

interface ProfessionalLayoutProps {
  children: ReactNode;
  role?: "admin" | "teacher" | "parent" | "school";
}

export default function ProfessionalLayout({ children, role = "admin" }: ProfessionalLayoutProps) {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useI18n();

  const handleLogout = async () => {
    await authService.logout();
    setLocation("/");
  };

  const getNavItems = () => {
    const baseItems = [
      { icon: LayoutDashboard, label: "Dashboard", href: `/dashboard` },
    ];

    if (role === "admin") {
      return [
        ...baseItems,
        { icon: Users, label: "Users", href: "/admin/users" },
        { icon: Settings, label: "Settings", href: "/admin/settings" },
      ];
    }

    if (role === "teacher") {
      return [
        ...baseItems,
        { icon: Users, label: "My Students", href: "/teacher/students" },
        { icon: Settings, label: "Classes", href: "/teacher/classes" },
      ];
    }

    if (role === "parent") {
      return [
        ...baseItems,
        { icon: Users, label: "My Children", href: "/parent/children" },
        { icon: Settings, label: "Settings", href: "/parent/settings" },
      ];
    }

    if (role === "school") {
      return [
        ...baseItems,
        { icon: Users, label: "Teachers", href: "/school/teachers" },
        { icon: Users, label: "Students", href: "/school/students" },
        { icon: Settings, label: "Settings", href: "/school/settings" },
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setLocation("/dashboard")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
              D
            </div>
            <span className="font-bold text-gray-900 dark:text-white">Dao-Yu</span>
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {sidebarOpen && (
          <nav className="bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-gray-600 px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  setLocation(item.href);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors font-semibold"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-4">
              <LanguageSwitcher />
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-semibold mt-4"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </nav>
        )}
      </header>

      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:w-64 md:bg-white dark:md:bg-slate-800 md:border-r md:border-gray-200 dark:md:border-gray-700 md:shadow-sm md:z-30">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <button
            onClick={() => setLocation("/dashboard")}
            className="flex items-center gap-3 px-6 py-6 hover:opacity-80 transition-opacity border-b border-gray-200 dark:border-gray-700"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">
              D
            </div>
            <div className="text-gray-900 dark:text-white">
              <div className="font-bold text-lg">Dao-Yu</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">{role} Portal</div>
            </div>
          </button>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => setLocation(item.href)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors font-semibold group"
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-6 space-y-3">
            <LanguageSwitcher />
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 font-semibold transition-colors"
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
