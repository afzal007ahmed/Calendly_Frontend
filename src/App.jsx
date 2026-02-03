import { BrowserRouter } from "react-router";
import RouteManager from "./RouteManager/RouteManager";
import { AppContext } from "./context/appContext";

function App() {
  return (
    <AppContext.Provider>
      <div className="flex">
        <BrowserRouter>
          <RouteManager />
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
