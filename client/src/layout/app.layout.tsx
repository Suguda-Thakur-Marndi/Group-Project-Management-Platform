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
        <SidebarInset className="overflow-x-hidden relative bg-slate-50 dark:bg-slate-950 min-h-screen">
          {/* Ambient background blobs */}
          <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
            <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-indigo-300/20 dark:bg-indigo-800/15 rounded-full blur-[120px] animate-ambient-glow" />
            <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-300/20 dark:bg-purple-800/15 rounded-full blur-[120px] animate-ambient-glow-reverse" />
            <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-cyan-300/10 dark:bg-cyan-800/10 rounded-full blur-[100px] animate-ambient-glow" />
          </div>

          <div className="flex flex-col min-h-screen relative z-10">
            <Header />
            <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
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
