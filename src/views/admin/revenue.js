import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "../../styles/revenue.scss";

const RevenueDashboard = () => {
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/revenue");
        const result = await response.json();

        const filtered = result.filter(
          (item) => dayjs(item.paymentDate).format("YYYY-MM") === month
        );
        setFilteredData(filtered);
      } catch (error) {
        console.error("Error fetching data:", error);
        const data = [
          { id: 1, totalAmount: 500, paymentDate: "2025-03-15" },
          { id: 2, totalAmount: 1200, paymentDate: "2025-03-20" },
          { id: 3, totalAmount: 800, paymentDate: "2025-04-05" },
          { id: 4, totalAmount: 950, paymentDate: "2025-04-12" },
          { id: 5, totalAmount: 400, paymentDate: "2025-04-22" },
        ];
        setFilteredData(data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month]);

  const totalRevenue = filteredData.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff6347", "#f0e68c"];

  return (
    <div className="revenue-dashboard">
      <h2 className="title">Quản lý Doanh Thu</h2>
      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="month-selector"
      >
        <option value="2025-03">Tháng 3, 2025</option>
        <option value="2025-04">Tháng 4, 2025</option>
      </select>
      <div className="card">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <>
            <h3 className="total-revenue">
              Tổng doanh thu:{" "}
              <span className="highlight">
                {totalRevenue.toLocaleString()} VNĐ
              </span>
            </h3>
            <div className="chart-container">
              <ResponsiveContainer width="50%" height={300}>
                <BarChart data={filteredData}>
                  <XAxis dataKey="paymentDate" stroke="#333" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => value.toLocaleString()}
                    labelFormatter={(label) => `Ngày: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="totalAmount" fill="#8884d8">
                    {filteredData.map((_, index) => (
                      <Cell key={index} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="30%" height={300}>
                <PieChart>
                  <Pie
                    data={filteredData}
                    dataKey="totalAmount"
                    nameKey="paymentDate"
                    outerRadius={100}
                    label
                  >
                    {filteredData.map((_, index) => (
                      <Cell key={index} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => value.toLocaleString()}
                    labelFormatter={(label) => `Ngày: ${label}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RevenueDashboard;
