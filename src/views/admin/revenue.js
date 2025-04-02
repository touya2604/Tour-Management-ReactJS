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
import * as systemConfig from "../../config/system";

const RevenueDashboard = () => {
  const currentYear = dayjs().format("YYYY");
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableYears, setAvailableYears] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const dummyData = [
    { orderId: 124, totalAmount: 1792000, paymentDate: "2025-03-15" },
    { orderId: 123, totalAmount: 3645600, paymentDate: "2025-03-20" },
    { orderId: 122, totalAmount: 3500000, paymentDate: "2025-04-05" },
    { orderId: 121, totalAmount: 2750000, paymentDate: "2025-04-12" },
  ];

  const processData = (data, selectedMonth) => {
    return data
      .filter(
        (item) => dayjs(item.paymentDate).format("YYYY-MM") === selectedMonth
      )
      .sort((a, b) => new Date(a.paymentDate) - new Date(b.paymentDate));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000${systemConfig.prefixAdmin}/revenue`
        );
        const result = await response.json();

        if (result.length === 0) throw new Error("Empty data");

        setOriginalData(result);

        const years = [
          ...new Set(
            result.map((item) => dayjs(item.paymentDate).format("YYYY"))
          ),
        ].sort((a, b) => b - a);

        setAvailableYears(years);

        const months = [
          ...new Set(
            result
              .filter(
                (item) => dayjs(item.paymentDate).format("YYYY") === currentYear
              )
              .map((item) => dayjs(item.paymentDate).format("YYYY-MM"))
          ),
        ].sort((a, b) => dayjs(a).diff(dayjs(b)));

        setAvailableMonths(months);
        setMonth(months[0] || "");
        setFilteredData(processData(result, months[0] || ""));
      } catch (error) {
        console.error("Error fetching data:", error);

        setOriginalData(dummyData);

        const years = [
          ...new Set(
            dummyData.map((item) => dayjs(item.paymentDate).format("YYYY"))
          ),
        ].sort((a, b) => b - a);

        setAvailableYears(years);

        const months = [
          ...new Set(
            dummyData
              .filter(
                (item) => dayjs(item.paymentDate).format("YYYY") === currentYear
              )
              .map((item) => dayjs(item.paymentDate).format("YYYY-MM"))
          ),
        ].sort((a, b) => dayjs(a).diff(dayjs(b)));

        setAvailableMonths(months);
        setMonth(months[0] || "");
        setFilteredData(processData(dummyData, months[0] || ""));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const months = [
      ...new Set(
        originalData
          .filter((item) => dayjs(item.paymentDate).format("YYYY") === year)
          .map((item) => dayjs(item.paymentDate).format("YYYY-MM"))
      ),
    ].sort((a, b) => dayjs(a).diff(dayjs(b)));

    setAvailableMonths(months);
    setMonth(months[0] || "");
    setFilteredData(processData(originalData, months[0] || ""));
  }, [year, originalData]);

  useEffect(() => {
    setFilteredData(processData(originalData, month));
  }, [month, originalData]);

  const totalRevenue = filteredData.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff6347", "#f0e68c"];

  return (
    <div className="revenue-dashboard">
      <h2 className="title">Quản lý Doanh Thu</h2>

      <div className="filter-container">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="year-selector"
        >
          {availableYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="month-selector"
        >
          {availableMonths.length > 0 ? (
            availableMonths.map((m) => (
              <option key={m} value={m}>
                {dayjs(m).format("MM/YYYY")}
              </option>
            ))
          ) : (
            <option>Không có dữ liệu</option>
          )}
        </select>
      </div>

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
                  <Legend
                    payload={filteredData.map((entry, index) => ({
                      value: "Tổng doanh thu",
                      type: "square",
                      id: entry.paymentDate,
                      color: colors[index % colors.length],
                    }))}
                  />

                  <Bar dataKey="totalAmount">
                    {filteredData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length] || "#ff0000"}
                      />
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
