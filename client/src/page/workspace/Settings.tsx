import { Separator } from "@/components/ui/separator";
import WorkspaceHeader from "@/components/workspace/common/workspace-header";
import EditWorkspaceForm from "@/components/workspace/edit-workspace-form";
import DeleteWorkspaceCard from "@/components/workspace/settings/delete-workspace-card";
import { Permissions } from "@/constant";
import withPermission from "@/hoc/with-permission";

const Settings = () => {
  return (
    <div className="flex flex-col gap-5 pb-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Workspace Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your workspace preferences and configuration.
        </p>
      </div>

      {/* Workspace Identity */}
      <WorkspaceHeader />

      {/* Settings Sections */}
      <div className="max-w-3xl space-y-5">
        {/* Edit workspace */}
        <div className="section-card">
          <h2 className="text-base font-semibold text-slate-900 mb-1">
            General
          </h2>
          <p className="text-sm text-slate-500 mb-5">
            Update your workspace name and appearance.
          </p>
          <Separator className="mb-5 bg-slate-200" />
          <EditWorkspaceForm />
        </div>

        {/* Danger zone */}
        <div className="section-card border-red-200 bg-red-50/40">
          <h2 className="text-base font-semibold text-red-700 mb-1">
            Danger Zone
          </h2>
          <p className="text-sm text-slate-500 mb-5">
            Irreversible actions that permanently affect your workspace.
          </p>
          <Separator className="mb-5 bg-red-200" />
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
