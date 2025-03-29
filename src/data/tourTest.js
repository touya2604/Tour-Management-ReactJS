const newTour = JSON.parse(localStorage.getItem("newTour"));
const tours = newTour || [
  {
    id: 1,
    name: "HÀ NỘI – NINH BÌNH – HẠ LONG",
    image: "https://via.placeholder.com/300x200",
    price: 3190000,
    capacity: 30,
    timestart: "2022-04-20",
    timeend: "2025-03-20",
  },
  {
    id: 2,
    name: "Du Lịch Đà Nẵng - Hội An - Bà Nà - Cầu Vàng",
    image: "https://via.placeholder.com/300x200",
    price: 6949000,
    capacity: 40,
    timestart: "2022-04-20",
    timeend: "2025-03-20",
  },
  {
    id: 3,
    name: "Du lịch Hà Nội - Nhà Trang - Hòn Tằm",
    image: "https://via.placeholder.com/300x200",
    price: 5190000,
    capacity: 25,
    timestart: "2022-04-20",
    timeend: "2025-03-20",
  },
  {
    id: 4,
    name: "Du Lịch Liên Tuyến Nha Trang - Đà Lạt",
    image: "https://via.placeholder.com/300x200",
    price: 4990000,
    capacity: 10,
    timestart: "2022-04-20",
    timeend: "2025-03-20",
  },
  {
    id: 5,
    name: "Du Lịch Nha Trang - Du Thuyền Emperor 5*",
    image: "https://via.placeholder.com/300x200",
    price: 10279000,
    capacity: 20,
    timestart: "2022-04-20",
    timeend: "2025-03-20",
  },
  {
    id: 6,
    name: "ĐÀ NẴNG – HỘI AN – BÀ NÀ – HUẾ",
    image: "https://via.placeholder.com/300x200",
    price: 3990000,
    capacity: 30,
    timestart: "2022-04-20",
    timeend: "2025-03-20",
  },
];

export default tours;
