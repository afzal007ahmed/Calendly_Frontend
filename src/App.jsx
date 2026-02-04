import { BrowserRouter } from "react-router-dom";
import RouteManager from "./RouteManager/RouteManager";
import { AppContext } from "./context/AppContext";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import AppSidebar from "./sidebar/AppSidebar";
import Navbar from "./navbar/Navbar";
import AuthProvider from "./AuthProvider";
import { Toaster } from "sonner";
import { useState } from "react";
import { routes } from "./Routes/routes";

function App() {
  const [user, setUser] = useState({ data: null, loading: false });
  return (
    <AppContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <SidebarProvider>
          {user.data && <AppSidebar />}
          <AuthProvider>
            <div className="flex-1 flex flex-col">
              {user.data && (
                <SidebarTrigger className="h-[30px] absolute top-0" />
              )}
              {user.data && <Navbar />}
              <div className="bg-[#fafafa] flex-1 p-6">
                <Toaster />
                <RouteManager />
              </div>
            </div>
          </AuthProvider>
        </SidebarProvider>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
