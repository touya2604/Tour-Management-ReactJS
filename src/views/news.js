import React, { useState, useEffect } from "react";
import "../styles/news.scss";
import newsTest from "../data/newsTest";
import Footer from "../components/footer";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:5000/news");

        if (!response.ok) {
          throw new Error(`Lỗi mạng hoặc API: ${response.status}`);
        }

        const data = await response.json();
        setNewsList(data);
      } catch (err) {
        console.error("Lỗi khi lấy tin tức:", err);
        setError(err.message);
        setNewsList(newsTest);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div className="loading">Đang tải tin tức...</div>;
  }

  return (
    <>
      {error && <div className="error">Không thể tải tin tức: {error}</div>}

      <div className="news-container">
        {newsList.map((news, index) => (
          <div key={index} className="news-card">
            <img src={news.image} alt={news.title} className="news-image" />
            <div className="news-content">
              <h2 className="news-title">{news.title}</h2>
              <p className="news-description">{news.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default News;
