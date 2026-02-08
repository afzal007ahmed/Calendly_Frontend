import AuthProvider from "@/AuthProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "@/navbar/Navbar";
import AppSidebar from "@/sidebar/AppSidebar";
import React from "react";
import { Outlet } from "react-router";

const MainPageWrapper = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <AuthProvider>
        <div className="flex-1 flex flex-col">
          <SidebarTrigger className="h-[30px] absolute top-0" />
          <Navbar />
          <div className="bg-[#fafafa] flex-1 p-6">
            <Outlet/> 
          </div>
        </div>
      </AuthProvider>
    </SidebarProvider>
  );
};

export default MainPageWrapper;
