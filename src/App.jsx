import { BrowserRouter } from "react-router";
import RouteManager from "./RouteManager/RouteManager";
import { AppContext } from "./context/AppContext";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import AppSidebar from "./sidebar/AppSidebar";
import Navbar from "./navbar/Navbar";

function App() {
  return (
    <AppContext.Provider>
      <BrowserRouter>
        <SidebarProvider>
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <SidebarTrigger className="h-[30px] absolute top-0" />
            <Navbar />
            <div className="bg-[#fafafa] flex-1 p-6">
              <RouteManager />
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
