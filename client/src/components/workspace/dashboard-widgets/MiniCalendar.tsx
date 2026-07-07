import { useQuery } from "@tanstack/react-query";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { getAllTasksQueryFn } from "@/lib/api";
import { TaskType } from "@/types/api.type";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  getDay,
  isToday,
} from "date-fns";
import { Calendar, Loader } from "lucide-react";

const MiniCalendar = () => {
  const workspaceId = useWorkspaceId();
  const currentDate = new Date();

  const { data, isLoading } = useQuery({
    queryKey: ["all-tasks", workspaceId],
    queryFn: () => getAllTasksQueryFn({ workspaceId }),
    enabled: !!workspaceId,
  });

  const tasks: TaskType[] = data?.tasks || [];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Weekday offset for the first day of current month
  const startDayOffset = getDay(monthStart);

  const gridCells = Array.from({ length: startDayOffset }).map(() => null);
  const allCells = [...gridCells, ...daysInMonth];

  // Helper to check if a day has tasks due
  const hasTaskOnDay = (day: Date) => {
    return tasks.some((task) => task.dueDate && isSameDay(new Date(task.dueDate), day));
  };

  return (
    <div className="clean-card bg-white dark:bg-slate-800 p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/50 pb-3">
        <Calendar className="w-4 h-4 text-slate-400" />
        <div className="flex items-center justify-between w-full">
          <h3 className="text-[15px] font-bold text-slate-800 dark:text-slate-200">
            Calendar Overview
          </h3>
          <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md">
            {format(currentDate, "MMMM")}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <Loader className="w-5 h-5 animate-spin text-indigo-500" />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Weekdays header */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={i} className="text-[9px] font-extrabold text-slate-400 dark:text-slate-500">
                {d}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {allCells.map((day, idx) => {
              if (!day) {
                return <div key={`empty-${idx}`} className="h-6 w-6" />;
              }

              const isCurrentDay = isToday(day);
              const hasTask = hasTaskOnDay(day);

              return (
                <div
                  key={day.toISOString()}
                  className={`h-6 w-6 text-[10px] font-bold rounded-lg flex items-center justify-center relative mx-auto
                    ${isCurrentDay ? "bg-indigo-600 text-white dark:bg-indigo-500" : "text-slate-700 dark:text-slate-300"}
                    ${hasTask && !isCurrentDay ? "border border-indigo-400/40 bg-indigo-50/20 dark:bg-indigo-950/10 text-indigo-600 dark:text-indigo-400" : ""}
                  `}
                >
                  {format(day, "d")}
                  
                  {/* Task indicator dot */}
                  {hasTask && !isCurrentDay && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCalendar;
