import AuthProvider from "@/AuthProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "@/components/CustomComponents/navbar/Navbar";
import AppSidebar from "@/components/CustomComponents/sidebar/AppSidebar";
import React from "react";
import { Outlet } from "react-router";

const MainPageWrapper = () => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <SidebarTrigger className="h-[30px] absolute top-0" />
          <Navbar />
          <div className="bg-[#fafafa] flex-1 p-6">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default MainPageWrapper;
