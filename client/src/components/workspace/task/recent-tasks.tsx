import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TaskPriorityEnum, TaskStatusEnum } from "@/constant";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { getAllTasksQueryFn } from "@/lib/api";
import {
  getAvatarColor,
  getAvatarFallbackText,
  transformStatusEnum,
} from "@/lib/helper";
import { TaskType } from "@/types/api.type";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader, CheckSquare } from "lucide-react";

const RecentTasks = () => {
  const workspaceId = useWorkspaceId();

  const { data, isLoading } = useQuery({
    queryKey: ["all-tasks", workspaceId],
    queryFn: () =>
      getAllTasksQueryFn({
        workspaceId,
      }),
    staleTime: 0,
    enabled: !!workspaceId,
  });

  const tasks: TaskType[] = data?.tasks || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-6 h-6 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800">
          <CheckSquare className="w-8 h-8 text-slate-400" />
        </div>
        <div>
          <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
            No tasks yet
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create your first task to start tracking work
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800/60">
      {tasks.map((task) => {
        const name = task?.assignedTo?.name || "";
        const initials = getAvatarFallbackText(name);
        const avatarColor = getAvatarColor(name);

        return (
          <div
            key={task._id}
            className="flex flex-col sm:flex-row sm:items-center gap-3 py-3.5 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 px-2 rounded-xl transition-colors duration-150"
          >
            {/* Task info */}
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                {task.taskCode}
              </span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                {task.title}
              </p>
              {task.dueDate && (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Due {format(task.dueDate, "MMM d, yyyy")}
                </span>
              )}
            </div>

            {/* Badges & Avatar */}
            <div className="flex items-center gap-2 shrink-0">
              <Badge
                variant={TaskStatusEnum[task.status]}
                className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border-0 shadow-sm"
              >
                {transformStatusEnum(task.status)}
              </Badge>

              <Badge
                variant={TaskPriorityEnum[task.priority]}
                className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border-0 shadow-sm"
              >
                {transformStatusEnum(task.priority)}
              </Badge>

              <Avatar className="h-7 w-7 ring-1 ring-white dark:ring-slate-700 shrink-0">
                <AvatarImage
                  src={task.assignedTo?.profilePicture || ""}
                  alt={task.assignedTo?.name}
                />
                <AvatarFallback className={`${avatarColor} text-[10px] font-bold`}>
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentTasks;
