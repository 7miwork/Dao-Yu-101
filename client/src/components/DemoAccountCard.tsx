import { User } from "lucide-react";

interface DemoAccount {
  role: string;
  email: string;
  password: string;
  icon: string;
}

interface DemoAccountCardProps {
  account: DemoAccount;
  onSelect: (email: string, password: string) => void;
  loading?: boolean;
}

export function DemoAccountCard({ account, onSelect, loading }: DemoAccountCardProps) {
  const roleColors: Record<string, { bg: string; text: string; border: string }> = {
    student: {
      bg: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      text: "text-blue-700 dark:text-blue-300",
      border: "border-blue-300 dark:border-blue-600",
    },
    teacher: {
      bg: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      text: "text-purple-700 dark:text-purple-300",
      border: "border-purple-300 dark:border-purple-600",
    },
    parent: {
      bg: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      text: "text-green-700 dark:text-green-300",
      border: "border-green-300 dark:border-green-600",
    },
    admin: {
      bg: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
      text: "text-orange-700 dark:text-orange-300",
      border: "border-orange-300 dark:border-orange-600",
    },
  };

  const colors = roleColors[account.role.toLowerCase()] || roleColors.student;

  return (
    <button
      onClick={() => onSelect(account.email, account.password)}
      disabled={loading}
      className={`w-full p-4 md:p-6 rounded-xl border-2 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${colors.bg} ${colors.border} hover:shadow-lg`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 ${colors.bg}`}>
          {account.icon}
        </div>
        <div className="flex-1 text-left">
          <div className={`font-bold text-lg capitalize ${colors.text}`}>
            {account.role}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium break-all">
            {account.email}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Click to auto-fill
          </div>
        </div>
      </div>
    </button>
  );
}
