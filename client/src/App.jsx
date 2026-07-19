import { Navigate, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CodeReview from "./pages/CodeReview";
import ReadmeGenerator from "./pages/ReadmeGenerator";
import UnitTestGenerator from "./pages/UnitTestGenerator";
import History from "./pages/History";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/code-review"
          element={<CodeReview />}
        />

        <Route
          path="/readme-generator"
          element={<ReadmeGenerator />}
        />

        <Route
          path="/unit-test-generator"
          element={<UnitTestGenerator />}
        />

        <Route
          path="/history"
          element={<History />}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default App;