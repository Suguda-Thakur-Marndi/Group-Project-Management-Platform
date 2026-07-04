import { Separator } from "@/components/ui/separator";
import InviteMember from "@/components/workspace/member/invite-member";
import AllMembers from "@/components/workspace/member/all-members";
import WorkspaceHeader from "@/components/workspace/common/workspace-header";
import { Users } from "lucide-react";

export default function Members() {
  return (
    <div className="flex flex-col gap-6 pb-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25 shrink-0">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Team Members
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-normal mt-0.5">
            Manage workspace access and member roles.
          </p>
        </div>
      </div>

      {/* Workspace Identity */}
      <WorkspaceHeader />

      {/* Members Section */}
      <div className="section-card space-y-6">
        {/* Section Title */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
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
