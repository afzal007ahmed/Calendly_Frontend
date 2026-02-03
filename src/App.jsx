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
          <SidebarTrigger />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <RouteManager />
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
