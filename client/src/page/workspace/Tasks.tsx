import CreateTaskDialog from "@/components/workspace/task/create-task-dialog";
import TaskTable from "@/components/workspace/task/task-table";

export default function Tasks() {
  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">All Tasks</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Here&apos;s the list of tasks for this workspace!
          </p>
        </div>
        <div className="hover-lift">
          <CreateTaskDialog />
        </div>
      </div>
      {/* {Task Table} */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl">
        <TaskTable />
      </div>
    </div>
  );
}
