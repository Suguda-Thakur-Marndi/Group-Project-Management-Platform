import CreateTaskDialog from "@/components/workspace/task/create-task-dialog";
import TaskTable from "@/components/workspace/task/task-table";
import { CheckSquare } from "lucide-react";

export default function Tasks() {
  return (
    <div className="flex flex-col gap-6 pb-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25 shrink-0">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              All Tasks
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-normal mt-0.5">
              Track and manage every task across your workspace.
            </p>
          </div>
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
