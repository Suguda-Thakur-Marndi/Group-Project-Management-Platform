import {
  ArrowRight,
  Folder,
  Loader,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useCreateProjectDialog from "@/hooks/use-create-project-dialog";
import { ConfirmDialog } from "../resuable/confirm-dialog";
import useConfirmDialog from "@/hooks/use-confirm-dialog";
import { Button } from "../ui/button";
import { Permissions } from "@/constant";
import PermissionsGuard from "../resuable/permission-guard";
import { useState } from "react";
import useGetProjectsInWorkspaceQuery from "@/hooks/api/use-get-projects";
import { PaginationType } from "@/types/api.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export function NavProjects() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const queryClient = useQueryClient();
  const workspaceId = useWorkspaceId();

  const { isMobile } = useSidebar();
  const { onOpen } = useCreateProjectDialog();
  const { context, open, onOpenDialog, onCloseDialog } = useConfirmDialog();

  const [pageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: deleteProjectMutationFn,
  });

  const { data, isPending, isFetching, isError } =
    useGetProjectsInWorkspaceQuery({
      workspaceId,
      pageSize,
      pageNumber,
    });

  const projects = data?.projects || [];
  const pagination = data?.pagination || ({} as PaginationType);
  const hasMore = pagination?.totalPages > pageNumber;

  const fetchNextPage = () => {
    if (!hasMore || isFetching) return;
    setPageSize((prev) => prev + 5);
  };

  const handleConfirm = () => {
    if (!context) return;
    mutate(
      {
        workspaceId,
        projectId: context?._id,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["allprojects", workspaceId],
          });
          toast({
            title: "Success",
            description: data.message,
            variant: "success",
          });

          navigate(`/workspace/${workspaceId}`);
          setTimeout(() => onCloseDialog(), 100);
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden px-2 py-1">
        <SidebarGroupLabel className="w-full justify-between pr-0 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1 mb-0.5">
          <span>Projects</span>

          <PermissionsGuard requiredPermission={Permissions.CREATE_PROJECT}>
            <button
              onClick={onOpen}
              type="button"
              className="flex size-5 items-center justify-center rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Plus className="size-3.5" />
            </button>
          </PermissionsGuard>
        </SidebarGroupLabel>

        <SidebarMenu className="h-[280px] scrollbar overflow-y-auto pb-2 gap-0">
          {isError ? (
            <p className="px-3 py-1 text-xs text-red-500">Error occurred</p>
          ) : null}

          {isPending ? (
            <Loader className="w-4 h-4 animate-spin place-self-center mt-4 text-slate-400" />
          ) : null}

          {!isPending && projects?.length === 0 ? (
            <div className="pl-3 pr-2">
              <p className="text-xs text-slate-400 leading-relaxed">
                There is no projects in this Workspace yet. Projects you create
                will show up here.
              </p>
              <PermissionsGuard requiredPermission={Permissions.CREATE_PROJECT}>
                <Button
                  variant="link"
                  type="button"
                  className="h-auto p-0 text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-2 underline-offset-2"
                  onClick={onOpen}
                >
                  Create a project
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </PermissionsGuard>
            </div>
          ) : (
            projects.map((item) => {
              const projectUrl = `/workspace/${workspaceId}/project/${item._id}`;

              return (
                <SidebarMenuItem key={item._id}>
                  <SidebarMenuButton
                    asChild
                    isActive={projectUrl === pathname}
                    className={`
                      rounded-md h-9 transition-colors duration-150 text-[13px] font-medium
                      ${
                        projectUrl === pathname
                          ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                      }
                    `}
                  >
                    <Link to={projectUrl} className="flex items-center gap-2 px-2">
                      <span className="text-sm leading-none">{item.emoji}</span>
                      <span className="truncate">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal className="w-3.5 h-3.5" />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-44 rounded-lg border border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900 p-1"
                      side={isMobile ? "bottom" : "right"}
                      align={isMobile ? "end" : "start"}
                    >
                      <DropdownMenuItem
                        onClick={() => navigate(`${projectUrl}`)}
                        className="rounded-md text-sm cursor-pointer dark:hover:bg-slate-800"
                      >
                        <Folder className="w-4 h-4 text-slate-400 dark:text-slate-500 mr-2" />
                        <span>View Project</span>
                      </DropdownMenuItem>

                      <PermissionsGuard
                        requiredPermission={Permissions.DELETE_PROJECT}
                      >
                        <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 my-1" />
                        <DropdownMenuItem
                          disabled={isLoading}
                          onClick={() => onOpenDialog(item)}
                          className="rounded-md text-sm cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/30"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          <span>Delete Project</span>
                        </DropdownMenuItem>
                      </PermissionsGuard>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              );
            })
          )}

          {hasMore && (
            <SidebarMenuItem>
              <SidebarMenuButton
                className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 text-xs rounded-md dark:hover:bg-slate-800"
                disabled={isFetching}
                onClick={fetchNextPage}
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
                <span>{isFetching ? "Loading..." : "Load more"}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroup>

      <ConfirmDialog
        isOpen={open}
        isLoading={isLoading}
        onClose={onCloseDialog}
        onConfirm={handleConfirm}
        title="Delete Project"
        description={`Are you sure you want to delete ${
          context?.name || "this item"
        }? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
