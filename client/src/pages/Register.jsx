import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Cpu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { confirmPassword, ...payload } = formData;

      await register(payload);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="rounded-lg bg-blue-600 p-2">
            <Cpu size={22} className="text-white" />
          </div>

          <Link to="/">
            <h1 className="text-3xl font-bold">
              <span className="text-gray-900">Dev</span>
              <span className="text-blue-600">Pilot</span>
            </h1>
          </Link>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900">
            Create Account
          </h2>

          <p className="mt-2 text-gray-600">
            Create your DevPilot account.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Sign In
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} DevPilot
        </p>
      </div>
    </div>
  );
};

export default Register;