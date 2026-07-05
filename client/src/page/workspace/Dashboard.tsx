import { Plus, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import useCreateProjectDialog from "@/hooks/use-create-project-dialog";
import WorkspaceAnalytics from "@/components/workspace/workspace-analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentProjects from "@/components/workspace/project/recent-projects";
import RecentTasks from "@/components/workspace/task/recent-tasks";
import RecentMembers from "@/components/workspace/member/recent-members";
import { FolderOpen, CheckSquare, Users } from "lucide-react";
import { useAuthContext } from "@/context/auth-provider";

const WorkspaceDashboard = () => {
  const { onOpen } = useCreateProjectDialog();
  const { workspace, user } = useAuthContext();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <main className="flex flex-1 flex-col gap-6 pb-10 animate-fade-in">
      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-200/40 dark:border-indigo-800/30 shadow-xl">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(139,92,246,0.3)_0%,_transparent_50%)]" />
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-violet-400/20 blur-2xl" />

        <div className="relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7 lg:p-8">
          <div className="min-w-0">
            {/* Greeting chip */}
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              {greeting()}, {user?.name?.split(" ")?.[0] || "there"}
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-sm sm:text-3xl">
              {workspace?.name ? `${workspace.name}` : "My Workspace"}
            </h1>
            <p className="mt-1.5 text-sm font-normal text-indigo-100/80">
              Here's what's happening across your workspace today.
            </p>
          </div>
          <Button
            onClick={onOpen}
            className="h-11 px-6 bg-white text-indigo-700 font-bold hover:bg-indigo-50 shadow-lg shadow-indigo-900/30 transition-all duration-200 rounded-xl hover:-translate-y-0.5 hover:shadow-xl shrink-0 border-0"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* ── Analytics Cards ── */}
      <WorkspaceAnalytics />

      {/* ── Tabbed Content ── */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/70 shadow-md backdrop-blur-xl">
        <Tabs defaultValue="projects" className="w-full">
          {/* Tab header */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/60 px-6 pt-5 pb-0">
            <TabsList className="h-auto bg-transparent p-0 gap-0">
              {([
                { value: "projects", icon: FolderOpen, label: "Recent Projects" },
                { value: "tasks",    icon: CheckSquare, label: "Recent Tasks" },
                { value: "members",  icon: Users,        label: "Members" },
              ] as const).map(({ value, icon: Icon, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="
                    relative flex items-center gap-2 px-4 py-3 mb-0
                    text-sm font-semibold
                    text-slate-500 dark:text-slate-400
                    data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400
                    bg-transparent shadow-none rounded-none
                    border-b-2 border-transparent
                    data-[state=active]:border-indigo-600 dark:data-[state=active]:border-indigo-400
                    hover:text-slate-800 dark:hover:text-slate-200
                    transition-all duration-200
                  "
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab content */}
          <div className="p-6">
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
