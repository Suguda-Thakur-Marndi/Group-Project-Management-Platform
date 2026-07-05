import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useGetProjectsInWorkspaceQuery from "@/hooks/api/use-get-projects";
import { FolderOpen, ArrowRight, Plus } from "lucide-react";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { format } from "date-fns";
import useCreateProjectDialog from "@/hooks/use-create-project-dialog";

const CARD_GRADIENTS = [
  "from-indigo-500/10 to-violet-500/10 border-indigo-200/60 dark:border-indigo-800/40 hover:border-indigo-400/60",
  "from-emerald-500/10 to-teal-500/10 border-emerald-200/60 dark:border-emerald-800/40 hover:border-emerald-400/60",
  "from-rose-500/10 to-pink-500/10 border-rose-200/60 dark:border-rose-800/40 hover:border-rose-400/60",
  "from-amber-500/10 to-orange-500/10 border-amber-200/60 dark:border-amber-800/40 hover:border-amber-400/60",
  "from-sky-500/10 to-blue-500/10 border-sky-200/60 dark:border-sky-800/40 hover:border-sky-400/60",
  "from-purple-500/10 to-fuchsia-500/10 border-purple-200/60 dark:border-purple-800/40 hover:border-purple-400/60",
];

const RecentProjects = () => {
  const workspaceId = useWorkspaceId();
  const { onOpen } = useCreateProjectDialog();

  const { data, isPending } = useGetProjectsInWorkspaceQuery({
    workspaceId,
    pageNumber: 1,
    pageSize: 10,
  });

  const projects = data?.projects || [];

  if (isPending) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 rounded-2xl bg-slate-100 dark:bg-slate-800/40 animate-pulse" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border border-indigo-100 dark:border-indigo-900/40">
          <FolderOpen className="w-10 h-10 text-indigo-400" />
        </div>
        <div>
          <p className="font-bold text-slate-700 dark:text-slate-300">
            No projects yet
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create your first project to get started
          </p>
        </div>
        <button
          onClick={onOpen}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project, idx) => {
        const name = project.createdBy.name;
        const initials = getAvatarFallbackText(name);
        const avatarColor = getAvatarColor(name);
        const cardStyle = CARD_GRADIENTS[idx % CARD_GRADIENTS.length];

        return (
          <Link
            key={project._id}
            to={`/workspace/${workspaceId}/project/${project._id}`}
            className={`group relative flex flex-col gap-4 p-5 rounded-2xl border bg-gradient-to-br dark:bg-slate-800/30 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 ${cardStyle}`}
          >
            {/* Top: Emoji + Name */}
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-slate-700/60 text-2xl select-none">
                {project.emoji}
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="font-bold text-slate-900 dark:text-slate-100 text-sm truncate group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors leading-tight">
                  {project.name}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  {project.createdAt ? format(project.createdAt, "MMM d, yyyy") : "—"}
                </p>
              </div>
            </div>

            {/* Footer: Creator + Arrow */}
            <div className="flex items-center justify-between pt-3 border-t border-current/10">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 ring-2 ring-white dark:ring-slate-700 shadow-sm">
                  <AvatarImage
                    src={project.createdBy.profilePicture || ""}
                    alt={name}
                  />
                  <AvatarFallback className={`${avatarColor} text-[10px] font-bold`}>
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate max-w-[100px]">
                  {name}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default RecentProjects;
