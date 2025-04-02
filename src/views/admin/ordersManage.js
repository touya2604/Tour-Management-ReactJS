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
        const result = await response.json();

        if (response.ok && result.code === 200) {
          setOrders(result.data);
        } else {
          console.error("Lỗi khi lấy danh sách đơn hàng", result.message);
        }
      } catch (error) {
        console.error("Lỗi kết nối API", error);
      }
    };

    fetchOrders();
  }, []);

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const calculateOrderTotal = (order) => {
    let subtotal = order.orderItems.reduce((total, item) => {
      return total + item.quantity * item.price * (1 - item.discount / 100);
    }, 0);
    return subtotal * (1 - parseFloat(order.voucherDiscount) / 100);
  };

  return (
    <div className="order-manage">
      <h2 className="text-center">Quản lý đơn hàng</h2>
      <div className="order-list">
        {paginatedOrders.map((order) => (
          <div key={order.orderId} className="order-group">
            <h3>Mã đơn hàng: {order.orderId}</h3>
            <p>
              <strong>Trạng thái đơn hàng:</strong> {order.orderStatus}
            </p>
            <p>
              <strong>Giảm giá voucher:</strong> {order.voucherDiscount}%
            </p>
            <p className="total-price">
              <strong>Tổng tiền đơn hàng:</strong>{" "}
              {calculateOrderTotal(order).toLocaleString()} VND
            </p>
            {order.orderItems.map((item) => (
              <div key={item.id} className="order-card">
                <img
                  src={item.images}
                  alt={`Tour ${item.tourId}`}
                  className="order-image-small"
                />
                <div className="order-info">
                  <p>
                    <strong>Số lượng:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Giá gốc:</strong> {item.price.toLocaleString()} VND
                  </p>
                  <p>
                    <strong>Giảm giá:</strong> {item.discount}%
                  </p>
                  <p>
                    <strong>Thời gian đặt:</strong>{" "}
                    {dayjs(item.timeStart).format("DD/MM/YYYY HH:mm")}
                  </p>
                  <p>
                    <strong>Thanh toán:</strong>{" "}
                    {item.paymentDate
                      ? dayjs(item.paymentDate).format("DD/MM/YYYY HH:mm")
                      : "Chưa thanh toán"}
                  </p>
                  <p>
                    <strong>Trạng thái:</strong> {item.status}
                  </p>
                  <p>
                    <strong>Tổng tiền:</strong>{" "}
                    {(
                      item.quantity *
                      item.price *
                      (1 - item.discount / 100)
                    ).toLocaleString()}{" "}
                    VND
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
