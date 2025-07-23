import React, { useEffect, useState } from "react";
import {
  ClipboardDocumentListIcon,
  TruckIcon,
  RectangleGroupIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";
import { axiosWithRefresh } from "../../axiosWithRefresh";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4 transition transform hover:scale-105 duration-300">
    <div className={`rounded-full p-3 ${color}`}>
      {React.cloneElement(icon, { className: "h-6 w-6 text-white" })}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const DashboardHome = () => {
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);
  const [paymentView, setPaymentView] = useState("today");
  const [revenueView, setRevenueView] = useState("today");

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const res = await axiosWithRefresh({
          method: "get",
          url: "/api/v1/admin/reports",
        });
        setReport(res.data || {});
      } catch (err) {
        console.error("Error fetching report:", err);
        setReport({});
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const statCards = [
    {
      icon: <ClipboardDocumentListIcon />,
      label: "Total Orders",
      value: report.totalOrders || 0,
      color: "bg-orange-500",
    },
    {
      icon: <TruckIcon />,
      label: "Delivered Orders",
      value: report.deliveredOrders || 0,
      color: "bg-green-500",
    },
    {
      icon: <RectangleGroupIcon />,
      label: "Cancelled Orders",
      value: report.cancelledOrders || 0,
      color: "bg-red-500",
    },
    {
      icon: <CurrencyRupeeIcon />,
      label: "Revenue Today",
      value: `NPR ${report.revenueToday || 0}`,
      color: "bg-blue-500",
    },
  ];

  const revenueTrend = [
    { day: "Today", revenue: report.revenueToday || 0 },
    { day: "Yesterday", revenue: report.revenueYesterday || 0 },
    { day: "This Week", revenue: report.revenueThisWeek || 0 },
    { day: "This Month", revenue: report.revenueThisMonth || 0 },
  ];

  const orderTrend = [
    { label: "Today", orders: report.ordersToday || 0 },
    { label: "Yesterday", orders: report.ordersYesterday || 0 },
    { label: "This Week", orders: report.ordersThisWeek || 0 },
    { label: "This Month", orders: report.ordersThisMonth || 0 },
  ];

  const paymentBreakdown =
    paymentView === "today"
      ? [
          { name: "Stripe", value: report.stripePaymentsToday || 0 },
          { name: "COD", value: report.codPaymentsToday || 0 },
        ]
      : [
          { name: "Stripe", value: report.stripePaymentsTotal || 0 },
          { name: "COD", value: report.codPaymentsTotal || 0 },
        ];

  const pieColors = ["#0ea5e9", "#f97316"];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Revenue Line Chart */}
     <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueTrend}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorRev)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>


      {/* Order Bar Chart */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Order Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={orderTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#34d399" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Area Chart */}
      
      {/* Payment Breakdown Pie Chart */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">Payment Breakdown</h2>
          <select
            value={paymentView}
            onChange={(e) => setPaymentView(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="today">Today</option>
            <option value="total">Total</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              data={paymentBreakdown}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(1)}%`
              }
            >
              {paymentBreakdown.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? "#3b82f6" : "#f97316"} // Blue & Orange
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} Payments`, name]}
              contentStyle={{ fontSize: "14px" }}
            />
            <Legend
              formatter={(value, entry, index) => {
                const count = paymentBreakdown.find(
                  (d) => d.name === value
                )?.value;
                return `${value} (${count})`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardHome;
