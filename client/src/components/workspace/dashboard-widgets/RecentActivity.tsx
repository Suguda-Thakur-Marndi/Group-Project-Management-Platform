import { useQuery } from "@tanstack/react-query";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { getAllTasksQueryFn } from "@/lib/api";
import useGetProjectsInWorkspaceQuery from "@/hooks/api/use-get-projects";
import useGetWorkspaceMembers from "@/hooks/api/use-get-workspace-members";
import { formatDistanceToNow } from "date-fns";
import { Activity, Loader, Folder, CheckSquare, UserPlus } from "lucide-react";

type ActivityItem = {
  id: string;
  type: "project" | "task" | "member";
  message: string;
  user: string;
  timestamp: Date;
};

const RecentActivity = () => {
  const workspaceId = useWorkspaceId();

  const { data: tasksData, isLoading: tasksLoading } = useQuery({
    queryKey: ["all-tasks", workspaceId],
    queryFn: () => getAllTasksQueryFn({ workspaceId }),
    enabled: !!workspaceId,
  });

  const { data: projectsData, isLoading: projectsLoading } = useGetProjectsInWorkspaceQuery({
    workspaceId,
    pageNumber: 1,
    pageSize: 20,
  });

  const { data: membersData, isLoading: membersLoading } = useGetWorkspaceMembers(workspaceId);

  const isLoading = tasksLoading || projectsLoading || membersLoading;

  // Compile actual events
  const activities: ActivityItem[] = [];

  if (projectsData?.projects) {
    projectsData.projects.forEach((proj) => {
      activities.push({
        id: `proj-${proj._id}`,
        type: "project",
        message: `created project "${proj.name}" ${proj.emoji || ""}`,
        user: proj.createdBy?.name || "Workspace Member",
        timestamp: new Date(proj.createdAt),
      });
    });
  }

  if (tasksData?.tasks) {
    tasksData.tasks.forEach((task) => {
      if (task.createdAt) {
        activities.push({
          id: `task-create-${task._id}`,
          type: "task",
          message: `created task "${task.title}" (${task.taskCode})`,
          user: task.assignedTo?.name || "Workspace Member",
          timestamp: new Date(task.createdAt),
        });
      }
      if (task.status === "DONE" && task.updatedAt) {
        activities.push({
          id: `task-done-${task._id}`,
          type: "task",
          message: `completed task "${task.title}" (${task.taskCode})`,
          user: task.assignedTo?.name || "Workspace Member",
          timestamp: new Date(task.updatedAt),
        });
      }
    });
  }

  if (membersData?.members) {
    membersData.members.forEach((m) => {
      activities.push({
        id: `member-${m._id}`,
        type: "member",
        message: `joined the workspace as ${m.role?.name.toLowerCase()}`,
        user: m.userId?.name || "New Member",
        timestamp: new Date(m.joinedAt || m.createdAt),
      });
    });
  }

  // Sort activities newest first
  const sortedActivities = activities
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 4);

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "project":
        return <Folder className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />;
      case "task":
        return <CheckSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      case "member":
        return <UserPlus className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />;
    }
  };

  return (
    <div className="clean-card bg-white dark:bg-slate-800 p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/50 pb-3">
        <Activity className="w-4 h-4 text-slate-400" />
        <h3 className="text-[15px] font-bold text-slate-800 dark:text-slate-200">
          Recent Activity
        </h3>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <Loader className="w-5 h-5 animate-spin text-indigo-500" />
        </div>
      ) : sortedActivities.length === 0 ? (
        <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500 font-medium">
          No workspace activity logs found.
        </div>
      ) : (
        <div className="flex flex-col gap-4 relative pl-3 border-l border-slate-100 dark:border-slate-700/60 ml-2 py-1">
          {sortedActivities.map((act) => (
            <div key={act.id} className="relative flex flex-col gap-0.5">
              {/* Event bullet point */}
              <span className="absolute -left-[20px] top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                {getActivityIcon(act.type)}
              </span>

              <p className="text-xs text-slate-800 dark:text-slate-200 leading-snug">
                <span className="font-bold">{act.user}</span> {act.message}
              </p>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                {formatDistanceToNow(act.timestamp, { addSuffix: true })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
