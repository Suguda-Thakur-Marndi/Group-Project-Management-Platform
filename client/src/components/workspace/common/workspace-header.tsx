import { useAuthContext } from "@/context/auth-provider";
import { Loader, Building2 } from "lucide-react";

const WorkspaceHeader = () => {
  const { workspaceLoading, workspace } = useAuthContext();

  if (workspaceLoading) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 w-fit">
        <Loader className="w-5 h-5 animate-spin text-indigo-500" />
        <span className="text-sm text-slate-500">Loading workspace...</span>
      </div>
    );
  }

  const initial = workspace?.name?.split(" ")?.[0]?.charAt(0) || "W";

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-slate-900/60 backdrop-blur-sm w-fit shadow-sm">
      {/* Workspace avatar */}
      <div className="relative shrink-0">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 flex items-center justify-center shadow-md">
          <span className="text-xl font-extrabold text-white leading-none">
            {initial}
          </span>
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900 flex items-center justify-center">
          <span className="sr-only">Active</span>
        </div>
      </div>

      {/* Workspace info */}
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 dark:text-slate-100 text-base truncate max-w-[200px]">
            {workspace?.name}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Building2 className="w-3 h-3 text-slate-400" />
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Free plan
          </span>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
