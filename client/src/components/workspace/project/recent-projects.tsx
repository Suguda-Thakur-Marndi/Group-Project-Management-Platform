import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useGetProjectsInWorkspaceQuery from "@/hooks/api/use-get-projects";
import { Plus } from "lucide-react";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { format } from "date-fns";
import useCreateProjectDialog from "@/hooks/use-create-project-dialog";

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
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-14 rounded-md bg-slate-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
        <p className="text-sm text-indigo-500 italic">No Project created yet</p>
        <button
          onClick={onOpen}
          className="inline-flex items-center gap-1.5 mt-1 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Create your first project
        </button>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100">
      {projects.map((project) => {
        const name = project.createdBy.name;
        const initials = getAvatarFallbackText(name);
        const avatarColor = getAvatarColor(name);

        return (
          <Link
            key={project._id}
            to={`/workspace/${workspaceId}/project/${project._id}`}
            className="flex items-center gap-3 py-3 px-1 hover:bg-slate-50 transition-colors rounded-md group"
          >
            {/* Emoji icon */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-lg select-none">
              {project.emoji}
            </div>

            {/* Name + date */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                {project.name}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {project.createdAt
                  ? format(project.createdAt, "MMM d, yyyy")
                  : "—"}
              </p>
            </div>

            {/* Creator avatar */}
            <Avatar className="h-6 w-6 shrink-0">
              <AvatarImage
                src={project.createdBy.profilePicture || ""}
                alt={name}
              />
              <AvatarFallback className={`${avatarColor} text-[10px] font-bold`}>
                {initials}
              </AvatarFallback>
            </Avatar>
          </Link>
        );
      })}
    </div>
  );
};

export default RecentProjects;
