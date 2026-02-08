import { BrowserRouter } from "react-router-dom";
import RouteManager from "./RouteManager/RouteManager";
import { AppContext } from "./context/AppContext";
import { useState } from "react";
import { Toaster } from "sonner";

function App() {
  const [user, setUser] = useState({ data: null, loading: false });
  return (
    <AppContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Toaster />
        <RouteManager />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
