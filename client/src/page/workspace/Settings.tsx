import { Separator } from "@/components/ui/separator";
import WorkspaceHeader from "@/components/workspace/common/workspace-header";
import EditWorkspaceForm from "@/components/workspace/edit-workspace-form";
import DeleteWorkspaceCard from "@/components/workspace/settings/delete-workspace-card";
import { Permissions } from "@/constant";
import withPermission from "@/hoc/with-permission";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <div className="flex flex-col gap-6 pb-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-slate-500 to-slate-700 shadow-lg shadow-slate-500/20 shrink-0">
          <SettingsIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Workspace Settings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-normal mt-0.5">
            Manage your workspace preferences and configuration.
          </p>
        </div>
      </div>

      {/* Workspace Identity */}
      <WorkspaceHeader />

      {/* Settings Sections */}
      <div className="max-w-3xl space-y-6">
        {/* Edit workspace */}
        <div className="section-card">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            General
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
            Update your workspace name and appearance.
          </p>
          <Separator className="mb-5 bg-slate-200 dark:bg-slate-800" />
          <EditWorkspaceForm />
        </div>

        {/* Danger zone */}
        <div className="section-card border-red-200 dark:border-red-900/50 bg-red-50/30 dark:bg-red-950/10">
          <h2 className="text-base font-bold text-red-700 dark:text-red-400 mb-1">
            Danger Zone
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
            Irreversible actions that permanently affect your workspace.
          </p>
          <Separator className="mb-5 bg-red-200 dark:bg-red-900/40" />
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
