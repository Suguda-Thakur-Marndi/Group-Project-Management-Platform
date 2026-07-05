"use client";

import {
  LucideIcon,
  Settings,
  Users,
  CheckCircle,
  LayoutDashboard,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { useAuthContext } from "@/context/auth-provider";
import { Permissions } from "@/constant";

type ItemType = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export function NavMain() {
  const { hasPermission } = useAuthContext();

  const canManageSettings = hasPermission(
    Permissions.MANAGE_WORKSPACE_SETTINGS
  );

  const workspaceId = useWorkspaceId();
  const location = useLocation();
  const pathname = location.pathname;

  const items: ItemType[] = [
    {
      title: "Dashboard",
      url: `/workspace/${workspaceId}`,
      icon: LayoutDashboard,
    },
    {
      title: "Tasks",
      url: `/workspace/${workspaceId}/tasks`,
      icon: CheckCircle,
    },
    {
      title: "Members",
      url: `/workspace/${workspaceId}/members`,
      icon: Users,
    },
    ...(canManageSettings
      ? [
          {
            title: "Settings",
            url: `/workspace/${workspaceId}/settings`,
            icon: Settings,
          },
        ]
      : []),
  ];

  return (
    <SidebarGroup className="px-2 py-1">
      <SidebarMenu className="gap-0">
        {items.map((item) => {
          const isActive = item.url === pathname;
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                isActive={isActive}
                asChild
                className={`
                  rounded-md h-9 transition-colors duration-150 text-[13px] font-medium
                  ${isActive
                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                  }
                `}
              >
                <Link to={item.url} className="flex items-center gap-2.5 px-2.5">
                  <item.icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
