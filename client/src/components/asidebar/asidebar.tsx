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
        className="border-r border-slate-200 dark:border-slate-800/70 bg-white dark:bg-slate-900 shadow-sm"
      >
        {/* Header */}
        <SidebarHeader className="!py-3 border-b border-slate-100 dark:border-slate-800/60">
          <div className="flex h-11 items-center justify-start w-full px-2 gap-2">
            <Logo url={`/workspace/${workspaceId}`} />
            {open && (
              <Link
                to={`/workspace/${workspaceId}`}
                className="hidden md:flex ml-1 items-center font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                GPMS
              </Link>
            )}
          </div>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent className="!mt-0 dark:bg-transparent overflow-y-auto scrollbar">
          <SidebarGroup className="!py-0">
            <SidebarGroupContent className="space-y-1 pt-2">
              <WorkspaceSwitcher />
              <Separator className="mx-2 my-2 w-auto bg-slate-100 dark:bg-slate-800/60" />
              <NavMain />
              <Separator className="mx-2 my-2 w-auto bg-slate-100 dark:bg-slate-800/60" />
              <NavProjects />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="dark:bg-transparent py-3 border-t border-slate-100 dark:border-slate-800/60">
          <SidebarMenu>
            <SidebarMenuItem>
              {isLoading ? (
                <div className="flex items-center justify-center py-2">
                  <Loader size={20} className="animate-spin text-indigo-500" />
                </div>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="w-full rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors data-[state=open]:bg-indigo-50 dark:data-[state=open]:bg-indigo-900/20"
                    >
                      <Avatar className="h-8 w-8 rounded-full ring-2 ring-indigo-100 dark:ring-indigo-900 shadow-sm">
                        <AvatarImage src={user?.profilePicture || ""} />
                        <AvatarFallback className="rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs">
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
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1.5"
                    side="bottom"
                    align="start"
                    sideOffset={6}
                  >
                    {/* User info header in dropdown */}
                    <div className="px-3 py-2.5 mb-1 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>

                    <DropdownMenuGroup />
                    <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 my-1" />

                    <DropdownMenuItem
                      onClick={() => setIsOpen(true)}
                      className="cursor-pointer rounded-lg px-3 py-2.5 flex items-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors focus:bg-red-50 dark:focus:bg-red-950/30 focus:text-red-600"
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
