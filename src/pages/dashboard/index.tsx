import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Dashboard from "@/components/Dashboard";

const DashboardPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div className="min-h-screen p-6"> 
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardPage; 