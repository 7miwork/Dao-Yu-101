import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { BookOpen, Users, TrendingUp, Award, LogOut, Settings } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { authService, User } from "@/lib/auth-service";

const data = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 300 },
  { name: "Wed", value: 200 },
  { name: "Thu", value: 278 },
  { name: "Fri", value: 189 },
  { name: "Sat", value: 239 },
  { name: "Sun", value: 349 },
];

const progressData = [
  { name: "Week 1", progress: 20 },
  { name: "Week 2", progress: 35 },
  { name: "Week 3", progress: 50 },
  { name: "Week 4", progress: 65 },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      setLocation("/login");
    } else {
      setUser(currentUser);
      setLoading(false);
    }
  }, [setLocation]);

  const handleLogout = async () => {
    await authService.logout();
    setLocation("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-500/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dao-Yu</span>
              <p className="text-xs text-purple-300 capitalize">{user.role} Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img src={user.avatar} alt={user.firstName} className="w-10 h-10 rounded-full" />
              <div className="text-right">
                <p className="text-white font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-purple-300 capitalize">{user.role}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-purple-500/30 text-purple-200 hover:bg-purple-500/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user.firstName}!</h1>
          <p className="text-purple-300">Here's your {user.role} dashboard overview</p>
        </div>

        {/* STUDENT DASHBOARD */}
        {user.role === "student" && (
          <>
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6 hover:border-purple-500/50 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm mb-1">XP Earned</p>
                    <p className="text-3xl font-bold text-white">{user.xp || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6 hover:border-purple-500/50 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm mb-1">Current Level</p>
                    <p className="text-3xl font-bold text-white">{user.level || 1}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6 hover:border-purple-500/50 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm mb-1">Courses Completed</p>
                    <p className="text-3xl font-bold text-white">12</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6 hover:border-purple-500/50 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm mb-1">Learning Streak</p>
                    <p className="text-3xl font-bold text-white">{user.streak || 0} days</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6 mb-12">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Weekly Activity</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
                    <XAxis stroke="#a78bfa" />
                    <YAxis stroke="#a78bfa" />
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #a78bfa", borderRadius: "8px" }} labelStyle={{ color: "#fff" }} />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Learning Progress</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
                    <XAxis stroke="#a78bfa" />
                    <YAxis stroke="#a78bfa" />
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #a78bfa", borderRadius: "8px" }} labelStyle={{ color: "#fff" }} />
                    <Line type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </>
        )}

        {/* TEACHER DASHBOARD */}
        {user.role === "teacher" && (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm mb-1">Active Classes</p>
                    <p className="text-3xl font-bold text-white">{user.classes || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm mb-1">Total Students</p>
                    <p className="text-3xl font-bold text-white">{user.students || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm mb-1">Avg. Completion</p>
                    <p className="text-3xl font-bold text-white">78%</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* PARENT DASHBOARD */}
        {user.role === "parent" && (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm mb-1">Children Enrolled</p>
                    <p className="text-3xl font-bold text-white">{user.children || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm mb-1">Overall Progress</p>
                    <p className="text-3xl font-bold text-white">65%</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* ADMIN DASHBOARD */}
        {user.role === "admin" && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm mb-1">Total Users</p>
                    <p className="text-3xl font-bold text-white">{user.totalUsers || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm mb-1">Total Courses</p>
                    <p className="text-3xl font-bold text-white">{user.totalCourses || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm mb-1">System Health</p>
                    <p className="text-3xl font-bold text-white">99.9%</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm mb-1">Active Sessions</p>
                    <p className="text-3xl font-bold text-white">1,234</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Common Section - Recent Courses */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
              Explore Courses
            </Button>
            <Button variant="outline" className="border-purple-500/30 text-purple-200 hover:bg-purple-500/10">
              View Progress
            </Button>
            <Button variant="outline" className="border-purple-500/30 text-purple-200 hover:bg-purple-500/10">
              Settings
            </Button>
            <Button variant="outline" className="border-purple-500/30 text-purple-200 hover:bg-purple-500/10">
              Support
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
