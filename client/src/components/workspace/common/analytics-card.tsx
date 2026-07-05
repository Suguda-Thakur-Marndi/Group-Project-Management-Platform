import {
  Activity,
  TrendingUp,
  TrendingDown,
  Loader,
  CheckCircle2,
  AlertCircle,
  ListTodo,
} from "lucide-react";

const cardConfig: Record<
  string,
  {
    color: string;
    valueColor: string;
    gradient: string;
    borderGlow: string;
    icon: typeof Activity;
    iconGradient: string;
    iconBg: string;
    bgGlow: string;
  }
> = {
  "Total Task": {
    color: "text-indigo-500 dark:text-indigo-400",
    valueColor: "text-indigo-600 dark:text-indigo-300",
    gradient: "from-indigo-500 via-violet-500 to-purple-600",
    borderGlow: "hover:border-indigo-400/50 dark:hover:border-indigo-600/50",
    icon: ListTodo,
    iconGradient: "from-indigo-500 to-violet-600",
    iconBg: "bg-indigo-50 dark:bg-indigo-950/60",
    bgGlow: "group-hover:shadow-indigo-500/10",
  },
  "Overdue Task": {
    color: "text-rose-500 dark:text-rose-400",
    valueColor: "text-rose-600 dark:text-rose-300",
    gradient: "from-rose-500 via-red-500 to-orange-500",
    borderGlow: "hover:border-rose-400/50 dark:hover:border-rose-600/50",
    icon: AlertCircle,
    iconGradient: "from-rose-500 to-red-600",
    iconBg: "bg-rose-50 dark:bg-rose-950/60",
    bgGlow: "group-hover:shadow-rose-500/10",
  },
  "Completed Task": {
    color: "text-emerald-500 dark:text-emerald-400",
    valueColor: "text-emerald-600 dark:text-emerald-300",
    gradient: "from-emerald-400 via-green-500 to-teal-500",
    borderGlow: "hover:border-emerald-400/50 dark:hover:border-emerald-600/50",
    icon: CheckCircle2,
    iconGradient: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/60",
    bgGlow: "group-hover:shadow-emerald-500/10",
  },
};

const AnalyticsCard = (props: {
  title: string;
  value: number;
  isLoading: boolean;
}) => {
  const { title, value, isLoading } = props;
  const config = cardConfig[title] || cardConfig["Total Task"];
  const Icon = config.icon;

  const getTrend = () => {
    if (title === "Overdue Task") {
      return value > 0
        ? { icon: TrendingDown, color: "text-rose-500 dark:text-rose-400", label: "Needs attention", labelBg: "bg-rose-50 dark:bg-rose-950/40" }
        : { icon: TrendingUp, color: "text-emerald-500 dark:text-emerald-400", label: "All clear!", labelBg: "bg-emerald-50 dark:bg-emerald-950/40" };
    }
    return value > 0
      ? { icon: TrendingUp, color: "text-emerald-500 dark:text-emerald-400", label: "Great progress", labelBg: "bg-emerald-50 dark:bg-emerald-950/40" }
      : { icon: Activity, color: "text-slate-400 dark:text-slate-500", label: "No activity", labelBg: "bg-slate-100 dark:bg-slate-800/60" };
  };

  const trend = getTrend();
  const TrendIcon = trend.icon;

  return (
    <div
      className={`
        group relative w-full overflow-hidden rounded-2xl
        border border-slate-200/80 dark:border-slate-800/60
        bg-white dark:bg-slate-900/80
        shadow-sm hover:shadow-xl ${config.bgGlow}
        transition-all duration-300 hover:-translate-y-1
        ${config.borderGlow}
      `}
    >
      {/* Gradient top accent bar */}
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${config.gradient} opacity-90`} />

      {/* Subtle background gradient glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300`} />

      <div className="relative px-5 pt-6 pb-2">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            {title}
          </p>
          {/* Icon */}
          <div
            className={`
              flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
              bg-gradient-to-br ${config.iconGradient}
              shadow-md group-hover:scale-110 transition-transform duration-300
            `}
          >
            <Icon className="h-4 w-4 text-white" strokeWidth={2.2} />
          </div>
        </div>

        {/* Big value */}
        <div className="mt-3 mb-4">
          {isLoading ? (
            <Loader className="w-8 h-8 animate-spin text-slate-300 dark:text-slate-600" />
          ) : (
            <span
              className={`text-5xl font-black tracking-tight ${config.valueColor} drop-shadow-sm`}
            >
              {value.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Footer trend pill */}
      <div className="relative px-5 pb-5">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${trend.labelBg} ${trend.color}`}
        >
          <TrendIcon className="w-3 h-3" />
          {trend.label}
        </span>
      </div>
    </div>
  );
};

export default AnalyticsCard;
