import { useEffect, useState } from "react";
import {
  Code2,
  FileText,
  FileCode2,
  History,
} from "lucide-react";

import Layout from "../components/Layout";
import { getDashboardStats } from "../services/dashboard.service";

const Dashboard = () => {
  const [stats, setStats] = useState({
    codeReviews: 0,
    readmes: 0,
    unitTests: 0,
    history: 0,
    recentActivity: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Code Reviews",
      value: stats.codeReviews,
      icon: <Code2 size={28} />,
      color: "bg-blue-600",
    },
    {
      title: "README Files",
      value: stats.readmes,
      icon: <FileText size={28} />,
      color: "bg-green-600",
    },
    {
      title: "Unit Tests",
      value: stats.unitTests,
      icon: <FileCode2 size={28} />,
      color: "bg-purple-600",
    },
    {
      title: "History",
      value: stats.history,
      icon: <History size={28} />,
      color: "bg-orange-500",
    },
  ];

  return (
    <Layout>
      <div className="space-y-8 w-full">
        {loading ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            Loading...
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl text-white ${card.color}`}
                  >
                    {card.icon}
                  </div>

                  <p className="mt-5 text-gray-600">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-gray-900">
                    {card.value}
                  </h2>
                </div>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-xl font-bold text-gray-900">
                  Recent Activity
                </h2>

                {stats.recentActivity.length === 0 ? (
                  <p className="text-gray-500">
                    No activity found.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {stats.recentActivity.map((item) => (
                      <div
                        key={item._id}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <h3 className="font-semibold text-gray-900">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm capitalize text-gray-600">
                          {item.feature.replace("-", " ")}
                        </p>

                        <p className="mt-2 text-xs text-gray-500">
                          {new Date(
                            item.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-xl font-bold text-gray-900">
                  Quick Actions
                </h2>

                <div className="space-y-4">
                  <div className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition">
                    <h3 className="font-semibold">
                      AI Code Review
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      Analyze your source code with AI.
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition">
                    <h3 className="font-semibold">
                      README Generator
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      Create professional README files.
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition">
                    <h3 className="font-semibold">
                      Unit Test Generator
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      Generate test cases automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;