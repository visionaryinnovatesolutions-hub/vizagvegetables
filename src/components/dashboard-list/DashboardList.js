
import React, { useEffect, useMemo, useState } from "react";
import "./DashboardList.css";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../sanityClient";
import noImage from "../../assets/img/no-image.png";

const builder = imageUrlBuilder(sanityClient);
const urlFor = (source) => builder.image(source);

/* ================= TREND ICONS ================= */

const TrendUpIcon = () => (
  <svg viewBox="0 0 24 24" className="trend-icon">
    <path d="M4 16L10 10L14 14L20 8" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M14 8H20V14" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const TrendDownIcon = () => (
  <svg viewBox="0 0 24 24" className="trend-icon">
    <path d="M4 8L10 14L14 10L20 16" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M14 16H20V10" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

/* ================= CONFIG ================= */


const categories = [
  { key: "all", label: "All" },
  { key: "favorite", label: "Fav" },
  { key: "vegetables", label: "Vegetables" },
  { key: "Leafy Green", label: "Leafy Green" }, 
  { key: "fruits", label: "Fruits" },
  { key: "flowers", label: "Flowers" }
];

const PRIORITY_ORDER = {
  TOP1: 1,
  TOP2: 2,
  TOP3: 3,
  NORMAL: 4,
  BOTTOM: 5
};

const ITEMS_PER_PAGE = 30;

/* ================= HELPERS ================= */

const getNumber = (price) => {
  if (price == null) return null;
  const num = price.toString().match(/\d+(\.\d+)?/);
  return num ? Number(num[0]) : null;
};

const getPriceStatus = (today, yesterday) => {
  if (today == null || yesterday == null) return null;
  if (today > yesterday) return { type: "up", diff: today - yesterday };
  if (today < yesterday) return { type: "down", diff: yesterday - today };
  return { type: "same", diff: 0 };
};

/* ================= COMPONENT ================= */

const DashboardList = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [lastUpdated, setLastUpdated] = useState(null);

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "2-digit"
  });

  /* ================= SANITY FETCH ================= */

  const fetchSanityData = async () => {
    try {
      const query = `
        *[_type == "product"]{
          nameTelugu,
          nameEnglish,
          weight,
          isFavorite,
          priority,
          order,
          category,
          todayPrice,
          yesterdayPrice,
          image
        }
      `;

      const result = await sanityClient.fetch(query);

      const sorted = result.sort((a, b) => {
        const pDiff =
          (PRIORITY_ORDER[a.priority] || 99) -
          (PRIORITY_ORDER[b.priority] || 99);

        if (pDiff !== 0) return pDiff;

        return (a.order || 999) - (b.order || 999);
      });

      setData(sorted);

      setLastUpdated(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        })
      );
    } catch (err) {
      console.error("Sanity fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchSanityData();
  }, []);

  /* ================= FILTER ================= */

  const filteredData = useMemo(() => {
    let list = [...data];

    if (selectedCategory === "favorite") {
      list = list.filter((item) => item.isFavorite);
    } else if (selectedCategory !== "all") {
      list = list.filter((item) => item.category === selectedCategory);
    }

    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      list = list.filter(
        (item) =>
          item.nameEnglish?.toLowerCase().includes(q) ||
          item.nameTelugu?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [data, selectedCategory, searchText]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => setPage(1), [selectedCategory, searchText]);

  /* ================= RENDER ================= */

  return (
    <section className="price-section">
      <div className="container-1440">
        <div className="price-header">
          <div className="date">📅 {todayDate}</div>
          <h2>Today’s Vizag Rythu Bazar Prices</h2>
        </div>

        <div className="filter-row">
          <div className="categories">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={selectedCategory === cat.key ? "active" : ""}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search items"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <p className="count">{filteredData.length} Items</p>

        <div className="grid">
          {paginatedData.map((item, index) => {
            const today = getNumber(item.todayPrice);
            const yesterday = getNumber(item.yesterdayPrice);
            const status = getPriceStatus(today, yesterday);

            return (
              <div className="card" key={index}>
                <div className="image-box">
                  <img
                    src={
                      item.image
                        ? urlFor(item.image).width(300).auto("format").url()
                        : noImage
                    }
                    alt={item.nameEnglish || "Product"}
                    onError={(e) => (e.target.src = noImage)}
                  />

                  {status && status.type !== "same" && (
                    <span className={`price-change ${status.type}`}>
                      {status.type === "up" ? <TrendUpIcon /> : <TrendDownIcon />}
                      ₹{status.diff}
                    </span>
                  )}
                </div>

                <div className="card-body">
                  <div className="telugu">{item.nameTelugu}</div>

                  <div className="card-body-topsec">
                    <div className="english">{item.nameEnglish}</div>

                    <div className="price-row">
                      <span className="today">
                        ₹ {item.todayPrice}
                        {item.weight && <small> / {item.weight}</small>}
                      </span>
                    </div>
                  </div>

                  <div className="yesterday">
                    <span className="yesterday-left">Yesterday</span>
                    <span className="yesterday-right">
                      ₹ {item.yesterdayPrice}
                      {item.weight && <small> / {item.weight}</small>}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={page === i + 1 ? "active" : ""}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardList;
