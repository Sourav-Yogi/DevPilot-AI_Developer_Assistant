import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex h-screen flex-col">
        {/* Fixed Navbar */}
        <div className="fixed left-64 right-0 top-0 z-30">
          <Navbar />
        </div>

        {/* Scrollable Content */}
        <main className="mt-16 flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;