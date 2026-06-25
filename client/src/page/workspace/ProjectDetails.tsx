import { Separator } from "@/components/ui/separator";
import ProjectAnalytics from "@/components/workspace/project/project-analytics";
import ProjectHeader from "@/components/workspace/project/project-header";
import TaskTable from "@/components/workspace/task/task-table";

const ProjectDetails = () => {
  return (
    <div className="w-full space-y-8 py-4 md:pt-3">
      <ProjectHeader />
      <div className="space-y-8">
        <ProjectAnalytics />
        <Separator className="bg-slate-200 dark:bg-slate-800" />
        {/* {Task Table} */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl">
          <TaskTable />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
