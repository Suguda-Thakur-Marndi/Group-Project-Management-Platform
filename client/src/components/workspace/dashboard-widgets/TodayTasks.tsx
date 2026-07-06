import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { getAllTasksQueryFn, editTaskMutationFn } from "@/lib/api";
import { TaskType } from "@/types/api.type";
import { isToday } from "date-fns";
import { CheckSquare, Loader, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuthContext } from "@/context/auth-provider";

const TodayTasks = () => {
  const workspaceId = useWorkspaceId();
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const { data, isLoading } = useQuery({
    queryKey: ["all-tasks", workspaceId],
    queryFn: () => getAllTasksQueryFn({ workspaceId }),
    enabled: !!workspaceId,
  });

  const { mutate } = useMutation({
    mutationFn: editTaskMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-tasks", workspaceId] });
      toast({
        title: "Task Updated",
        description: "Task has been successfully completed.",
        variant: "success",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update task status.",
        variant: "destructive",
      });
    },
  });

  const tasks: TaskType[] = data?.tasks || [];

  // Filter tasks due today or assigned to user that are NOT done
  const todayTasks = tasks.filter((task) => {
    if (task.status === "DONE") return false;
    
    const isDueToday = task.dueDate && isToday(new Date(task.dueDate));
    const isAssignedToMe = task.assignedTo?._id === user?._id;

    return isDueToday || isAssignedToMe;
  }).slice(0, 4);

  const handleToggleComplete = (task: TaskType) => {
    if (!task.project?._id) return;
    mutate({
      workspaceId,
      projectId: task.project._id,
      taskId: task._id,
      data: {
        status: "DONE" as any, // Mark complete
      },
    });
  };

  return (
    <div className="clean-card bg-white dark:bg-slate-800 p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/50 pb-3">
        <CheckSquare className="w-4 h-4 text-slate-400" />
        <h3 className="text-[15px] font-bold text-slate-800 dark:text-slate-200">
          Today's Tasks
        </h3>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <Loader className="w-5 h-5 animate-spin text-indigo-500" />
        </div>
      ) : todayTasks.length === 0 ? (
        <div className="text-center py-8 flex flex-col items-center justify-center gap-1.5">
          <span className="text-xl select-none">☀️</span>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">All tasks for today are completed!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {todayTasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/10 hover:border-slate-200 dark:hover:border-slate-700 transition-colors group"
            >
              {/* Checkbox */}
              <button
                onClick={() => handleToggleComplete(task)}
                className="h-5 w-5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center cursor-pointer hover:border-indigo-500 transition-all shrink-0"
              >
                <Check className="h-3.5 w-3.5 text-transparent group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors" />
              </button>

              <div className="min-w-0 flex-1 flex flex-col">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {task.title}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                    {task.taskCode}
                  </span>
                  {task.project && (
                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 truncate">
                      • {task.project.emoji} {task.project.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayTasks;
