import { Button } from "@/components/ui/button";
import { BookOpen, Zap, Users, Trophy, ArrowRight, Globe, Sparkles, CheckCircle2, MapPin, Code, Users2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Home() {
  const [email, setEmail] = useState("");
  const [, setLocation] = useLocation();
  const { t } = useI18n();

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      titleKey: "home.gamifiedLearning",
      descriptionKey: "home.gamifiedDescription",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      titleKey: "home.multiRoleSystem",
      descriptionKey: "home.multiRoleDescription",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      titleKey: "home.achievementSystem",
      descriptionKey: "home.achievementDescription",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      titleKey: "home.globalLearning",
      descriptionKey: "home.globalDescription",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const stats = [
    { value: "50K+", label: "home.activeStudents" },
    { value: "1000+", label: "home.courses" },
    { value: "98%", label: "home.satisfaction" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{t("common.appName")}</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium">{t("navigation.features")}</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium">{t("navigation.pricing")}</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium">{t("navigation.about")}</a>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button onClick={() => setLocation("/login")} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all">{t("navigation.signIn")}</Button>
          </div>
        </div>
      </nav>

      {/* Official Introduction Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="space-y-12">
          {/* Main Introduction */}
          <div className="space-y-8 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
              <MapPin className="w-4 h-4" />
              <span>Coding Archipelago</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Expert Full-Stack Developer & EdTech Platform
              </h1>

              <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
                <p>
                  You are an expert full-stack developer, UI/UX designer, and DevOps engineer tasked with rebuilding and improving a comprehensive learning platform (Island-101 / Dao-Yu-101) to be fully functional, responsive, and directly deployable to GitHub Pages without additional fixes.
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800 space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Final Goal</h2>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800 dark:text-gray-200">The project MUST be ready to upload to GitHub</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800 dark:text-gray-200">Work immediately with GitHub Pages deployment</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800 dark:text-gray-200">No manual fixes required after generation</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-400 pt-4 italic">
                    Users should be able to: Copy the project → Push to GitHub → Enable GitHub Pages → Site works immediately
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-4">
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Core Platform Features
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                        Archipelago-based learning structure
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                        Island 1: Minecraft Education Block Coding
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                        15 comprehensive lessons per island
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                        Mobile-first responsive design
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                        Works offline as static site
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Code className="w-5 h-5 text-indigo-600" />
                      Technical Requirements
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        Clean, modular code structure
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        GitHub Pages compatible (static)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        Relative paths for all resources
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        No broken links or placeholders
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        localStorage for progress tracking
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button onClick={() => setLocation("/login")} className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                Explore Platform <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button onClick={() => setLocation("/archipelago")} variant="outline" className="border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-6 text-lg">
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t("home.powerfulFeatures")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">{t("home.featureDescription")}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group card-modern p-8 hover:scale-105 transition-transform duration-300">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t(feature.titleKey)}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{t(feature.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 rounded-3xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Why Choose Dao-Yu-101?</h2>
            <div className="space-y-4">
              {[
                "Personalized learning paths for every student",
                "Real-time progress tracking and analytics",
                "Engaging gamification system",
                "Multi-language support",
                "Teacher and parent dashboards",
                "Secure and scalable platform"
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Track your progress with detailed analytics and insights</p>
                <div className="space-y-3">
                  <div className="text-left">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Learning Consistency</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Course Completion</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">{t("home.readyToTransform")}</h2>
          <p className="text-lg text-indigo-100 mb-8">{t("home.joinThousands")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => setLocation("/login")} className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg">
              {t("home.startLearning")}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-400 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">{t("footer.product")}</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">{t("footer.features")}</a></li>
                <li><a href="#" className="hover:text-white transition">{t("footer.pricing")}</a></li>
                <li><a href="#" className="hover:text-white transition">{t("footer.security")}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">{t("footer.company")}</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">{t("footer.about")}</a></li>
                <li><a href="#" className="hover:text-white transition">{t("footer.blog")}</a></li>
                <li><a href="#" className="hover:text-white transition">{t("footer.careers")}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">{t("footer.resources")}</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">{t("footer.documentation")}</a></li>
                <li><a href="#" className="hover:text-white transition">{t("footer.support")}</a></li>
                <li><a href="#" className="hover:text-white transition">{t("footer.community")}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">{t("footer.legal")}</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">{t("footer.privacy")}</a></li>
                <li><a href="#" className="hover:text-white transition">{t("footer.terms")}</a></li>
                <li><a href="#" className="hover:text-white transition">{t("footer.contact")}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Dao-Yu-101. {t("footer.allRightsReserved")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
