import { useLocation } from "wouter";
import { ArrowRight, Users, BarChart3, Zap, Shield, Globe, Sparkles, CheckCircle2 } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Landing() {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Real-time insights into student learning with detailed analytics and performance metrics.",
    },
    {
      icon: Zap,
      title: "Gamified Learning",
      description: "Engaging island-based learning experience that keeps students motivated and excited.",
    },
    {
      icon: Users,
      title: "Role-Based Dashboards",
      description: "Tailored interfaces for students, teachers, parents, and administrators.",
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "Enterprise-grade security with full data privacy and compliance.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Parent",
      quote: "I finally understand what my daughter is learning. The progress tracking is incredible!",
      avatar: "SC",
    },
    {
      name: "Michael Rodriguez",
      role: "Teacher",
      quote: "Managing my class has never been easier. Students are more engaged than ever.",
      avatar: "MR",
    },
    {
      name: "Dr. Emily Watson",
      role: "School Principal",
      quote: "The institutional dashboard gives us exactly what we need to support our students.",
      avatar: "EW",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold text-white">D</span>
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent hidden sm:inline">
              Dao-Yu-101
            </span>
          </button>
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setLocation("/login")}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => setLocation("/login")}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950 -z-10"></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    Next Generation EdTech
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Empowering Students. Connecting Parents. Supporting Schools.
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  Dao-Yu-101 combines cutting-edge technology with engaging pedagogy to create an exceptional learning
                  experience. Track progress, celebrate achievements, and build a thriving educational community.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => setLocation("/login")}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setLocation("/login")}
                  className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors"
                >
                  Try Demo
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">10K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Schools & Institutions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">98%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-2xl blur-3xl opacity-20 -z-10"></div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663478416494/22D8SNdaaK7GRVegDmfBBL/landing-hero-bg-MPvKFUotSVdTptSgPtgiA4.webp"
                alt="Dashboard Preview"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Target Groups Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Built for Everyone
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Whether you're a parent, teacher, or school administrator, Dao-Yu-101 has everything you need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Parents */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">For Parents</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Track your child's progress in real-time</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Communicate directly with teachers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Celebrate achievements and milestones</span>
                </li>
              </ul>
            </div>

            {/* Teachers */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">For Teachers</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Manage students and assignments efficiently</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Monitor individual and class performance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Generate detailed performance reports</span>
                </li>
              </ul>
            </div>

            {/* Schools */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">For Schools</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>Centralized management system</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>Institutional analytics and insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>Scalable for any institution size</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to succeed in modern education.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Loved by Educators & Parents
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              See what our community has to say about Dao-Yu-101.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Transform Education?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of educators and parents who are already using Dao-Yu-101 to create better learning
            experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setLocation("/login")}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setLocation("/login")}
              className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors"
            >
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-900/50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">&copy; 2026 Dao-Yu-101. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
