import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/cateAdd.scss";
import { useParams, useNavigate } from "react-router-dom";
import * as systemConfig from "../../config/system";

const CategoryUpdate = () => {
  const [category, setCategory] = useState({});
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(
          `http://192.168.55.14:3000${systemConfig.prefixAdmin}/categories`
        );
        if (!response.ok) throw new Error("Lỗi khi lấy danh sách danh mục");

        const data = await response.json();
        console.log("API response:", data);

        const filteredTour = Array.isArray(data.data)
          ? data.data.find((t) => t.slug === slug) || null
          : null;

        setCategory(filteredTour);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTours();
  }, [slug]);

  const handleInputChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCategory((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://192.168.55.14:3000${systemConfig.prefixAdmin}/categories/${slug}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(category),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lỗi khi cập nhật danh mục: ${errorText}`);
      }
      alert("Cập nhật danh mục thành công!");
      navigate("/admin/categories");
    } catch (err) {
      console.error("Lỗi khi cập nhật danh mục:", err);
      alert(err.message || "Có lỗi xảy ra khi cập nhật danh mục!");
    }
  };

  return (
    <div className="container mt-4 p-5 rounded custom-container">
      <div className="container p-4 rounded shadow-lg custom-boder">
        <h1 className="text-center custom-text">Cập nhật danh mục</h1>
        <div className="row">
          <div className="col-md-6">
            <form>
              <div className="mb-3">
                <label className="form-label">Tên danh mục:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={category.title || ""}
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
                  value={category.description || ""}
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

                {category.image && (
                  <div className="mt-3">
                    <img
                      src={category.image}
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
          <button className="btn custom-color" onClick={handleUpdate}>
            Cập nhật
          </button>
          <button
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/admin/categories")}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
