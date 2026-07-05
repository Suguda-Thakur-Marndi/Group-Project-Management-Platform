import { Activity, Loader } from "lucide-react";

const cardConfig: Record<
  string,
  {
    dotColor: string;
    valueColor: string;
    iconColor: string;
  }
> = {
  "Total Task": {
    dotColor: "bg-red-500",
    valueColor: "text-slate-900",
    iconColor: "text-slate-300",
  },
  "Overdue Task": {
    dotColor: "bg-emerald-500",
    valueColor: "text-slate-900",
    iconColor: "text-slate-300",
  },
  "Completed Task": {
    dotColor: "bg-red-500",
    valueColor: "text-slate-900",
    iconColor: "text-slate-300",
  },
};

const AnalyticsCard = (props: {
  title: string;
  value: number;
  isLoading: boolean;
}) => {
  const { title, value, isLoading } = props;
  const config = cardConfig[title] || cardConfig["Total Task"];

  return (
    <div className="relative w-full rounded-lg border border-slate-200 bg-white p-5">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block w-2 h-2 rounded-full ${config.dotColor}`}
          />
          <p className="text-sm font-medium text-slate-600">{title}</p>
        </div>
        {/* Sparkline icon */}
        <Activity className={`w-4 h-4 ${config.iconColor}`} strokeWidth={1.5} />
      </div>

      {/* Value */}
      <div>
        {isLoading ? (
          <Loader className="w-6 h-6 animate-spin text-slate-300 mt-1" />
        ) : (
          <span className={`text-4xl font-bold ${config.valueColor}`}>
            {value.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default AnalyticsCard;
