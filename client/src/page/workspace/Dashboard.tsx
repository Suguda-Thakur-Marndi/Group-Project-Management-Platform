import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import useCreateProjectDialog from "@/hooks/use-create-project-dialog";
import WorkspaceAnalytics from "@/components/workspace/workspace-analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentProjects from "@/components/workspace/project/recent-projects";
import RecentTasks from "@/components/workspace/task/recent-tasks";
import RecentMembers from "@/components/workspace/member/recent-members";
const WorkspaceDashboard = () => {
  const { onOpen } = useCreateProjectDialog();
  return (
    <main className="flex flex-1 flex-col py-4 md:pt-3 space-y-6">
      <div className="flex items-center justify-between space-y-2 mb-2">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Workspace Overview
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Here&apos;s an overview for this workspace!
          </p>
        </div>
        <Button onClick={onOpen} className="h-11 px-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-md hover:shadow-indigo-500/25 transition-all duration-300 rounded-xl hover-lift">
          <Plus className="mr-2 h-5 w-5" />
          New Project
        </Button>
      </div>
      <WorkspaceAnalytics />
      <div className="mt-6">
        <Tabs defaultValue="projects" className="w-full border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl">
          <TabsList className="w-full justify-start border-0 bg-slate-100 dark:bg-slate-800/50 p-1.5 h-14 rounded-xl gap-2">
            <TabsTrigger className="py-2.5 px-6 font-semibold rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-md transition-all" value="projects">
              Recent Projects
            </TabsTrigger>
            <TabsTrigger className="py-2.5 px-6 font-semibold rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-md transition-all" value="tasks">
              Recent Tasks
            </TabsTrigger>
            <TabsTrigger className="py-2.5 px-6 font-semibold rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 data-[state=active]:shadow-md transition-all" value="members">
              Recent Members
            </TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="mt-6">
            <RecentProjects />
          </TabsContent>
          <TabsContent value="tasks" className="mt-6">
            <RecentTasks />
          </TabsContent>
          <TabsContent value="members" className="mt-6">
            <RecentMembers />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default WorkspaceDashboard;
