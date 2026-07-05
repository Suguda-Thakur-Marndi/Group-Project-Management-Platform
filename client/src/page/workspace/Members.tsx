import { Separator } from "@/components/ui/separator";
import InviteMember from "@/components/workspace/member/invite-member";
import AllMembers from "@/components/workspace/member/all-members";
import WorkspaceHeader from "@/components/workspace/common/workspace-header";

export default function Members() {
  return (
    <div className="flex flex-col gap-5 pb-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Team Members</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage workspace access and member roles.
        </p>
      </div>

      {/* Workspace Identity */}
      <WorkspaceHeader />

      {/* Members Section */}
      <div className="section-card space-y-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Workspace members
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Members can view and join all workspace projects, tasks, and create new tasks.
          </p>
        </div>

        <Separator className="bg-slate-200 dark:bg-slate-800" />

        {/* Invite */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            Invite new member
          </h3>
          <InviteMember />
        </div>

        <Separator className="bg-slate-200 dark:bg-slate-800" />

        {/* All members list */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Current members
          </h3>
          <AllMembers />
        </div>
      </div>
    </div>
  );
}
