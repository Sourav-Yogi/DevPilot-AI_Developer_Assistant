import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Code2,
  FileText,
  FileCode2,
  History,
  LogOut,
  Cpu,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Code Review",
      path: "/code-review",
      icon: <Code2 size={20} />,
    },
    {
      title: "README Generator",
      path: "/readme-generator",
      icon: <FileText size={20} />,
    },
    {
      title: "Unit Test Generator",
      path: "/unit-test-generator",
      icon: <FileCode2 size={20} />,
    },
    {
      title: "History",
      path: "/history",
      icon: <History size={20} />,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col">
      <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-6">
        <div className="rounded-lg bg-blue-600 p-2">
          <Cpu size={20} className="text-white" />
        </div>

        <h1 className="text-2xl font-bold">
          <span className="text-white">Dev</span>
          <span className="text-blue-500">Pilot</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.icon}
              {item.title}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-red-600 hover:text-white"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;