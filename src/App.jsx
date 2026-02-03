import { Button } from "@/components/ui/button";
import { BrowserRouter } from "react-router";
import RouteManager from "./RouteManager/RouteManager";

function App() {
  return (
    <div className="flex">
      <BrowserRouter>
        <RouteManager />
      </BrowserRouter>
    </div>
  );
}

export default App;
