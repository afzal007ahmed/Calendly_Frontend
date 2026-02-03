import { Button } from "@/components/ui/button";
import { BrowserRouter } from "react-router";
import RouteManager from "./RouteManager/RouteManager";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <BrowserRouter>
        <RouteManager />
      </BrowserRouter>
    </div>
  );
}

export default App;
