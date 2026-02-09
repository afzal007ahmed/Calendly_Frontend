import { BrowserRouter } from "react-router-dom";
import RouteManager from "./RouteManager/RouteManager";
import { Toaster } from "sonner";

function App() {
  return (
      <BrowserRouter>
        <Toaster />
        <RouteManager />
      </BrowserRouter>
  );
}

export default App;
