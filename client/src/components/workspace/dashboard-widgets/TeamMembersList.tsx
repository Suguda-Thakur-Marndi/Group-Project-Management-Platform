import useGetWorkspaceMembers from "@/hooks/api/use-get-workspace-members";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Loader } from "lucide-react";

const TeamMembersList = () => {
  const workspaceId = useWorkspaceId();
  const { data, isPending } = useGetWorkspaceMembers(workspaceId);

  const members = data?.members || [];
  const displayMembers = members.slice(0, 4);
  const remainingCount = members.length - 4;

  return (
    <div className="clean-card bg-white dark:bg-slate-800 p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/50 pb-3">
        <Users className="w-4 h-4 text-slate-400" />
        <h3 className="text-[15px] font-bold text-slate-800 dark:text-slate-200">
          Team Members
        </h3>
      </div>

      {isPending ? (
        <div className="flex items-center justify-center py-6">
          <Loader className="w-5 h-5 animate-spin text-indigo-500" />
        </div>
      ) : members.length === 0 ? (
        <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500 font-medium">
          No team members added yet.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {displayMembers.map((member, index) => {
            const name = member?.userId?.name || "";
            const initials = getAvatarFallbackText(name);
            const avatarColor = getAvatarColor(name);
            const roleName = member.role?.name || "MEMBER";

            return (
              <div key={index} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative shrink-0">
                    <Avatar className="h-8 w-8 ring-1 ring-slate-100 dark:ring-slate-800">
                      <AvatarImage
                        src={member.userId?.profilePicture || ""}
                        alt={name}
                      />
                      <AvatarFallback className={`${avatarColor} text-[10px] font-bold`}>
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-white dark:ring-slate-800" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {name}
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate font-medium">
                      {member.userId?.email}
                    </p>
                  </div>
                </div>

                <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-2 py-0.5 rounded-md text-slate-500 dark:text-slate-400">
                  {roleName.toLowerCase()}
                </span>
              </div>
            );
          })}

          {remainingCount > 0 && (
            <div className="text-center text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 pt-1">
              + {remainingCount} more team members
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamMembersList;
