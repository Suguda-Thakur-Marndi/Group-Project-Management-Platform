import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Folder, Calendar as CalendarIcon, User, ChevronRight, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useGetProjectsInWorkspaceQuery from "@/hooks/api/use-get-projects";
import useCreateProjectDialog from "@/hooks/use-create-project-dialog";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

const Projects = () => {
  const workspaceId = useWorkspaceId();
  const { onOpen } = useCreateProjectDialog();

  const { data, isPending } = useGetProjectsInWorkspaceQuery({
    workspaceId,
    pageNumber: 1,
    pageSize: 100, // Load all projects
  });

  const projects = data?.projects || [];

  return (
    <main className="flex flex-1 flex-col gap-6 animate-fade-in pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[34px] font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Projects
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Manage, organize, and monitor all active projects in your workspace.
          </p>
        </div>
        <Button
          onClick={onOpen}
          className="h-10 px-4 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-medium transition-all rounded-xl shadow-sm cursor-pointer flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {isPending ? (
        <div className="flex items-center justify-center py-24">
          <Loader className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
        </div>
      ) : projects.length === 0 ? (
        /* Redesigned Empty State */
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center clean-card bg-white dark:bg-slate-800 border-dashed border-2 max-w-2xl mx-auto w-full mt-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-[32px] mb-6 select-none shadow-sm animate-bounce">
            📁
          </div>
          <h3 className="text-[22px] font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            No Projects Yet
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mt-2 mb-8 leading-relaxed">
            Create your first project to organize your tasks, collaborate with your team, and track development progress.
          </p>
          <Button
            onClick={onOpen}
            className="h-11 px-6 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Project
          </Button>
        </div>
      ) : (
        /* Projects Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const creatorName = project.createdBy?.name || "Workspace Member";
            const initials = getAvatarFallbackText(creatorName);
            const avatarColor = getAvatarColor(creatorName);

            return (
              <Link
                key={project._id}
                to={`/workspace/${workspaceId}/project/${project._id}`}
                className="clean-card bg-white dark:bg-slate-800 p-6 flex flex-col justify-between group hover:border-indigo-500/40 dark:hover:border-indigo-400/40"
              >
                <div>
                  {/* Top Bar with Emoji & Arrow */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-2xl select-none shadow-sm">
                      {project.emoji || "📁"}
                    </div>
                    <span className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      <ChevronRight className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                    {project.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1.5 line-clamp-2 h-8 leading-relaxed">
                    {project.description || "No project description provided."}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="border-t border-slate-100 dark:border-slate-700/50 mt-6 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 ring-1 ring-white dark:ring-slate-700">
                      <AvatarImage
                        src={project.createdBy?.profilePicture || ""}
                        alt={creatorName}
                      />
                      <AvatarFallback className={`${avatarColor} text-[10px] font-bold`}>
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-slate-400 dark:text-slate-500 text-[11px] font-medium truncate max-w-[100px]">
                      {creatorName.split(" ")[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-[11px]">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>
                      {project.createdAt ? format(project.createdAt, "MMM d, yyyy") : "—"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Projects;
