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
import { useTheme } from "@/context/theme-provider";
import { Sun, Moon } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const workspaceId = useWorkspaceId();
  const pathname = location.pathname;
  const { theme, setTheme } = useTheme();

  const getPageLabel = (pathname: string) => {
    if (pathname.includes("/project/")) return "Project";
    if (pathname.includes("/settings")) return "Settings";
    if (pathname.includes("/tasks")) return "Tasks";
    if (pathname.includes("/members")) return "Members";
    return null;
  };

  const pageHeading = getPageLabel(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between px-3 sm:px-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-200">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <SidebarTrigger className="h-8 w-8 shrink-0 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 transition-colors" />
        <span className="font-extrabold text-sm tracking-widest bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent select-none ml-1">
          GPMS
        </span>
        <Separator orientation="vertical" className="mr-1 h-5 shrink-0 bg-slate-200 dark:bg-slate-800" />
        <Breadcrumb className="min-w-0">
          <BreadcrumbList>
            <BreadcrumbItem className="hidden sm:block">
              {pageHeading ? (
                <BreadcrumbLink asChild>
                  <Link
                    to={`/workspace/${workspaceId}`}
                    className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors"
                  >
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Dashboard
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>

            {pageHeading && (
              <>
                <BreadcrumbSeparator className="hidden sm:block text-slate-400 dark:text-slate-600" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {pageHeading}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="relative flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 bg-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
        aria-label="Toggle theme"
      >
        <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </button>
    </header>
  );
};

export default Header;
