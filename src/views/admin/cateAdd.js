import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/cateAdd.scss";
import { useNavigate } from "react-router-dom";
import * as systemConfig from "../../config/system";
const CategoryAdd = () => {
  const [category, setCategory] = useState({
    title: "",
    image: "",
    description: "",
    status: "active",
    position: 1,
    slug: "",
    deleted: 0,
    deletedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [cateTitle, setCateTitle] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000${systemConfig.prefixAdmin}/categories`
        );

        if (!response.ok) throw new Error("Lỗi khi lấy danh sách danh mục");

        const data = await response.json();
        console.log("API response:", data);

        const categoryTitles = Array.isArray(data.data)
          ? data.data.map((category) => category.slug)
          : [];
        // console.log(categoryTitles);
        setCateTitle(categoryTitles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);
  const handleInputChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setCategory((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setError("");

    const newCategory = {
      ...category,
      slug: category.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    };
    if (!category.title.trim()) {
      setError("Vui lòng nhập tiêu đề");
      return;
    }
    // console.log(category.slug);
    if (cateTitle.includes(category.slug)) {
      setError("Đã tồn tại danh mục này");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000${systemConfig.prefixAdmin}/categories`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCategory),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lỗi khi thêm danh mục: ${errorText}`);
      }
      setCategory({
        title: "",
        image: "",
        description: "",
        status: "active",
        position: 1,
        slug: "",
        deleted: 0,
        deletedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      alert("Tạo danh mục thành công!");
      navigate(`${systemConfig.prefixAdmin}/categories`);
    } catch (err) {
      console.error("Lỗi khi thêm danh mục:", err);
      alert(err.message || "Có lỗi xảy ra khi thêm danh mục!");
    }
  };

  return (
    <div className="container mt-4 p-5 rounded custom-container">
      <div className="container p-4 rounded shadow-lg custom-boder">
        <h1 className="text-center custom-text">Tạo danh mục mới</h1>
        {error && (
          <p style={{ color: "red", textAlign: "center", fontSize: "larger" }}>
            {error}
          </p>
        )}
        <div className="row">
          <div className="col-md-6">
            <form>
              <div className="mb-3">
                <label className="form-label">Tên danh mục:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={category.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Miêu tả danh mục:</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={category.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </form>
          </div>

          <div className="col-md-6">
            <form>
              <div className="mb-3">
                <label className="form-label">Ảnh danh mục:</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {image && (
                  <div className="mt-3">
                    <img
                      src={image}
                      alt="Ảnh danh mục"
                      className="img-thumbnail"
                      style={{ maxWidth: "150px", maxHeight: "150px" }}
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Trạng thái:</label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="statusCheckbox"
                    checked={category.status === "active"}
                    onChange={(e) =>
                      setCategory((prev) => ({
                        ...prev,
                        status: e.target.checked ? "active" : "disable",
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="statusCheckbox">
                    {category.status === "active" ? "Active" : "Disable"}
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="text-center mt-3">
          <button className="btn custom-color" onClick={handleSubmit}>
            Tạo danh mục
          </button>
          {/* <button
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/")}
          >
            Hủy
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryAdd;
