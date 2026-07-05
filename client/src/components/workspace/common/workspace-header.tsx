import { useAuthContext } from "@/context/auth-provider";
import { Loader } from "lucide-react";

const WorkspaceHeader = () => {
  const { workspaceLoading, workspace } = useAuthContext();

  if (workspaceLoading) {
    return (
      <div className="flex items-center gap-2 p-3 rounded-md border border-slate-200 bg-white w-fit">
        <Loader className="w-4 h-4 animate-spin text-slate-400" />
        <span className="text-sm text-slate-500">Loading workspace...</span>
      </div>
    );
  }

  const initial = workspace?.name?.split(" ")?.[0]?.charAt(0) || "W";

  return (
    <div className="flex items-center gap-3 p-3 rounded-md border border-slate-200 bg-white w-fit">
      {/* Workspace avatar */}
      <div className="w-9 h-9 rounded-md bg-slate-900 flex items-center justify-center shrink-0">
        <span className="text-sm font-bold text-white leading-none">
          {initial}
        </span>
      </div>

      {/* Workspace info */}
      <div className="min-w-0">
        <span className="font-semibold text-slate-900 text-sm truncate max-w-[180px] block">
          {workspace?.name}
        </span>
        <span className="text-xs text-slate-400">Free plan</span>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
