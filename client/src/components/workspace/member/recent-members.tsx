import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetWorkspaceMembers from "@/hooks/api/use-get-workspace-members";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { format } from "date-fns";
import { Loader, Users } from "lucide-react";

const roleBadgeColors: Record<string, string> = {
  OWNER:
    "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800",
  ADMIN:
    "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
  MEMBER:
    "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
};

const RecentMembers = () => {
  const workspaceId = useWorkspaceId();
  const { data, isPending } = useGetWorkspaceMembers(workspaceId);

  const members = data?.members || [];

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-6 h-6 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800">
          <Users className="w-8 h-8 text-slate-400" />
        </div>
        <div>
          <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
            No members yet
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Invite team members to collaborate
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {members.map((member, index) => {
        const name = member?.userId?.name || "";
        const initials = getAvatarFallbackText(name);
        const avatarColor = getAvatarColor(name);
        const roleName = member.role?.name || "MEMBER";
        const roleBadge = roleBadgeColors[roleName] || roleBadgeColors.MEMBER;

        return (
          <div
            key={index}
            className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/40 hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/10 transition-all duration-200"
          >
            <Avatar className="h-10 w-10 ring-2 ring-white dark:ring-slate-700 shadow-sm shrink-0">
              <AvatarImage
                src={member.userId.profilePicture || ""}
                alt={name}
              />
              <AvatarFallback className={`${avatarColor} text-sm font-bold`}>
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                {name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {member.joinedAt ? `Joined ${format(member.joinedAt, "MMM d, yyyy")}` : "—"}
              </p>
            </div>

            <span
              className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full shrink-0 ${roleBadge}`}
            >
              {roleName.toLowerCase()}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default RecentMembers;
