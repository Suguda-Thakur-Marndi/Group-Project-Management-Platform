import { Separator } from "@/components/ui/separator";
import WorkspaceHeader from "@/components/workspace/common/workspace-header";
import EditWorkspaceForm from "@/components/workspace/edit-workspace-form";
import DeleteWorkspaceCard from "@/components/workspace/settings/delete-workspace-card";
import { Permissions } from "@/constant";
import withPermission from "@/hoc/with-permission";
import { Settings as SettingsIcon, Sparkles } from "lucide-react";

const Settings = () => {
  return (
    <div className="flex flex-col gap-5 pb-8 animate-fade-in">
      <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-indigo-50/70 p-5 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-indigo-600/10 p-2.5 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
              <SettingsIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="mb-2 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300">
                Workspace settings
              </div>
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Manage your workspace with clarity
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Update your workspace identity, keep members aligned, and manage high-risk actions safely.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            <Sparkles className="h-4 w-4" />
            Quick controls
          </div>
        </div>
      </div>

      <WorkspaceHeader />

      <div className="max-w-4xl space-y-5">
        <div className="section-card">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                General
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Update your workspace name and description.
              </p>
            </div>
            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
              Editable
            </div>
          </div>
          <Separator className="mb-5 bg-slate-200 dark:bg-slate-800" />
          <EditWorkspaceForm />
        </div>

        <div className="section-card border-red-200 bg-red-50/50 dark:border-red-950/60 dark:bg-red-950/10">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-red-700 dark:text-red-400">
                Danger Zone
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Irreversible actions that permanently affect your workspace.
              </p>
            </div>
            <div className="rounded-full border border-red-200 bg-white/80 px-2.5 py-1 text-xs font-medium text-red-700 dark:border-red-900/60 dark:bg-slate-900/70 dark:text-red-300">
              High impact
            </div>
          </div>
          <Separator className="mb-5 bg-red-200 dark:bg-red-900/60" />
          <DeleteWorkspaceCard />
        </div>
      </div>
    </div>
  );
};

const SettingsWithPermission = withPermission(
  Settings,
  Permissions.MANAGE_WORKSPACE_SETTINGS
);

export default SettingsWithPermission;
