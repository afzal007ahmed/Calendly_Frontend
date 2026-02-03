import React from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../components/ui/sidebar";
import { Calendar, Clock, Link } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { routes } from "@/Routes/routes";

const AppSidebar = () => {
  const currentUrl = useLocation().pathname;

  const menuItems = [
    {
      option: "Scheduling",
      link: routes.scheduling,
      icon: Link,
    },
    {
      option: "Meetings",
      link: routes.meetings,
      icon: Calendar,
    },
    {
      option: "Availabilty",
      link: routes.availability,
      icon: Clock,
    },
  ];
  return (
    <Sidebar> 
      <SidebarHeader className="mt-6 ml-4 bg-white">
        <div className="flex gap-2 items-end">
          <img
            src="calendly_logo.svg"
            className="h-[40px] w-[40px] object-cover"
          />
          <img src="calendly_name.svg" className="object-contain w-[100px]" />
        </div>
      </SidebarHeader>
      <SidebarContent className='bg-white'>
        <SidebarMenu className="p-4">
          {menuItems.map((item, index) => (
            <SidebarMenuItem key={index} className="mt-1">
              <SidebarMenuButton asChild className="px-2 py-6">
                <NavLink
                  to={item.link}
                  className={` ${currentUrl === item.link ? "bg-blue-100" : "bg-white"}`}
                >
                  <div className="flex items-center flex-row">
                    <item.icon
                      size={16}
                      color={` ${currentUrl === item.link ? "blue" : "black"}`}
                    />
                    <p
                      className={`${currentUrl === item.link ? "text-blue-600" : "text-black"} font-bold text-md ml-4`}
                    >
                      {item.option}
                    </p>
                  </div>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
