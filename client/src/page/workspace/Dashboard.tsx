import { Plus, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import useCreateProjectDialog from "@/hooks/use-create-project-dialog";
import WorkspaceAnalytics from "@/components/workspace/workspace-analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentProjects from "@/components/workspace/project/recent-projects";
import RecentTasks from "@/components/workspace/task/recent-tasks";
import RecentMembers from "@/components/workspace/member/recent-members";
import { FolderOpen, CheckSquare, Users } from "lucide-react";

const WorkspaceDashboard = () => {
  const { onOpen } = useCreateProjectDialog();

  return (
    <main className="flex flex-1 flex-col space-y-6 pb-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25 shrink-0">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Workspace Overview
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-normal mt-0.5">
              Here's what's happening across your workspace today.
            </p>
          </div>
        </div>
        <Button
          onClick={onOpen}
          className="h-10 px-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 rounded-xl hover:-translate-y-0.5 shrink-0"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Analytics Cards */}
      <WorkspaceAnalytics />

      {/* Tabbed Content Area */}
      <div className="section-card !p-0 overflow-hidden">
        <Tabs defaultValue="projects" className="w-full">
          {/* Tab List */}
          <div className="px-6 pt-5 border-b border-slate-200 dark:border-slate-800/60">
            <TabsList className="h-auto bg-transparent p-0 gap-1 flex-wrap">
              <TabsTrigger
                value="projects"
                className="
                  flex items-center gap-2 px-4 py-2.5 rounded-t-none rounded-b-none
                  border-b-2 border-transparent
                  text-sm font-semibold text-slate-500 dark:text-slate-400
                  data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400
                  hover:text-slate-700 dark:hover:text-slate-200
                  bg-transparent shadow-none
                  transition-all duration-200
                "
              >
                <FolderOpen className="w-4 h-4" />
                Recent Projects
              </TabsTrigger>
              <TabsTrigger
                value="tasks"
                className="
                  flex items-center gap-2 px-4 py-2.5 rounded-t-none rounded-b-none
                  border-b-2 border-transparent
                  text-sm font-semibold text-slate-500 dark:text-slate-400
                  data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400
                  hover:text-slate-700 dark:hover:text-slate-200
                  bg-transparent shadow-none
                  transition-all duration-200
                "
              >
                <CheckSquare className="w-4 h-4" />
                Recent Tasks
              </TabsTrigger>
              <TabsTrigger
                value="members"
                className="
                  flex items-center gap-2 px-4 py-2.5 rounded-t-none rounded-b-none
                  border-b-2 border-transparent
                  text-sm font-semibold text-slate-500 dark:text-slate-400
                  data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400
                  hover:text-slate-700 dark:hover:text-slate-200
                  bg-transparent shadow-none
                  transition-all duration-200
                "
              >
                <Users className="w-4 h-4" />
                Members
              </TabsTrigger>
            </TabsList>
          </div>

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
