import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/history");

      setHistory(res.data.data);
    } catch (error) {
      alert(error.response?.data?.message || "Unable to fetch history");
    } finally {
      setLoading(false);
    }
  };

  const deleteHistory = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this history?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/history/${id}`);

      setHistory((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <Layout>
      <h1 className="mb-8 text-4xl font-bold">
        History
      </h1>

      {loading ? (
        <div className="rounded-xl bg-white p-8 shadow">
          Loading...
        </div>
      ) : history.length === 0 ? (
        <div className="rounded-xl bg-white p-8 shadow">
          No history found.
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl bg-white p-6 shadow"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {item.title}
                  </h2>

                  <p className="text-slate-500">
                    {item.feature}
                  </p>
                </div>

                <button
                  onClick={() =>
                    deleteHistory(item._id)
                  }
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>

              <div className="mb-5">
                <h3 className="mb-2 font-semibold">
                  Input
                </h3>

                <pre className="overflow-auto rounded-lg bg-slate-100 p-4">
                  {item.input}
                </pre>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">
                  Output
                </h3>

                <pre className="overflow-auto rounded-lg bg-slate-900 p-4 text-green-400">
                  {typeof item.output === "string"
                    ? item.output
                    : JSON.stringify(
                        item.output,
                        null,
                        2
                      )}
                </pre>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default History;