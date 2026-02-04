import { BrowserRouter } from "react-router-dom";
import RouteManager from "./RouteManager/RouteManager";
import { AppContext } from "./context/AppContext";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import AppSidebar from "./sidebar/AppSidebar";
import Navbar from "./navbar/Navbar";
import AuthProvider from "./AuthProvider";

function App() {
  // const token = localStorage.getItem("token");
  const token = true;

  return (
    <AppContext.Provider value={{}}>
      <BrowserRouter>
        <SidebarProvider>
          {token && <AppSidebar />}
          <AuthProvider>
            <div className="flex-1 flex flex-col">
              {token && <SidebarTrigger className="h-[30px] absolute top-0" />}
              {token && <Navbar />}
              <div className="bg-[#fafafa] flex-1 p-6">
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
