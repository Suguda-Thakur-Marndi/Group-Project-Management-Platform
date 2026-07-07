import { useQuery } from "@tanstack/react-query";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { getAllTasksQueryFn } from "@/lib/api";
import { TaskType } from "@/types/api.type";
import { differenceInDays, isToday, isTomorrow } from "date-fns";
import { Clock, Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TaskPriorityEnum } from "@/constant";
import { transformStatusEnum } from "@/lib/helper";

const UpcomingDeadlines = () => {
  const workspaceId = useWorkspaceId();

  const { data, isLoading } = useQuery({
    queryKey: ["all-tasks", workspaceId],
    queryFn: () => getAllTasksQueryFn({ workspaceId }),
    enabled: !!workspaceId,
  });

  const tasks: TaskType[] = data?.tasks || [];

  // Filter tasks that have due dates, are NOT completed, and are due today or in the future
  const upcomingTasks = tasks
    .filter((task) => {
      if (!task.dueDate || task.status === "DONE") return false;
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return dueDate >= today;
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 4); // Limit to top 4

  const getRemainingTimeText = (dueDateStr: string) => {
    const dueDate = new Date(dueDateStr);
    if (isToday(dueDate)) return "Due Today";
    if (isTomorrow(dueDate)) return "Due Tomorrow";
    const daysLeft = differenceInDays(dueDate, new Date());
    return `In ${daysLeft + 1} days`;
  };

  return (
    <div className="clean-card bg-white dark:bg-slate-800 p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/50 pb-3">
        <Clock className="w-4 h-4 text-slate-400" />
        <h3 className="text-[15px] font-bold text-slate-800 dark:text-slate-200">
          Upcoming Deadlines
        </h3>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <Loader className="w-5 h-5 animate-spin text-indigo-500" />
        </div>
      ) : upcomingTasks.length === 0 ? (
        <div className="text-center py-6 flex flex-col items-center justify-center gap-1.5">
          <span className="text-xl select-none">🎉</span>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">No urgent deadlines approaching!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {upcomingTasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/10 hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
            >
              <div className="min-w-0 flex-1 flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                  {task.taskCode}
                </span>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {task.title}
                </p>
                {task.project && (
                  <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 truncate mt-0.5">
                    {task.project.emoji} {task.project.name}
                  </span>
                )}
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 px-2 py-0.5 rounded-md">
                  {getRemainingTimeText(task.dueDate)}
                </span>
                <Badge
                  variant={TaskPriorityEnum[task.priority]}
                  className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md"
                >
                  {transformStatusEnum(task.priority)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingDeadlines;
