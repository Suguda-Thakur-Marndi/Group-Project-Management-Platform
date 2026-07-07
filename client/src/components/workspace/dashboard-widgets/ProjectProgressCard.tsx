import { useQuery } from "@tanstack/react-query";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { getAllTasksQueryFn } from "@/lib/api";
import useGetProjectsInWorkspaceQuery from "@/hooks/api/use-get-projects";
import { FolderKanban, Loader } from "lucide-react";

type ProjectProgress = {
  id: string;
  name: string;
  emoji: string;
  total: number;
  completed: number;
  percentage: number;
};

const ProjectProgressCard = () => {
  const workspaceId = useWorkspaceId();

  const { data: tasksData, isLoading: tasksLoading } = useQuery({
    queryKey: ["all-tasks", workspaceId],
    queryFn: () => getAllTasksQueryFn({ workspaceId }),
    enabled: !!workspaceId,
  });

  const { data: projectsData, isLoading: projectsLoading } = useGetProjectsInWorkspaceQuery({
    workspaceId,
    pageNumber: 1,
    pageSize: 100, // Load all
  });

  const isLoading = tasksLoading || projectsLoading;

  const tasks = tasksData?.tasks || [];
  const projects = projectsData?.projects || [];

  // Calculate project progress
  const progressList: ProjectProgress[] = projects.map((project) => {
    const projectTasks = tasks.filter((t) => t.project?._id === project._id);
    const total = projectTasks.length;
    const completed = projectTasks.filter((t) => t.status === "DONE").length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      id: project._id,
      name: project.name,
      emoji: project.emoji || "📁",
      total,
      completed,
      percentage,
    };
  }).slice(0, 4); // Limit to top 4

  return (
    <div className="clean-card bg-white dark:bg-slate-800 p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/50 pb-3">
        <FolderKanban className="w-4 h-4 text-slate-400" />
        <h3 className="text-[15px] font-bold text-slate-800 dark:text-slate-200">
          Project Progress
        </h3>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <Loader className="w-5 h-5 animate-spin text-indigo-500" />
        </div>
      ) : progressList.length === 0 ? (
        <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500 font-medium">
          Create a project to track its development progress.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {progressList.map((prog) => (
            <div key={prog.id} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm shrink-0 select-none">{prog.emoji}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                    {prog.name}
                  </span>
                </div>
                <span className="text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-1.5 py-0.5 rounded">
                  {prog.percentage}%
                </span>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-900 overflow-hidden relative">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${prog.percentage}%` }}
                />
              </div>

              <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-500 font-bold">
                <span>{prog.completed} completed</span>
                <span>{prog.total} total tasks</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectProgressCard;
