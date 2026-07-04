import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useGetProjectsInWorkspaceQuery from "@/hooks/api/use-get-projects";
import { Loader, FolderOpen, ArrowRight } from "lucide-react";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { format } from "date-fns";

const RecentProjects = () => {
  const workspaceId = useWorkspaceId();

  const { data, isPending } = useGetProjectsInWorkspaceQuery({
    workspaceId,
    pageNumber: 1,
    pageSize: 10,
  });

  const projects = data?.projects || [];

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-6 h-6 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800">
          <FolderOpen className="w-8 h-8 text-slate-400" />
        </div>
        <div>
          <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
            No projects yet
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create your first project to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => {
        const name = project.createdBy.name;
        const initials = getAvatarFallbackText(name);
        const avatarColor = getAvatarColor(name);

        return (
          <Link
            key={project._id}
            to={`/workspace/${workspaceId}/project/${project._id}`}
            className="group flex flex-col gap-3 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/40 hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 hover:shadow-md transition-all duration-200"
          >
            {/* Emoji + Name */}
            <div className="flex items-start gap-3">
              <div className="text-2xl leading-none mt-0.5 select-none">
                {project.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm truncate group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  {project.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {project.createdAt ? format(project.createdAt, "MMM d, yyyy") : "—"}
                </p>
              </div>
            </div>

            {/* Footer: Creator + Arrow */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 ring-1 ring-white dark:ring-slate-700">
                  <AvatarImage
                    src={project.createdBy.profilePicture || ""}
                    alt={name}
                  />
                  <AvatarFallback className={`${avatarColor} text-[10px] font-bold`}>
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[100px]">
                  {name}
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default RecentProjects;
