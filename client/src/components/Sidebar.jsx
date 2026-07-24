import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderGit2,
  PlusSquare,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  const menus = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      title: "Repositories",
      icon: <FolderGit2 size={20} />,
      path: "/dashboard",
    },
    {
      title: "New Repository",
      icon: <PlusSquare size={20} />,
      path: "/projects/new",
    },
  ];

  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-white">

      <div className="border-b p-6">
        <h1 className="text-3xl font-bold">
          <span>Dev</span>
          <span className="text-blue-600">Pilot</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`
            }
          >
            {menu.icon}
            {menu.title}
          </NavLink>
        ))}
      </nav>

      <div className="border-t p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl bg-red-600 px-4 py-3 text-white"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;