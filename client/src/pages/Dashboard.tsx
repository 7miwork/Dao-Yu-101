import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { BookOpen, Users, TrendingUp, Award, LogOut } from "lucide-react";
import { useLocation } from "wouter";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-500/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dao-Yu Dashboard</span>
          </div>
          <Button
            onClick={() => setLocation("/")}
            variant="outline"
            className="border-purple-500/30 text-purple-200 hover:bg-purple-500/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Student!</h1>
          <p className="text-purple-300">Here's your learning progress and achievements</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6 hover:border-purple-500/50 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm mb-1">XP Earned</p>
                <p className="text-3xl font-bold text-white">2,450</p>
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
                <p className="text-3xl font-bold text-white">5</p>
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
                <p className="text-3xl font-bold text-white">12 days</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Activity Chart */}
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
                <XAxis stroke="#a78bfa" />
                <YAxis stroke="#a78bfa" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #a78bfa",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Progress Chart */}
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Learning Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
                <XAxis stroke="#a78bfa" />
                <YAxis stroke="#a78bfa" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #a78bfa",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Line type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Courses */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Courses</h3>
          <div className="space-y-4">
            {[
              { name: "Mathematics Kingdom", progress: 85, students: 1250 },
              { name: "English Literature", progress: 60, students: 980 },
              { name: "Science Fundamentals", progress: 45, students: 750 },
            ].map((course, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition">
                <div className="flex-1">
                  <p className="text-white font-medium">{course.name}</p>
                  <p className="text-purple-300 text-sm">{course.students} students</p>
                </div>
                <div className="w-24 bg-slate-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-yellow-400 font-semibold ml-4">{course.progress}%</p>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
