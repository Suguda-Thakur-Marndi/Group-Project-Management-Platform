import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useGetProjectsInWorkspaceQuery from "@/hooks/api/use-get-projects";
import { Plus, ChevronRight, Calendar as CalendarIcon, FolderOpen } from "lucide-react";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { format } from "date-fns";
import useCreateProjectDialog from "@/hooks/use-create-project-dialog";
import { Button } from "@/components/ui/button";

const RecentProjects = () => {
  const workspaceId = useWorkspaceId();
  const { onOpen } = useCreateProjectDialog();

  const { data, isPending } = useGetProjectsInWorkspaceQuery({
    workspaceId,
    pageNumber: 1,
    pageSize: 5, // Display top 5 recent projects
  });

  const projects = data?.projects || [];

  if (isPending) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 rounded-xl bg-slate-100 dark:bg-slate-800/40 animate-pulse border border-slate-200/40 dark:border-slate-805/40" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 text-center max-w-sm mx-auto">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 text-2xl mb-4 select-none animate-bounce">
          📁
        </div>
        <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
          No Projects Yet
        </h4>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1.5 mb-5 leading-relaxed">
          Create your first project and start collaborating with your team.
        </p>
        <Button
          onClick={onOpen}
          className="h-9 px-4 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
        >
          Create Project
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {projects.map((project) => {
        const creatorName = project.createdBy?.name || "Workspace Member";
        const initials = getAvatarFallbackText(creatorName);
        const avatarColor = getAvatarColor(creatorName);

        return (
          <Link
            key={project._id}
            to={`/workspace/${workspaceId}/project/${project._id}`}
            className="flex items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-indigo-400/40 dark:hover:border-indigo-800/60 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Emoji icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200/50 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xl select-none shadow-sm">
                {project.emoji || "📁"}
              </div>

              {/* Name + date */}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.name}
                </p>
                <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-[10px] mt-0.5">
                  <CalendarIcon className="w-3 h-3" />
                  <span>
                    {project.createdAt
                      ? format(project.createdAt, "MMM d, yyyy")
                      : "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* Creator avatar & Arrow */}
            <div className="flex items-center gap-2.5 shrink-0">
              <Avatar className="h-6 w-6 ring-1 ring-white dark:ring-slate-800">
                <AvatarImage
                  src={project.createdBy?.profilePicture || ""}
                  alt={creatorName}
                />
                <AvatarFallback className={`${avatarColor} text-[9px] font-extrabold`}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 transform group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default RecentProjects;
