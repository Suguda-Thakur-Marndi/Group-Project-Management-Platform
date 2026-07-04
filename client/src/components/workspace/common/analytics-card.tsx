import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  { color: string; bg: string; icon: typeof Activity; iconBg: string }
> = {
  "Total Task": {
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "from-indigo-500 to-purple-600",
    icon: ListTodo,
    iconBg: "bg-indigo-50 dark:bg-indigo-950/60",
  },
  "Overdue Task": {
    color: "text-red-600 dark:text-red-400",
    bg: "from-red-500 to-rose-600",
    icon: AlertCircle,
    iconBg: "bg-red-50 dark:bg-red-950/60",
  },
  "Completed Task": {
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "from-emerald-500 to-green-600",
    icon: CheckCircle2,
    iconBg: "bg-emerald-50 dark:bg-emerald-950/60",
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
        ? { icon: TrendingDown, color: "text-red-500", label: "Needs attention" }
        : { icon: TrendingUp, color: "text-emerald-500", label: "All clear!" };
    }
    return value > 0
      ? { icon: TrendingUp, color: "text-emerald-500", label: "Great progress" }
      : { icon: Activity, color: "text-slate-400", label: "No activity" };
  };

  const trend = getTrend();
  const TrendIcon = trend.icon;

  return (
    <Card className="w-full relative overflow-hidden border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 rounded-2xl group">
      {/* Gradient top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${config.bg}`} />

      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3 pt-5 px-5">
        <div className="space-y-1">
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </CardTitle>
          <div className="flex items-center gap-1.5 mt-1">
            <TrendIcon className={`w-3.5 h-3.5 ${trend.color}`} />
            <span className={`text-xs font-medium ${trend.color}`}>
              {trend.label}
            </span>
          </div>
        </div>
        <div className={`p-2.5 rounded-xl ${config.iconBg} group-hover:scale-110 transition-transform duration-300 shrink-0`}>
          <Icon className={`h-4 w-4 ${config.color}`} strokeWidth={2} />
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-5">
        <div className={`text-4xl font-extrabold tracking-tight ${config.color}`}>
          {isLoading ? (
            <Loader className="w-7 h-7 animate-spin text-slate-400" />
          ) : (
            <span>{value.toLocaleString()}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
