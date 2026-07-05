import { useState } from "react";
import { Link } from "react-router-dom";
import { EllipsisIcon, Loader, LogOut, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/logo";
import LogoutDialog from "./logout-dialog";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { Separator } from "../ui/separator";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { useAuthContext } from "@/context/auth-provider";

const Asidebar = () => {
  const { isLoading, user } = useAuthContext();
  const { open } = useSidebar();
  const workspaceId = useWorkspaceId();
  const [isOpen, setIsOpen] = useState(false);

  const userInitials = [
    user?.name?.split(" ")?.[0]?.charAt(0),
    user?.name?.split(" ")?.[1]?.charAt(0),
  ]
    .filter(Boolean)
    .join("");

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 transition-colors duration-200"
      >
        {/* Header */}
        <SidebarHeader className="border-b border-slate-200 dark:border-slate-800/80 !py-0 bg-white dark:bg-slate-900">
          <div className="flex h-14 w-full items-center justify-start gap-2 overflow-hidden px-3">
            <Logo url={`/workspace/${workspaceId}`} />
            {open && (
              <Link
                to={`/workspace/${workspaceId}`}
                className="ml-1 flex items-center text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                GPMS
              </Link>
            )}
          </div>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent className="!mt-0 bg-white dark:bg-slate-900 overflow-y-auto scrollbar">
          <SidebarGroup className="!py-0">
            <SidebarGroupContent className="space-y-0 pt-2">
              <WorkspaceSwitcher />
              <NavMain />
              <Separator className="mx-2 my-1 w-auto bg-slate-100 dark:bg-slate-800/60" />
              <NavProjects />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="bg-white dark:bg-slate-900 py-3 border-t border-slate-200 dark:border-slate-800/80">
          <SidebarMenu>
            <SidebarMenuItem>
              {isLoading ? (
                <div className="flex items-center justify-center py-2">
                  <Loader size={16} className="animate-spin text-slate-400" />
                </div>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="w-full rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors data-[state=open]:bg-slate-50 dark:data-[state=open]:bg-slate-800"
                    >
                      <Avatar className="h-8 w-8 rounded-full">
                        <AvatarImage src={user?.profilePicture || ""} />
                        <AvatarFallback className="rounded-full bg-slate-800 dark:bg-slate-700 text-white font-semibold text-xs">
                          {userInitials || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                        <span className="truncate font-semibold text-slate-900 dark:text-slate-100 text-[13px]">
                          {user?.name}
                        </span>
                        <span className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                          {user?.email}
                        </span>
                      </div>
                      <EllipsisIcon className="ml-auto size-4 text-slate-400 shrink-0" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1"
                    side="bottom"
                    align="start"
                    sideOffset={4}
                  >
                    {/* User info */}
                    <div className="px-3 py-2 mb-1 rounded-md bg-slate-50 dark:bg-slate-800/40">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>

                    <DropdownMenuGroup />
                    <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-850 my-1" />

                    <DropdownMenuItem
                      onClick={() => setIsOpen(true)}
                      className="cursor-pointer rounded-md px-3 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors focus:bg-red-50 dark:focus:bg-red-950/30 focus:text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="font-medium text-sm">Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <LogoutDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Asidebar;
