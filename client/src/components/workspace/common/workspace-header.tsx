import { useAuthContext } from "@/context/auth-provider";
import { Loader, Sparkles } from "lucide-react";

const WorkspaceHeader = () => {
  const { workspaceLoading, workspace } = useAuthContext();

  if (workspaceLoading) {
    return (
      <div className="flex w-full max-w-4xl items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Loader className="h-4 w-4 animate-spin text-slate-400" />
        <span className="text-sm text-slate-500 dark:text-slate-400">Loading workspace...</span>
      </div>
    );
  }

  const initial = workspace?.name?.split(" ")?.[0]?.charAt(0) || "W";
  const description = workspace?.description?.trim() || "Keep your workspace organized and up to date.";

  return (
    <div className="flex w-full max-w-4xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-base font-semibold text-white shadow-sm">
          {initial}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="block truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
              {workspace?.name || "Workspace"}
            </span>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
              Active
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
        <Sparkles className="h-4 w-4" />
        Free plan
      </div>
    </div>
  );
};

export default WorkspaceHeader;
