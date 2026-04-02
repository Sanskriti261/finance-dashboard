import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  const { darkMode } = useContext(AppContext);

  return (
    <div className={darkMode ? "dark" : ""}>
      
      {/*  Main Layout */}
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-all duration-300">
        
        {/*  Fixed Sidebar */}
        <Sidebar />

        {/*  Main Content (IMPORTANT FIX: ml-64) */}
        <div className="ml-64 flex flex-col min-h-screen">
          
          {/*  Navbar */}
          <Navbar />

          {/*  Page Content */}
          <div className="flex-1 p-6">
            <Dashboard />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;