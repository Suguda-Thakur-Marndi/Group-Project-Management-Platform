import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCreateProjectDialog from "@/hooks/use-create-project-dialog";
import WorkspaceAnalytics from "@/components/workspace/workspace-analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentProjects from "@/components/workspace/project/recent-projects";
import RecentTasks from "@/components/workspace/task/recent-tasks";
import RecentMembers from "@/components/workspace/member/recent-members";
import { useAuthContext } from "@/context/auth-provider";

const WorkspaceDashboard = () => {
  const { onOpen } = useCreateProjectDialog();
  const { workspace } = useAuthContext();

  return (
    <main className="flex flex-1 flex-col gap-5 pb-10 animate-fade-in">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Workspace Overview
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {workspace?.name
              ? `Here's an overview for ${workspace.name}!`
              : "Here's an overview for this workspace!"}
          </p>
        </div>
        <Button
          onClick={onOpen}
          className="h-9 px-4 bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors rounded-md shadow-none border-0 shrink-0"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* ── Analytics Cards ── */}
      <WorkspaceAnalytics />

      {/* ── Tabbed Content ── */}
      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
        <Tabs defaultValue="projects" className="w-full">
          {/* Tab header */}
          <div className="border-b border-slate-200 px-4">
            <TabsList className="h-auto bg-transparent p-0 gap-0">
              {(
                [
                  { value: "projects", label: "Recent Projects" },
                  { value: "tasks", label: "Recent Tasks" },
                  { value: "members", label: "Recent Members" },
                ] as const
              ).map(({ value, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="
                    relative px-4 py-3 mb-0
                    text-sm font-medium
                    text-slate-500
                    data-[state=active]:text-slate-900
                    bg-transparent shadow-none rounded-none
                    border-b-2 border-transparent
                    data-[state=active]:border-slate-900
                    hover:text-slate-700
                    transition-all duration-150
                  "
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab content */}
          <div className="p-5">
            <TabsContent value="projects" className="mt-0 animate-fade-in">
              <RecentProjects />
            </TabsContent>
            <TabsContent value="tasks" className="mt-0 animate-fade-in">
              <RecentTasks />
            </TabsContent>
            <TabsContent value="members" className="mt-0 animate-fade-in">
              <RecentMembers />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
};

export default WorkspaceDashboard;
