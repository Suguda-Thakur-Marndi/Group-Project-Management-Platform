import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AuthProvider } from "@/context/auth-provider";
import Asidebar from "@/components/asidebar/asidebar";
import Header from "@/components/header";
import CreateWorkspaceDialog from "@/components/workspace/create-workspace-dialog";
import CreateProjectDialog from "@/components/workspace/project/create-project-dialog";

const AppLayout = () => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Asidebar />
        <SidebarInset className="relative min-h-screen overflow-x-hidden bg-slate-50 dark:bg-slate-950">
          {/* Ambient background blobs */}
          <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
            <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-indigo-300/20 dark:bg-indigo-800/15 rounded-full blur-[120px] animate-ambient-glow" />
            <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-300/20 dark:bg-purple-800/15 rounded-full blur-[120px] animate-ambient-glow-reverse" />
            <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-cyan-300/10 dark:bg-cyan-800/10 rounded-full blur-[100px] animate-ambient-glow" />
          </div>

          <div className="relative z-10 flex min-h-screen flex-col">
            <Header />
            <div className="mx-auto flex-1 w-full max-w-7xl px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-6">
              <Outlet />
            </div>
            <CreateWorkspaceDialog />
            <CreateProjectDialog />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default AppLayout;
