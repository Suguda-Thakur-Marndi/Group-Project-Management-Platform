import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "./ui/separator";
import { Link, useLocation } from "react-router-dom";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { Bell, Search } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const workspaceId = useWorkspaceId();

  const pathname = location.pathname;

  const getPageLabel = (pathname: string) => {
    if (pathname.includes("/project/")) return "Project";
    if (pathname.includes("/settings")) return "Settings";
    if (pathname.includes("/tasks")) return "Tasks";
    if (pathname.includes("/members")) return "Members";
    return null;
  };

  const pageHeading = getPageLabel(pathname);

  return (
    <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center px-3 sm:px-4 glass-nav">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <SidebarTrigger className="h-8 w-8 shrink-0 rounded-lg transition-colors hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/40 dark:hover:text-indigo-400" />
        <Separator orientation="vertical" className="mr-1 hidden h-5 shrink-0 sm:block" />
        <Breadcrumb className="min-w-0">
          <BreadcrumbList>
            <BreadcrumbItem className="hidden sm:block">
              {pageHeading ? (
                <BreadcrumbLink asChild>
                  <Link
                    to={`/workspace/${workspaceId}`}
                    className="text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                  >
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  Dashboard
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>

            {pageHeading && (
              <>
                <BreadcrumbSeparator className="hidden sm:block text-slate-400" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {pageHeading}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-1">
        <button
          className="hidden rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 sm:inline-flex"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
        <button
          className="relative hidden rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 sm:inline-flex"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500" />
        </button>
        <Separator orientation="vertical" className="ml-1 hidden h-5 sm:block" />
      </div>
    </header>
  );
};

export default Header;
