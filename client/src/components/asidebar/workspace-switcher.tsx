import * as React from "react";
import { Check, ChevronDown, Loader, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useCreateWorkspaceDialog from "@/hooks/use-create-workspace-dialog";
import { useQuery } from "@tanstack/react-query";
import { getAllWorkspacesUserIsMemberQueryFn } from "@/lib/api";

type WorkspaceType = {
  _id: string;
  name: string;
};

export function WorkspaceSwitcher() {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();

  const { onOpen } = useCreateWorkspaceDialog();
  const workspaceId = useWorkspaceId();

  const [activeWorkspace, setActiveWorkspace] = React.useState<WorkspaceType>();

  const { data, isPending } = useQuery({
    queryKey: ["userWorkspaces"],
    queryFn: getAllWorkspacesUserIsMemberQueryFn,
    staleTime: 1,
    refetchOnMount: true,
  });

  const workspaces = data?.workspaces;

  React.useEffect(() => {
    if (workspaces?.length) {
      const workspace = workspaceId
        ? workspaces.find((ws) => ws._id === workspaceId)
        : workspaces[0];

      if (workspace) {
        setActiveWorkspace(workspace);
        if (!workspaceId) navigate(`/workspace/${workspace._id}`);
      }
    }
  }, [workspaceId, workspaces, navigate]);

  const onSelect = (workspace: WorkspaceType) => {
    setActiveWorkspace(workspace);
    navigate(`/workspace/${workspace._id}`);
  };

  const initial = activeWorkspace?.name?.split(" ")?.[0]?.charAt(0) || "W";

  return (
    <>
      <SidebarGroupLabel className="w-full justify-between pr-0 px-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
        <span>Workspaces</span>
        <button
          onClick={onOpen}
          className="flex size-6 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
        >
          <Plus className="size-3.5" />
        </button>
      </SidebarGroupLabel>

      <SidebarMenu className="px-2">
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800/60 transition-colors"
              >
                {activeWorkspace ? (
                  <>
                    {/* Workspace avatar */}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm shadow-sm">
                      {initial}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                      <span className="truncate font-semibold text-slate-900 dark:text-slate-100 text-[13px]">
                        {activeWorkspace?.name}
                      </span>
                      <span className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                        Free plan
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-slate-500 dark:text-slate-400">
                      No Workspace selected
                    </span>
                  </div>
                )}
                <ChevronDown className="ml-auto w-4 h-4 text-slate-400 shrink-0" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-60 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1.5"
              align="start"
              side="bottom"
              sideOffset={6}
            >
              <DropdownMenuLabel className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-2 py-1.5">
                Your Workspaces
              </DropdownMenuLabel>

              {isPending ? (
                <div className="flex items-center justify-center py-4">
                  <Loader className="w-5 h-5 animate-spin text-indigo-500" />
                </div>
              ) : null}

              {workspaces?.map((workspace) => (
                <DropdownMenuItem
                  key={workspace._id}
                  onClick={() => onSelect(workspace)}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 cursor-pointer"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/80 to-purple-600/80 text-white font-bold text-xs">
                    {workspace?.name?.split(" ")?.[0]?.charAt(0)}
                  </div>
                  <span className="flex-1 truncate font-medium text-sm">
                    {workspace.name}
                  </span>
                  {workspace._id === workspaceId && (
                    <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  )}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 my-1" />

              <DropdownMenuItem
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 cursor-pointer text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 focus:bg-indigo-50 dark:focus:bg-indigo-950/30 focus:text-indigo-600"
                onClick={onOpen}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
                  <Plus className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <span className="font-medium text-sm">New workspace</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
