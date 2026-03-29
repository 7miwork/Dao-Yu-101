import { useState } from "react";
import { useLocation } from "wouter";
import { BookOpen, LogOut, Users, TrendingUp, Award, Menu, X, BarChart3, Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { authService, User } from "@/lib/auth-service";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const weeklyData = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 300 },
  { name: "Wed", value: 200 },
  { name: "Thu", value: 278 },
  { name: "Fri", value: 189 },
  { name: "Sat", value: 239 },
  { name: "Sun", value: 349 },
];

const performanceData = [
  { name: "Excellent", value: 45, color: "#10b981" },
  { name: "Good", value: 30, color: "#3b82f6" },
  { name: "Average", value: 15, color: "#f59e0b" },
  { name: "Needs Help", value: 10, color: "#ef4444" },
];

export default function ProfessionalDashboard({ user }: { user: User }) {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useI18n();

  const handleLogout = async () => {
    await authService.logout();
    setLocation("/");
  };

  const getRoleLabel = (role: string) => {
    const roleLabels: Record<string, string> = {
      teacher: "Teacher Dashboard",
      parent: "Parent Portal",
      admin: "Admin Console",
      school: "School Management",
    };
    return roleLabels[role] || "Dashboard";
  };

  const getMenuItems = (role: string) => {
    const baseItems = [
      { icon: <BarChart3 className="w-5 h-5" />, label: "Overview", active: true },
      { icon: <Users className="w-5 h-5" />, label: "Users", active: false },
      { icon: <TrendingUp className="w-5 h-5" />, label: "Analytics", active: false },
      { icon: <Settings className="w-5 h-5" />, label: "Settings", active: false },
    ];

    if (role === "teacher") {
      return [
        { icon: <Users className="w-5 h-5" />, label: "My Classes", active: true },
        { icon: <TrendingUp className="w-5 h-5" />, label: "Student Progress", active: false },
        { icon: <BookOpen className="w-5 h-5" />, label: "Assignments", active: false },
        { icon: <Bell className="w-5 h-5" />, label: "Notifications", active: false },
      ];
    }

    if (role === "parent") {
      return [
        { icon: <Users className="w-5 h-5" />, label: "My Children", active: true },
        { icon: <TrendingUp className="w-5 h-5" />, label: "Progress Reports", active: false },
        { icon: <Bell className="w-5 h-5" />, label: "Alerts", active: false },
        { icon: <Settings className="w-5 h-5" />, label: "Settings", active: false },
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems(user.role);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/50" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-gray-800 z-50 transform transition-transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">Dao-Yu</span>
              <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                item.active
                  ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 space-y-3">
          <Button
            onClick={handleLogout}
            className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 border-0"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-gray-900 dark:text-white"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{getRoleLabel(user.role)}</h1>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <img src={user.avatar} alt={user.firstName} className="w-10 h-10 rounded-full shadow-md" />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user.firstName}!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {user.role === "teacher" && "Manage your classes and track student progress"}
              {user.role === "parent" && "Monitor your children's learning journey"}
              {user.role === "admin" && "Oversee platform operations and user management"}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Active Users", value: "1,234", color: "from-blue-500 to-cyan-500" },
              { label: "Courses", value: "45", color: "from-indigo-500 to-purple-500" },
              { label: "Completion Rate", value: "78%", color: "from-green-500 to-emerald-500" },
              { label: "Avg. Score", value: "82%", color: "from-orange-500 to-red-500" },
            ].map((stat, idx) => (
              <div key={idx} className="card-modern p-6">
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Activity Chart */}
            <div className="lg:col-span-2 card-modern p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Weekly Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(0,0,0,0.5)" />
                  <YAxis stroke="rgba(0,0,0,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.95)",
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Performance Distribution */}
            <div className="card-modern p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2 text-sm">
                {performanceData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "View Reports", description: "Access detailed analytics" },
              { title: "Manage Users", description: "Add or edit user accounts" },
              { title: "Settings", description: "Configure preferences" },
            ].map((action, idx) => (
              <button key={idx} className="card-modern p-6 text-left hover:shadow-lg transition">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{action.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
