import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowBigUp, ArrowBigDown, Loader } from "lucide-react";

const AnalyticsCard = (props: {
  title: string;
  value: number;
  isLoading: boolean;
}) => {
  const { title, value, isLoading } = props;

  const getArrowIcon = () => {
    if (title === "Overdue Task") {
      return value > 0 ? (
        <ArrowBigDown strokeWidth={2.5} className="h-4 w-4 text-red-500" />
      ) : (
        <ArrowBigUp strokeWidth={2.5} className="h-4 w-4 text-green-500" />
      );
    }
    if (title === "Completed Task" || title === "Total Task") {
      return value > 0 ? (
        <ArrowBigUp strokeWidth={2.5} className="h-4 w-4 text-green-500" />
      ) : (
        <ArrowBigDown strokeWidth={2.5} className="h-4 w-4 text-red-500" />
      );
    }
    return null;
  };
  return (
    <Card className="w-full glass-panel hover-lift bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden">
      {/* Decorative top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        title === "Overdue Task" ? "bg-red-500" : title === "Completed Task" ? "bg-green-500" : "bg-indigo-500"
      }`} />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">{title}</CardTitle>
          <div className="mb-[0.2px]">{getArrowIcon()}</div>
        </div>
        <div className={`p-2 rounded-xl ${
          title === "Overdue Task" ? "bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400" : title === "Completed Task" ? "bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400" : "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
        }`}>
          <Activity
            strokeWidth={2.5}
            className="h-4 w-4"
          />
        </div>
      </CardHeader>
      <CardContent className="w-full pb-5">
        <div className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {isLoading ? <Loader className="w-6 h-6 animate-spin text-indigo-500" /> : value}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
