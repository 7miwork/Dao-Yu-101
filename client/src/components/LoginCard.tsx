import { ReactNode } from "react";

interface LoginCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function LoginCard({ children, title, subtitle }: LoginCardProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 md:p-10">
        {title && (
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
