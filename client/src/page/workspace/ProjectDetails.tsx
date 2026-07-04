import { Separator } from "@/components/ui/separator";
import ProjectAnalytics from "@/components/workspace/project/project-analytics";
import ProjectHeader from "@/components/workspace/project/project-header";
import TaskTable from "@/components/workspace/task/task-table";

const ProjectDetails = () => {
  return (
    <div className="flex flex-col gap-6 pb-8 animate-fade-in">
      {/* Project header (name, emoji, actions) */}
      <ProjectHeader />

      {/* Analytics cards */}
      <ProjectAnalytics />

      <Separator className="bg-slate-200 dark:bg-slate-800" />

      {/* Task table */}
      <div className="section-card !p-5 sm:!p-6">
        <TaskTable />
      </div>
    </div>
  );
};

export default ProjectDetails;
