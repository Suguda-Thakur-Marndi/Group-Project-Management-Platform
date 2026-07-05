import CreateTaskDialog from "@/components/workspace/task/create-task-dialog";
import TaskTable from "@/components/workspace/task/task-table";

export default function Tasks() {
  return (
    <div className="flex flex-col gap-5 pb-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">All Tasks</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track and manage every task across your workspace.
          </p>
        </div>
        <div className="shrink-0">
          <CreateTaskDialog />
        </div>
      </div>

      {/* Task Table */}
      <div className="section-card !p-5 sm:!p-6">
        <TaskTable />
      </div>
    </div>
  );
}
