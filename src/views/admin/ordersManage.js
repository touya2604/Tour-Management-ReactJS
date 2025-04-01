import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "../../styles/orderManage.scss";
import { Pagination } from "react-bootstrap";

const itemsPerPage = 5;

const OrderManage = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/orders");
        if (!response.ok) throw new Error("Lỗi khi lấy danh sách đơn hàng");
        const data = await response.json();

        const filteredOrders = Array.isArray(data)
          ? data.filter(
              (order) =>
                order.status === "completed" ||
                order.status === "refund_completed"
            )
          : [];

        setOrders(filteredOrders);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="order-manage">
      <h2 className="text-center">Quản lý đơn hàng</h2>
      <div className="order-list">
        {paginatedOrders.map((order) => (
          <div key={order.orderId} className="order-card">
            <img src={order.images} alt={order.title} className="order-image" />
            <div className="order-info">
              <p>
                <strong>Tour:</strong> {order.title}
              </p>
              <p>
                <strong>Số lượng:</strong> {order.quantity}
              </p>
              <p>
                <strong>Giá gốc:</strong> {order.price.toLocaleString()} VND
              </p>
              <p>
                <strong>Giá sau giảm:</strong>{" "}
                {order.price_special.toLocaleString()} VND
              </p>
              <p>
                <strong>Thời gian đặt:</strong>{" "}
                {dayjs(order.timeStart).format("DD/MM/YYYY HH:mm")}
              </p>
              <p>
                <strong>Thanh toán:</strong>{" "}
                {order.paymentDate
                  ? dayjs(order.paymentDate).format("DD/MM/YYYY HH:mm")
                  : "Chưa thanh toán"}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <span className={`status ${order.status}`}>{order.status}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <Pagination className="pagination-custom">
        <Pagination.Prev
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages).keys()].map((number) => (
          <Pagination.Item
            key={number + 1}
            active={number + 1 === currentPage}
            onClick={() => setCurrentPage(number + 1)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default OrderManage;
