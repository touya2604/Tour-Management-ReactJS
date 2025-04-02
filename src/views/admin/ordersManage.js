import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "../../styles/orderManage.scss";
import { Pagination } from "react-bootstrap";
import * as systemConfig from "../../config/system";

const itemsPerPage = 5;

const OrderManage = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000${systemConfig.prefixAdmin}/orders`
        );
        if (!response.ok) throw new Error("Lỗi khi lấy danh sách đơn hàng");
        const data = await response.json();

        setOrders(
          data.map((order) => ({
            ...order,
            orderItems: order.orderItems.map((item) => ({
              ...item,
              images: JSON.parse(item.images)[0],
            })),
          }))
        );
      } catch (error) {
        console.error(error);

        setOrders([
          {
            orderId: "ORD001",
            voucherDiscount: 10,
            orderStatus: "completed",
            orderItems: [
              {
                tourId: "TOUR123",
                quantity: 1,
                price: 1500000,
                discount: 5,
                timeStart: "2024-03-15T08:30:00",
                paymentDate: "2024-03-10T10:00:00",
                status: "completed",
                images: "https://via.placeholder.com/100",
              },
            ],
          },
          {
            orderId: "ORD002",
            voucherDiscount: 15,
            orderStatus: "pending",
            orderItems: [
              {
                tourId: "TOUR124",
                quantity: 3,
                price: 2200000,
                discount: 10,
                timeStart: "2024-04-01T09:00:00",
                paymentDate: null,
                status: "pending",
                images: "https://via.placeholder.com/100",
              },
            ],
          },
        ]);
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
        {paginatedOrders.map((orderGroup) => (
          <div key={orderGroup.orderId} className="order-group">
            <h3>Mã đơn hàng: {orderGroup.orderId}</h3>
            <p>
              <strong>Trạng thái đơn hàng:</strong> {orderGroup.orderStatus}
            </p>
            <p>
              <strong>Giảm giá voucher:</strong> {orderGroup.voucherDiscount}%
            </p>
            {orderGroup.orderItems.map((order, index) => (
              <div key={index} className="order-card">
                <img
                  src={order.images}
                  alt={`Tour ${order.tourId}`}
                  className="order-image-small"
                />
                <div className="order-info">
                  <p>
                    <strong>Số lượng:</strong> {order.quantity}
                  </p>
                  <p>
                    <strong>Giá gốc:</strong> {order.price.toLocaleString()} VND
                  </p>
                  <p>
                    <strong>Giảm giá:</strong> {order.discount}%
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
                    <strong>Trạng thái:</strong> {order.status}
                  </p>
                </div>
              </div>
            ))}
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
