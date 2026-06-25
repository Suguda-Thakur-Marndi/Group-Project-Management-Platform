import { Separator } from "@/components/ui/separator";
import InviteMember from "@/components/workspace/member/invite-member";
import AllMembers from "@/components/workspace/member/all-members";
import WorkspaceHeader from "@/components/workspace/common/workspace-header";

export default function Members() {
  return (
    <div className="w-full h-auto pt-2 space-y-6">
      <WorkspaceHeader />
      <Separator className="my-4 bg-slate-200 dark:bg-slate-800" />
      <main>
        <div className="w-full max-w-4xl mx-auto pt-3 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
              Workspace members
            </h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Workspace members can view and join all Workspace project, tasks
              and create new task in the Workspace.
            </p>
          </div>
          <Separator className="my-6 bg-slate-200 dark:bg-slate-800" />

          <InviteMember />
          <Separator className="my-6 bg-slate-200 dark:bg-slate-800 !h-[0.5px]" />

          <AllMembers />
        </div>
      </main>
    </div>
  );
}
