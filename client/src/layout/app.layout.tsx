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
        <SidebarInset className="overflow-x-hidden relative bg-slate-50 dark:bg-slate-950">
          {/* Animated Ambient Background Shapes */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-800/20 rounded-full blur-3xl pointer-events-none animate-ambient-glow" />
          <div className="absolute top-1/3 right-10 w-80 h-80 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-3xl pointer-events-none animate-ambient-glow-reverse" />
          
          <div className="w-full relative z-10">
            <>
              <Header />
              <div className="px-4 lg:px-12 py-6 max-w-7xl mx-auto">
                <Outlet />
              </div>
            </>
            <CreateWorkspaceDialog />
            <CreateProjectDialog />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default AppLayout;
