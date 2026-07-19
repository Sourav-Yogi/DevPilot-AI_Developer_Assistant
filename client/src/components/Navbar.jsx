import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-sm text-gray-600">
          Welcome back, {user?.name?.split(" ")[0] || "Developer"} 👋
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-gray-900">
            {user?.name}
          </p>

          <p className="text-sm text-gray-600">
            {user?.email}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
          {user?.name?.charAt(0)?.toUpperCase() || "D"}
        </div>
      </div>
    </header>
  );
};

export default Navbar;