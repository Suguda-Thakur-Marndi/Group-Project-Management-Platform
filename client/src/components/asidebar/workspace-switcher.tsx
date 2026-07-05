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

  return (
    <>
      <SidebarGroupLabel className="w-full justify-between pr-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
        <span>Workspaces</span>
        <button
          onClick={onOpen}
          className="flex size-5 items-center justify-center rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Plus className="size-3.5" />
        </button>
      </SidebarGroupLabel>

      <SidebarMenu className="px-2 mb-1">
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="sm"
                className="h-9 rounded-md px-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {activeWorkspace ? (
                  <span className="truncate text-[13px] font-medium text-slate-800 dark:text-slate-200">
                    {activeWorkspace?.name}
                  </span>
                ) : (
                  <span className="truncate text-[13px] text-slate-500 dark:text-slate-400">
                    No Workspace selected
                  </span>
                )}
                <ChevronDown className="ml-auto h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1"
              align="start"
              side="bottom"
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-2 py-1.5">
                Your Workspaces
              </DropdownMenuLabel>

              {isPending ? (
                <div className="flex items-center justify-center py-3">
                  <Loader className="w-4 h-4 animate-spin text-slate-400" />
                </div>
              ) : null}

              {workspaces?.map((workspace) => (
                <DropdownMenuItem
                  key={workspace._id}
                  onClick={() => onSelect(workspace)}
                  className="flex items-center gap-2.5 rounded-md px-2.5 py-2 cursor-pointer text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-800 dark:bg-slate-700 text-white font-semibold text-xs">
                    {workspace?.name?.split(" ")?.[0]?.charAt(0)}
                  </div>
                  <span className="flex-1 truncate font-medium text-slate-800 dark:text-slate-200">
                    {workspace.name}
                  </span>
                  {workspace._id === workspaceId && (
                    <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  )}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 my-1" />

              <DropdownMenuItem
                className="flex items-center gap-2.5 rounded-md px-2.5 py-2 cursor-pointer text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 focus:bg-indigo-50 dark:focus:bg-indigo-950/20 focus:text-indigo-600 text-sm"
                onClick={onOpen}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded border border-dashed border-slate-300 dark:border-slate-700">
                  <Plus className="w-3 h-3 text-slate-400" />
                </div>
                <span className="font-medium">New workspace</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
