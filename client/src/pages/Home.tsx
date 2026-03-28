import { Button } from "@/components/ui/button";
import { BookOpen, Zap, Users, Trophy, ArrowRight, Globe } from "lucide-react";
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
      icon: <Zap className="w-8 h-8" />,
      titleKey: "home.gamifiedLearning",
      descriptionKey: "home.gamifiedDescription",
    },
    {
      icon: <Users className="w-8 h-8" />,
      titleKey: "home.multiRoleSystem",
      descriptionKey: "home.multiRoleDescription",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      titleKey: "home.achievementSystem",
      descriptionKey: "home.achievementDescription",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      titleKey: "home.globalLearning",
      descriptionKey: "home.globalDescription",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-purple-500/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{t("common.appName")}</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-purple-200 hover:text-white transition">{t("navigation.features")}</a>
            <a href="#" className="text-purple-200 hover:text-white transition">{t("navigation.pricing")}</a>
            <a href="#" className="text-purple-200 hover:text-white transition">{t("navigation.about")}</a>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button onClick={() => setLocation("/login")} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">{t("navigation.signIn")}</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              {t("home.heroTitle")}
            </h1>
            <p className="text-xl text-purple-200 leading-relaxed">
              {t("home.heroDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => setLocation("/register")} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 px-8 py-6 text-lg">
                {t("home.getStarted")} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button onClick={() => setLocation("/courses")} variant="outline" className="border-purple-400/30 text-purple-200 hover:bg-purple-500/10 px-8 py-6 text-lg">
                {t("home.watchDemo")}
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-8">
              <div>
                <p className="text-3xl font-bold text-white">50K+</p>
                <p className="text-purple-300">{t("home.activeStudents")}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">1000+</p>
                <p className="text-purple-300">{t("home.courses")}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">98%</p>
                <p className="text-purple-300">{t("home.satisfaction")}</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-3xl opacity-30"></div>
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500/20 p-8 backdrop-blur-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg"></div>
                  <div>
                    <p className="text-white font-semibold">Welcome to Archipelago</p>
                    <p className="text-purple-300 text-sm">Your learning journey starts here</p>
                  </div>
                </div>
                <div className="border-t border-purple-500/20 pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200">Mathematics Kingdom</span>
                    <span className="text-yellow-400 font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-purple-200">English Literature</span>
                    <span className="text-yellow-400 font-semibold">60%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
                <div className="border-t border-purple-500/20 pt-4 flex gap-4">
                  <div className="flex-1 text-center">
                    <p className="text-2xl font-bold text-yellow-400">2,450</p>
                    <p className="text-purple-300 text-xs">XP Earned</p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-2xl font-bold text-blue-400">5</p>
                    <p className="text-purple-300 text-xs">Level</p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-2xl font-bold text-orange-400">12</p>
                    <p className="text-purple-300 text-xs">Streak</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("home.powerfulFeatures")}</h2>
          <p className="text-xl text-purple-200">{t("home.featureDescription")}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/20 rounded-xl p-8 hover:border-purple-500/50 transition hover:shadow-lg hover:shadow-purple-500/10">
              <div className="text-blue-400 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-3">{t(feature.titleKey)}</h3>
              <p className="text-purple-200 text-sm leading-relaxed">{t(feature.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">{t("home.readyToTransform")}</h2>
          <p className="text-lg text-blue-100 mb-8">{t("home.joinThousands")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              placeholder={t("home.enterEmail")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-auto"
            />
            <Button onClick={() => setLocation("/register")} className="bg-white text-blue-600 hover:bg-gray-100 border-0 px-8 py-3 font-semibold w-full sm:w-auto">
              {t("home.startLearning")}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">{t("footer.product")}</h4>
              <ul className="space-y-2 text-purple-300 text-sm">
                <li><a href="#" className="hover:text-white transition">{t("footer.features")}</a></li>
                <li><a href="#" className="hover:text-white transition">{t("footer.pricing")}</a></li>
                <li><a href="#" className="hover:text-white transition">{t("footer.security")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{t("footer.company")}</h4>
              <ul className="space-y-2 text-purple-300 text-sm">
                <li><a href="#" className="hover:text-white transition">{t("footer.about")}</a></li>
                <li><a href="#" className="hover:text-white transition">{t("footer.blog")}</a></li>
                <li><a href="#" className="hover:text-white transition">{t("footer.careers")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{t("footer.resources")}</h4>
              <ul className="space-y-2 text-purple-300 text-sm">
                <li><a href="#" className="hover:text-white transition">{t("footer.documentation")}</a></li>
                <li><a href="#" className="hover:text-white transition">{t("footer.support")}</a></li>
                <li><a href="#" className="hover:text-white transition">{t("footer.community")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{t("footer.legal")}</h4>
              <ul className="space-y-2 text-purple-300 text-sm">
                <li><a href="#" className="hover:text-white transition">{t("footer.privacy")}</a></li>
                <li><a href="#" className="hover:text-white transition">{t("footer.terms")}</a></li>
                <li><a href="#" className="hover:text-white transition">{t("footer.contact")}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-500/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-300 text-sm">© 2026 Dao-Yu. {t("footer.allRightsReserved")}</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-purple-300 hover:text-white transition">Twitter</a>
              <a href="#" className="text-purple-300 hover:text-white transition">LinkedIn</a>
              <a href="#" className="text-purple-300 hover:text-white transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
