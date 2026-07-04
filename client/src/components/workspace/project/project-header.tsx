
import { useParams } from "react-router-dom";
import CreateTaskDialog from "../task/create-task-dialog";
import EditProjectDialog from "./edit-project-dialog";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProjectByIdQueryFn } from "@/lib/api";
import PermissionsGuard from "@/components/resuable/permission-guard";
import { Permissions } from "@/constant";
import { Loader, AlertTriangle } from "lucide-react";

const ProjectHeader = () => {
  const param = useParams();
  const projectId = param.projectId as string;
  const workspaceId = useWorkspaceId();

  const { data, isPending, isError } = useQuery({
    queryKey: ["singleProject", projectId],
    queryFn: () =>
      getProjectByIdQueryFn({
        workspaceId,
        projectId,
      }),
    staleTime: Infinity,
    enabled: !!projectId,
    placeholderData: keepPreviousData,
  });

  const project = data?.project;
  const projectEmoji = project?.emoji || "📊";
  const projectName = project?.name || "Untitled Project";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Project title area */}
      <div className="flex items-center gap-3 min-w-0">
        {isPending ? (
          <div className="flex items-center gap-2">
            <Loader className="w-5 h-5 animate-spin text-indigo-500" />
            <span className="text-sm text-slate-500">Loading project...</span>
          </div>
        ) : isError ? (
          <div className="flex items-center gap-2 text-red-500">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-medium">Failed to load project</span>
          </div>
        ) : (
          <>
            {/* Emoji pill */}
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              {projectEmoji}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white truncate">
                  {projectName}
                </h1>
                <PermissionsGuard requiredPermission={Permissions.EDIT_PROJECT}>
                  <EditProjectDialog project={project} />
                </PermissionsGuard>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Project board · All tasks
              </p>
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="shrink-0">
        <CreateTaskDialog projectId={projectId} />
      </div>
    </div>
  );
};

export default ProjectHeader;
